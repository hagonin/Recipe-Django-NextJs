from django.contrib.auth.models import AbstractUser
from django.conf import settings
from cloudinary.models import CloudinaryField
from django.db import models
from django.utils.translation import gettext_lazy as _

from recipes.models import Recipe
from .managers import CustomUserManager


class CustomUser(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bookmarks = models.ManyToManyField(Recipe, related_name='bookmarked_by', blank=True)
    avatar = CloudinaryField('Image/avatar',overwrite=True,format="jpg")
    bio = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.user.username

    


