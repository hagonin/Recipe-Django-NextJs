from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.validators import UniqueValidator
from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password

from .models import CustomUser, Profile

class UserSerializer(serializers.ModelSerializer):	
    class Meta:
        model = CustomUser
        fields = ('id','email','username', 'first_name', 'last_name', 'date_joined', 'password')
        extra_kwargs = {'password': {'write_only': True}}


class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serialize registration requests and create a new user.
    """
    email = serializers.EmailField(required=True,validators= [UniqueValidator(queryset=CustomUser.objects.all())])
    password = serializers.CharField(min_length=8,write_only=True)
    confirm_password = serializers.CharField(min_length=8,write_only=True)
   
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'password','confirm_password','email', 'first_name', 'last_name')

    def create(self, validated_data):
        """Create a new user with encrypted password and return it"""
        user = CustomUser.objects.create(
        email=validated_data['email'],
        username=validated_data['username'],
        password=make_password(validated_data['password']))
        return user
    
    def validate(self, attrs):
        if attrs.get('password') != attrs.get('confirm_password'):
            raise serializers.ValidationError("Those passwords don't match.")
        return attrs

class UserLoginSerializer(serializers.Serializer):
    """
    Authenticate users with email & password 
    """
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        """Validate and authenticate the user"""
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Access denied: wrong email or password.')

class ProfileSerializer(UserSerializer):
    """
    Serializer the user profile model 
    """

    class Meta:
        model = Profile
        fields = ('user_id','email','username','first_name','last_name','bookmarks','bio','avatar')
      

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

