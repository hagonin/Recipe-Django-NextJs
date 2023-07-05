import jwt
from django.conf import settings
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.shortcuts import get_object_or_404
from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from django.utils.encoding import smart_str,smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.http import HttpResponsePermanentRedirect
from django.shortcuts import redirect
from decouple import config

from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics, views
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from . import serializers
from recipes.serializers import RecipeSerializer
from recipes.models import Recipe
from .models import Profile, CustomUser
from .renderers import UserRenderer


class CustomRedirect(HttpResponsePermanentRedirect):

    allowed_schemes = [config('APP_SCHEME'), 'http', 'https']

class RegisterView(generics.GenericAPIView):
    """
    Enpoint to create a new user
    """
    serializer_class = serializers.RegistrationSerializer
    renderer_classes = (UserRenderer,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        data = serializer.data

        user = CustomUser.objects.get(email=data['email'])
        token = RefreshToken.for_user(user).access_token
        
        current_site = get_current_site(request).domain
        relativeLink = reverse('users:email-verify')
        absurl = 'http://'+current_site+relativeLink+'?token='+str(token)

        email_body = 'Hi ' +user.username + \
            '\n Use the link below to verify your email \n' + absurl
        user_data = {'email_body': email_body, 'to_email': user.email,
                'email_subject': 'Verify your email'}
        
        Util.send_email(user_data)
        return Response(data, status=status.HTTP_201_CREATED)

class VerifyEmail(views.APIView):
    serializer_class = serializers.EmailVerificationSerializer

    token_param_config = openapi.Parameter(
        'token', in_=openapi.IN_QUERY, description='Description', type=openapi.TYPE_STRING)
    
    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY,algorithms='HS256')
            user = CustomUser.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified = True
                user.save()
            # return Response({'email': 'Successfully activated'}, status=status.HTTP_200_OK)
            return redirect ("https://homecook-iota.vercel.app/verify-email-success")
        except jwt.ExpiredSignatureError as identifier:
            return Response({'error': 'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error': 'This link is invalid or been used already, we cannot verify using this link'}, status=status.HTTP_400_BAD_REQUEST)

class ResendVerifyEmail(views.APIView):
    serializer_class = serializers.RegistrationSerializer

    email = openapi.Parameter('email', in_=openapi.IN_QUERY,
                        type=openapi.TYPE_STRING)
    @swagger_auto_schema(
        operation_description="Resend your email to get an email verify",
        manual_parameters=[email],
    )
    def post(self, request):
        data = request.data
        email = data['email']

        try:
            user = CustomUser.objects.get(email=email)

            if user.is_verified:
                return Response({'msg':'User is already verified'})
            
            token = RefreshToken.for_user(user).access_token
            current_site= get_current_site(request).domain
            relativeLink = reverse('users:email-verify')
            
            absurl = 'http://'+current_site+relativeLink+"?token="+str(token)
            email_body = 'Hi '+ user.username + ' this is the resent link to verify your email \n' + absurl

            data = {'email_body':email_body,'to_email':user.email,
                    'email_subject':'Verify your email'}
            Util.send_email(data)
            return Response({'msg':'The verification email has been sent'}, status=status.HTTP_201_CREATED)
        except CustomUser.DoesNotExist:
            return Response({'msg':'No such user, register first'})

class LoginView(generics.GenericAPIView):
    """
    Authenticate existing users using their email & password 
    """
    serializer_class = serializers.LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class RequestResetPassword(generics.GenericAPIView):
    serializer_class = serializers.RequestResetPasswordSerializer

    @swagger_auto_schema(
        operation_description="This sends email to request reset password"
    )
    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        email = request.data.get('email', '')

        if CustomUser.objects.filter(email=email).exists():
            user = CustomUser.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(
                request=request).domain
            relativeLink = reverse(
                'users:password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})

            redirect_url = request.data.get('redirect_url', '')
            absurl = 'http://'+current_site + relativeLink
            email_body = 'Hello, \n Use link below to reset your password  \n' + \
                absurl+"?redirect_url="+redirect_url
            data = {'email_body': email_body, 'to_email': user.email,
                    'email_subject': 'Reset your passsword'}
            Util.send_email(data)
        return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)


class PasswordTokenCheckAPI(generics.GenericAPIView):
    serializer_class = serializers.SetNewPasswordSerializer

    @swagger_auto_schema(
        operation_description="This returns token and uidb64 to reset password"
    )
    def get(self, request, uidb64, token):

        redirect_url = request.GET.get('redirect_url')

        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = CustomUser.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                if len(redirect_url) > 3:
                    return CustomRedirect(redirect_url+'?token_valid=False')
                else:
                    return CustomRedirect(config('FRONTEND_URL', '')+'?token_valid=False')

            if redirect_url and len(redirect_url) > 3:
                return CustomRedirect(redirect_url+'?token_valid=True&message=Credentials Valid&uidb64='+uidb64+'&token='+token)
            else:
                return CustomRedirect(config('FRONTEND_URL', '')+'?token_valid=False')

        except DjangoUnicodeDecodeError as identifier:
            try:
                if not PasswordResetTokenGenerator().check_token(user):
                    return CustomRedirect(redirect_url+'?token_valid=False')
                    
            except UnboundLocalError as e:
                return Response({'error': 'The link has lived its life :( Request a new one!'}, status=status.HTTP_400_BAD_REQUEST)

class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = serializers.SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)

class LogoutView(generics.GenericAPIView):
    """
    Enpoint to logout users
    """
    serializer_class = serializers.LogoutSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"status": "You logged out successfully!"})


class UpdateView(generics.RetrieveUpdateDestroyAPIView):
    """
    Get, update user information
    """
    lookup_field = 'username'
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.UserSerializer

    def get_object(self):
        return self.request.user

class ProfileView(generics.RetrieveUpdateAPIView):
    """
    Get, update user profile
    """
    queryset = Profile.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.ProfileSerializer

    def get_object(self):
        return self.request.user.profile

class UserRecipesView(generics.ListAPIView):
    """Lists all recipes a user has"""

    serializer_class = RecipeSerializer

    def get_queryset(self):
        return Recipe.objects.filter(user__username=self.kwargs['username'])

class BookmarkView(generics.ListCreateAPIView):
    """
    Get, Create, Delete favorite recipe
    """
    serializer_class = RecipeSerializer
    permission_classes = (IsAuthenticated,)
    profile = Profile.objects.all()

    def get_queryset(self):
        user = CustomUser.objects.get(id=self.kwargs['pk'])
        user_profile = get_object_or_404(self.profile, user=user)
        
        return user_profile.bookmarks.all()

    @swagger_auto_schema(
        operation_description="ID relates to user_id to add recipe in bookmarks"
    )
    def post(self, request, pk):
        user = CustomUser.objects.get(id=pk)
        user_profile = get_object_or_404(self.profile, user=user)
        recipe = Recipe.objects.get(id=request.data['id'])
        if user_profile :
            user_profile.bookmarks.add(recipe)
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_description="ID relates to user_id to delete recipe in bookmarks"
    )
    def delete(self, request, pk):
        user = CustomUser.objects.get(id=pk)
        user_profile = get_object_or_404(self.profile, user=user)
        recipe = Recipe.objects.get(id=request.data['id'])
        if user_profile :
            user_profile.bookmarks.remove(recipe)
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(_("The selected recipe is not in your bookmarks."),
                        status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(generics.UpdateAPIView):
    """
    Change password view for authenticated user
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.ChangePasswordSerializer

    def get_object(self):
        return self.request.user