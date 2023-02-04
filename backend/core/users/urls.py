from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from users import views

app_name = 'users'

urlpatterns = [
    path('login/', views.UserLoginView.as_view(), name="login-user"),
    path('login/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    
    path('register/', views.UserRegisterView.as_view(),name="create-user"),
    path('logout/', views.UserLogoutView.as_view(), name='logout-user'),
    
    path('profile/', views.UserProfileView.as_view(),name='user-profile'),
    path('profile/<int:pk>/bookmarks/', views.UserBookmarkView.as_view(),name='user-bookmark'),
    path('change_password/', views.ChangePasswordView.as_view(),name='change-password'),
]