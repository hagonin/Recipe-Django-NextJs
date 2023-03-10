from django.db import models
from django.db.models import Index
from django.core import validators
from django.conf import settings
from django.contrib.postgres.search import SearchVectorField
from django.contrib.postgres.indexes import GinIndex
from django.db.models import Avg
from django.utils.translation import gettext_lazy as _

from .validators import validate_unit_of_measure


class Category(models.TextChoices):
    APPETIZERS = 'appetizers'
    BREAD = 'bread'
    BREAKFAST = 'breakfast'
    DESSERTS = 'desserts'
    VEGAN = 'vegan'
    DRINK = 'drink'
    MAINDISH = 'main dish'
    SALAD = 'salad'
    SOUPS = 'soups, stew and chill'
    SIDEDISH = 'side dish'
    MARINADES = 'marinades and sauces'

class Recipe(models.Model):
    """
    Recipe object
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='recipes')
    category = models.CharField(max_length=50, choices=Category.choices)
    main_image = models.ImageField(upload_to='recipes')   
    title = models.CharField(max_length=100, verbose_name='Recipe|title')
    description = models.TextField(blank=True, verbose_name='Recipe|description')
    instructions = models.TextField(blank=True, verbose_name='Recipe|instruction')
    serving = models.CharField(max_length=100, blank=True)
    slug = models.SlugField(unique=True, max_length=255, blank=True)
    prep_time = models.CharField(max_length=100, blank=True)  
    cook_time = models.CharField(max_length=100, blank=True)  
    search_vector = SearchVectorField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    source = models.CharField(max_length=200, verbose_name='Source|url', null=True)
    notes = models.TextField(blank=True, null=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Recipe'
        indexes = [
            GinIndex(fields=['search_vector']),     #https://pganalyze.com/blog/full-text-search-django-postgres
            Index(fields=['slug'])
        ]

    def __str__(self):
        return self.title

    def get_total_number_of_bookmarks(self):
        return self.bookmarked_by.count()
    
    @property
    def reviews_count(self):
        """gets the reviews count for that recipe"""
        return self.reviews.count()

    @property
    def rating(self):
        """gets the rating of that recipe from its reviews"""
        return self.reviews.all().aggregate(Avg('rating')).get('rating__avg', '')


class Ingredient(models.Model):
    """
    Returns ingredients for a recipe
    """
    recipe = models.ForeignKey(Recipe,on_delete=models.CASCADE, related_name='ingredients',null=True)
    heading = models.CharField(max_length=220, blank=True, null=True)
    title = models.CharField(max_length=1500)  
    quantity = models.CharField(max_length=50, blank=True, null=True)
    unit = models.CharField(max_length=50,validators=[validate_unit_of_measure], blank=True)  
        
    def __str__(self):
        return self.title


class RecipeImage(models.Model):
    """
    Returns images for a recipe
    """
    recipe = models.ForeignKey(Recipe,on_delete=models.CASCADE, related_name='images',null=True)
    image = models.ImageField(upload_to='recipes',blank=True)
    caption = models.CharField(
        max_length=200, 
        verbose_name= 'Photo|caption',
        null=True,
        blank=True
    )

class RecipeReview(models.Model):
    """
    Returns reviews for related recipe
    """
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE,related_name='reviews', related_query_name='review')
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='reviews', related_query_name='review')
    title = models.CharField(max_length=255, blank=True)
    content = models.TextField(blank=True, null=True)
    slug = models.SlugField(db_index=True, max_length=255)
    rating = models.PositiveIntegerField(validators=[
        validators.MaxValueValidator(5),
        validators.MinValueValidator(1),
    ])
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('recipe', 'slug')
        ordering = ("-date_added",)

    def __str__(self):
        return self.title