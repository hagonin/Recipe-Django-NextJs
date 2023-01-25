import os 

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.template.defaultfilters import slugify
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
    
def get_image_filename(instance,filename):
    name = instance.image_path
    slug = slugify(name)

    return f"users/{slug}-{filename}"

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bookmarks = models.ManyToManyField(Recipe, related_name='bookmarked_by')
    avatar = models.ImageField(upload_to=get_image_filename, blank=True)
    bio = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.user.email
    
    @property
    def filename(self):
        return os.path.basename(self.image.name)