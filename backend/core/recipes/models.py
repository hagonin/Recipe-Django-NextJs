from django.db import models
from cloudinary.models import CloudinaryField
from django.db.models import Index
from django.core import validators
from django.conf import settings
from django.utils.text import slugify
from django.contrib.postgres.search import SearchVectorField
from django.contrib.postgres.indexes import GinIndex
from django.db.models import Avg
from django.utils.translation import gettext_lazy as _

from .validators import validate_unit_of_measure


class Category(models.TextChoices):
    APPETIZERS = 'Appetizers'
    BREAD = 'Bread'
    BREAKFAST = 'Breakfast'
    DESSERTS = 'Desserts'
    VEGAN = 'Vegan'
    DRINK = 'Drink'
    MAINDISH = 'Main Dish'
    SALAD = 'Salad'
    SOUPS = 'Soups, Stew and Chill '
    SIDEDISH = 'Side Dish'
    MARINADES = 'Marinades and Sauces'


class Recipe(models.Model):
    """
    Recipe object
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='recipes')
    category = models.CharField(max_length=50, choices=Category.choices)
    main_image = CloudinaryField('image', overwrite=True, blank=True)     
    title = models.CharField(max_length=100, verbose_name='Recipe|title')
    description = models.TextField(blank=True, verbose_name='Recipe|description')
    instructions = models.TextField(blank=True, verbose_name='Recipe|instruction')
    serving = models.IntegerField(blank=True, null=True)
    slug = models.SlugField(db_index=True,max_length=255, blank=True)
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
            GinIndex(fields=['search_vector']),
            Index(fields=['slug'])
        ]

    def __str__(self):
        return self.title

    def get_total_number_of_bookmarks(self):
        return self.bookmarked_by.count()
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    @property
    def image_url(self):
        return (
            f"http://res.cloudinary.com/dfjtkh7ie/{self.main_image}"
        )
    
    @property
    def reviews_count(self):
        """gets the reviews count for that recipes"""
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
    title = models.CharField(max_length=220, blank=True)
    desc = models.TextField(blank=True, null=True)  
    quantity = models.CharField(max_length=50, blank=True, null=True)
    unit = models.CharField(max_length=50,validators=[validate_unit_of_measure])  

    class Meta:
        unique_together = ('recipe', 'desc')  # to prevent having duplicate ingredients in one recipe
        
    def __str__(self):
        return self.desc


class RecipeImage(models.Model):
    """
    Returns images for a recipe
    """
    recipe = models.ForeignKey(Recipe,on_delete=models.CASCADE, related_name='images',null=True)
    image = CloudinaryField('image',overwrite=True, null=True,)
    caption = models.CharField(
        max_length=200, 
        verbose_name= 'Photo|caption',
        null=True,
        blank=True
    )

    @property
    def image_url(self):
        return (
            f"http://res.cloudinary.com/dfjtkh7ie/{self.image}"
        )

class RecipeReview(models.Model):
    """
    Returns reviews for related recipe
    """
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE,related_name='reviews', related_query_name='review')
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='reviews', related_query_name='review')
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True, null=True)
    slug = models.SlugField(db_index=True, max_length=255)
    rating = models.PositiveIntegerField(validators=[
        validators.MaxValueValidator(5),
        validators.MinValueValidator(1),
    ])
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        # unique_together = ('recipe', 'slug')
        ordering = ("-date_added",)

    def __str__(self):
        return self.title