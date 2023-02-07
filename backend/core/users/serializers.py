from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password

from .models import CustomUser, Profile

class UserSerializer(serializers.ModelSerializer):	
    """
    Serializer class to seralize CustomUser model.
    """
    class Meta:
        model = CustomUser
        fields = ('id','email','username', 'first_name', 'last_name', 'date_joined', 'password')
        extra_kwargs = {'password': {'write_only': True}}


class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serialize registration requests and create a new user.
    """
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)


class UserLoginSerializer(serializers.Serializer):
    """
    Authenticate users with email & password 
    """
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Access denied: wrong username or password.')

class ProfileSerializer(UserSerializer):
    """
    Serializer the user profile model 
    """

    class Meta:
        model = Profile
        fields = ('user_id','bookmarks','bio','avatar')
      

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

