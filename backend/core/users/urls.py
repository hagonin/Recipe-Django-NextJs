from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from users import views

app_name = 'users'

urlpatterns = [
    path('register', views.RegisterView.as_view(),name="register"),
    path('login', views.LoginView.as_view(), name="login-user"),
    path('token/refresh', TokenRefreshView.as_view(), name='token-refresh'),
    path('logout', views.LogoutView.as_view(), name='logout-user'),
    
    path('email-verify', views.VerifyEmail.as_view(), name='email-verify'),
    path('resend-email-verify', views.ResendVerifyEmail.as_view(), name='resend-email-verify'),
    path('request-reset-email', views.RequestResetPassword.as_view(),
        name="request-reset-email"),
    path('password-reset/<uidb64>/<token>',
        views.PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete', views.SetNewPasswordAPIView.as_view(),
        name='password-reset-complete'),

    path('', views.UpdateView.as_view(),name='user-info'),
    path('profile/', views.ProfileView.as_view(),name='user-profile'),
    path('profile/<int:pk>/bookmarks', views.BookmarkView.as_view(),name='user-bookmark'),
    path('<username>/recipes', views.UserRecipesView.as_view(), name='user-recipes'),
    path('change_password', views.ChangePasswordView.as_view(),name='change-password'),
]