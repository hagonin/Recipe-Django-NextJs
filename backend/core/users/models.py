from django.contrib.auth.models import AbstractUser
from django.conf import settings
from cloudinary.models import CloudinaryField
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver

from django.db import models

from recipes.models import Recipe
from .managers import CustomUserManager


class CustomUser(AbstractUser):
    email = models.EmailField(verbose_name='email address', unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='profile')
    bookmarks = models.ManyToManyField(Recipe, related_name='bookmarked_by', blank=True)
    avatar = CloudinaryField('image',overwrite=True, blank=True)
    bio = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.user.username
    
    @property
    def image_url(self):
        return (
            f"http://res.cloudinary.com/dfjtkh7ie/{self.avatar}"
        )

    @receiver(post_save, sender=CustomUser)
    def create_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=CustomUser)
    def save_profile(sender, instance, **kwargs):
        instance.profile.save()
    


