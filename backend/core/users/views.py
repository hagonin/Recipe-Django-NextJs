from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework import permissions
from rest_framework.response import Response

from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView, ListCreateAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from . import serializers
from recipes.models import Recipe
from .models import Profile, CustomUser
from recipes.serializers import RecipeReadSerializer
from .serializers import (UserSerializer,UserRegistrationSerializer,
    UserLoginSerializer,ProfileSerializer,ChangePasswordSerializer)


class UserRegisterView(GenericAPIView):
    """
    Enpoint to create a new user
    """
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = RefreshToken.for_user(user)
        data = serializer.data
        data['token'] = {
            'refresh': str(token),
            'access': str(token.access_token)
        }
        return Response(data, status=status.HTTP_201_CREATED)

class UserLoginView(GenericAPIView):
    """
    Authenticate existing users using their email & password 
    """
    permission_classes = (AllowAny,)
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        serializer = UserSerializer(user)
        token = RefreshToken.for_user(user)
        data = serializer.data
        data['token'] = {
            'refresh': str(token),
            'access': str(token.access_token)
        }
        return Response(data, status=status.HTTP_200_OK)


class UserLogoutView(UpdateAPIView):
    """
    Enpoint to logout users
    """
    permission_classes = (IsAuthenticated,)

    def post(self, request,*args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e : 
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserUpdateView(RetrieveUpdateAPIView):
    """
    Get, update user information
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class UserProfileView(RetrieveUpdateAPIView):
    """
    Get, update user profile
    """
    queryset = Profile.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user.profile


class UserBookmarkView(ListCreateAPIView):
    """
    Get, Create, Delete favorite recipe
    """
    serializer_class = RecipeReadSerializer
    permission_classes = (IsAuthenticated,)
    profile = Profile.objects.all()

    def get_queryset(self):
        user = CustomUser.objects.get(id=self.kwargs['pk'])
        user_profile = get_object_or_404(self.profile, user=user)
        
        return user_profile.bookmarks.all()

    def post(self, request, pk):
        user = CustomUser.objects.get(id=pk)
        user_profile = get_object_or_404(self.profile, user=user)
        recipe = Recipe.objects.get(id=request.data['id'])
        if user_profile :
            user_profile.bookmarks.add(recipe)
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = CustomUser.objects.get(id=pk)
        user_profile = get_object_or_404(self.profile, user=user)
        recipe = Recipe.objects.get(id=request.data['id'])
        if user_profile :
            user_profile.bookmarks.remove(recipe)
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(UpdateAPIView):
    """
    Change password view for authenticated user
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer

    def get_object(self):
        return self.request.user