from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework import status
from rest_framework import permissions
from rest_framework.response import Response

from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView, ListCreateAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from recipes.models import Recipe
from . import serializers
from .models import Profile, CustomUser
from recipes.serializers import RecipeReadSerializer
from .serializers import UserSerializer



class UserViewSet(viewsets.ModelViewSet):
	queryset = CustomUser.objects.all().order_by('-date_joined')
	serializer_class = UserSerializer
	permission_classes = [permissions.IsAuthenticated]

class RegisterView(CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = serializers.UserRegistrationSerializer


class UserLogoutView(UpdateAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e : 
            return Response(status=status.HTTP_400_BAD_REQUEST)



class UserProfileView(RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.ProfileSerializer


class UserBookmarkView(ListCreateAPIView):
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
    queryset = CustomUser.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.ChangePasswordSerializer

  