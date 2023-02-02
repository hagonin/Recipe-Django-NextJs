from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,  TokenRefreshView,
    )

from users import views

app_name = 'users'

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name="login-user"),
    path('login/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    
    path('register/', views.RegisterView.as_view(),name="create-user"),
    # path('token/', TokenObtainPairView.as_view(), name='token-obtain'),
    path('logout/', views.UserLogoutView.as_view(), name='logout-user'),
    # path('', views.UserAPIView.as_view(), name='user-info'),
    
    path('profile/', views.UserProfileView.as_view(),name='user-profile'),
    # path('profile/avatar/', views.UserAvatarAPIView.as_view(),name='user-avatar'),
    path('profile/<int:pk>/bookmarks/', views.UserBookmarkView.as_view(),name='user-bookmark'),
    path('change_password/', views.ChangePasswordView.as_view(),name='change-password'),
]