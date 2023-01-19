from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from django.conf import settings

from .validators import validate_unit_of_measure

# class Category(models.Model):
#     name = models.CharField(max_length=120,
#                             unique=True,
#                             help_text="Maximum 120 characters",
#                             verbose_name=_('Category|name'))
#     slug = models.SlugField(unique=True, help_text='Automatically generated from the title')
#     order_index = models.PositiveIntegerField(null=True, blank=True)

#     def __str__(self):
#         return self.name

#     class Meta:
#         verbose_name = _('Category')
#         verbose_name_plural = _('Categories')
#         ordering = ['order_index']


class Recipe(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, verbose_name=_('Recipe|title'))
    summary = models.CharField(max_length=500, blank=True, verbose_name=_('Recipe|summary'))
    description = models.TextField(blank=True, verbose_name=_('Recipe|description'))
    directions = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    # category = models.ForeignKey(Category, on_delete=models.PROTECT)
    # slug = models.SlugField(unique=True, max_length=50, null=False, blank=False)
    # prep_time = models.CharField(max_length=100, blank=True)  
    # ctime = models.CharField(max_length=100, blank=True)  

    # def __str__(self):
    #     return self.title

    # class Meta:
    #     ordering = ['title']
    #     verbose_name = _('Recipe')


class Ingredient(models.Model):
    recipe = models.ForeignKey('Recipe', on_delete=models.CASCADE)
    name = models.CharField(max_length=220)
    desc = models.TextField (blank=True, null=True)
    quantity = models.CharField(max_length=50)
    unit = models.CharField(max_length=50,validators=[validate_unit_of_measure])
    directions = models.TextField (blank=True, null=True) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)




# class RecipeImage(models.Model):
#     recipe = models.ForeignKey('Recipe', on_delete=models.CASCADE)
#     image = models.ImageField(upload_to='recipe') 
#     caption = models.CharField(max_length=200, verbose_name=_('Photo|caption'))
#     extracted = models.JSONField(blank=True, null=True)

#     class Meta:
#         verbose_name = _('Image')
