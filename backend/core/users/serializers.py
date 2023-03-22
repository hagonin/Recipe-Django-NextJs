from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password
from django.contrib import auth
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

from .models import CustomUser, Profile
    
class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializer the user profile model 
    """
    class Meta:
        model = Profile
        fields = ('bookmarks','bio','avatar')

class UserSerializer(serializers.ModelSerializer):	
    date_joined = serializers.ReadOnlyField()
    profile = ProfileSerializer()

    class Meta:
        model = CustomUser
        fields = ('id','email','username', 'first_name', 'last_name', 
                'date_joined', 'password', 'profile')
        
        extra_kwargs = {'password': {'write_only': True}}

class UserShortSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = CustomUser
        fields = ('id','username','profile')
    
class RegistrationSerializer(serializers.ModelSerializer):
    """
    Serialize registration requests and create a new user.
    """
    password = serializers.CharField(min_length=8,write_only=True)
    confirm_password = serializers.CharField(min_length=8,write_only=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'password','confirm_password',
                'email', 'first_name', 'last_name')

    def create(self, validated_data):
        """Create a new user with encrypted password and return it"""
        user = CustomUser.objects.create(
        email=validated_data['email'],
        username=validated_data['username'],
        first_name=validated_data['first_name'],
        last_name=validated_data['last_name'],
        password=make_password(validated_data['password']))
        return user
    
    def validate(self, attrs):
        if attrs.get('password') != attrs.get('confirm_password'):
            raise serializers.ValidationError("Those passwords don't match.")
        return attrs

class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = CustomUser
        fields = ['token']


class LoginSerializer(serializers.Serializer):
    """
    Authenticate users with email & password 
    """
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(max_length=68, min_length=8, write_only=True)
    
    tokens = serializers.SerializerMethodField()

    def get_tokens(self, obj):
        user = CustomUser.objects.get(email=obj['email'])

        return {
            'refresh': user.tokens()['refresh'],
            'access': user.tokens()['access']
        }

    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'tokens']

    def validate(self, attrs):
        email = attrs.get('email', '')
        password = attrs.get('password', '')
        user = auth.authenticate(email=email, password=password)

        if not user:
            raise AuthenticationFailed('Access denied: wrong email or password.')
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin')
        if not user.is_verified:
            raise AuthenticationFailed('Email is not verified')

        return {
            'email': user.email,
            'tokens': user.tokens
        }

        return super().validate(attrs)
    
class RequestResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    redirect_url = serializers.CharField(max_length=500, required=False)

    class Meta:
        fields = ['email']

class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(
        min_length=1, write_only=True)
    uidb64 = serializers.CharField(
        min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = CustomUser.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)

            user.set_password(password)
            user.save()

            return (user)
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)
        return super().validate(attrs)

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_message = {
        'bad_token': ('Token is expired or invalid')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):

        try:
            RefreshToken(self.token).blacklist()

        except TokenError:
            self.fail('bad_token')

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True)


    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is incorrect")
        return value 

    def validate_new_password(self, value):
        validate_password(value)
        return value 

    def update(self,instance, validated_data):
        instance.set_password(validated_data['new_password'])
        instance.save()
        return instance 
