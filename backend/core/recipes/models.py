import pint
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from django.conf import settings

from .validators import validate_unit_of_measure
from .utils import number_str_to_float

class Category(models.Model):
    name = models.CharField(
        max_length=120,
        unique=True,
        help_text="Maximum 120 characters",
        verbose_name=_('Category|name')
    )
    slug = models.SlugField(unique=True, help_text='Automatically generated from the title')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Category')
        verbose_name_plural = _('Categories')


class Recipe(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category = models.ForeignKey('Category', on_delete=models.PROTECT, related_name='recipe')
    title = models.CharField(max_length=100, verbose_name=_('Recipe|title'))
    summary = models.CharField(max_length=500, blank=True, verbose_name=_('Recipe|summary'))
    description = models.TextField(blank=True, verbose_name=_('Recipe|description'))
    serve = models.IntegerField(blank=True, null=True)
    slug = models.SlugField(unique=True, max_length=50)
    prep_time = models.CharField(max_length=100, blank=True)  
    cook_time = models.CharField(max_length=100, blank=True)  
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)


    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']
        verbose_name = _('Recipe')
    
    def get_rating(self):
        total = sum(int(review['stars']) for review in self.reviews.values())

        if self.reviews.count() > 0:
            return total / self.reviews.count()
        else:
            return 0


class RecipeIngredient(models.Model):
    recipe = models.ForeignKey('Recipe', on_delete=models.CASCADE, related_name='recipes', related_query_name='recipe')
    name = models.CharField(max_length=220)   
    quantity = models.CharField(max_length=50, blank=True, null=True)
    quantity_as_float = models.FloatField(blank=True, null=True)
    unit = models.CharField(max_length=50,validators=[validate_unit_of_measure])       
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
        

    def save(self, *args, **kwargs):
        qty = self.quantity
        qty_as_float, qty_as_float_success = number_str_to_float(qty)
        if qty_as_float_success:
            self.quantity_as_float = qty_as_float
        else:
            self.quantity_as_float = None
        super().save(*args, **kwargs)


class Instruction(models.Model):
    recipe = models.ForeignKey('Recipe', on_delete=models.CASCADE)
    step_number = models.IntegerField(blank=True, null=True)
    method = models.TextField(blank=True, verbose_name=_('Recipe|method'))

  

class RecipeImage(models.Model):
    recipe = models.ForeignKey('Recipe', on_delete=models.CASCADE)
    image = models.ImageField( 
        verbose_name=_("image"),
        help_text=_("Upload a product image"),
        upload_to="images/",
        default="images/default.png"
    ) 
    caption = models.CharField(
        max_length=200, 
        verbose_name=_('Photo|caption'),
        null=True,
        blank=True
    )
    default = models.BooleanField(default=False)

    class Meta:
        verbose_name = _('Recipe Image')


class RecipeReview(models.Model):
    recipe = models.ForeignKey('Recipe', related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='reviews',on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    stars = models.IntegerField()
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.recipe