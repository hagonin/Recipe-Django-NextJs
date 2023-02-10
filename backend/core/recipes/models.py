from django.db import models
from cloudinary.models import CloudinaryField
from django.db.models import Index
from django.contrib.postgres.search import SearchVectorField
from django.contrib.postgres.indexes import GinIndex
from django.conf import settings
from django.utils.translation import gettext_lazy as _

from .validators import validate_unit_of_measure


class Category(models.Model):
    """
    Recipe categories
    """
    name = models.CharField(
        max_length=120,
        unique=True,
    )

    class Meta:
        ordering = ('name',)
        verbose_name = _('Recipe Category')
        verbose_name_plural = _('Recipe Categories')

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    """
    Returns ingredients for a recipe
    """
    title = models.CharField(max_length=220, blank=True)
    description = models.TextField(blank=True, null=True)   

    def __str__(self):
        return self.title


class Recipe(models.Model):
    """
    Recipe object
    """
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category = models.ManyToManyField(Category,related_name="recipe_list")
    # ingredients = models.ManyToManyField(Ingredient,through="RecipeIngredient")
    title = models.CharField(max_length=100, verbose_name='Recipe|title')
    description = models.TextField(blank=True, verbose_name='Recipe|description')
    instructions = models.TextField(blank=True, verbose_name='Recipe|instruction')
    image = models.ManyToManyField('recipes.RecipeImage', related_name='recipes')
    serving = models.IntegerField(blank=True, null=True)
    rating_value = models.FloatField(null=True, blank=True)
    rating_count = models.IntegerField(null=True, blank=True)
    slug = models.SlugField(unique=True, max_length=255)
    prep_time = models.CharField(max_length=100, blank=True)  
    cook_time = models.CharField(max_length=100, blank=True)  
    search_vector = SearchVectorField(null=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    source = models.CharField(max_length=200, verbose_name='Source|url', null=True)
    notes = models.TextField(blank=True, null=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Recipe'
        indexes = [
            GinIndex(fields=['search_vector']),
            Index(fields=['slug']),
            Index(fields=['rating_value']),
            Index(fields=['rating_count']),
        ]

    def __str__(self):
        return self.title

    def get_total_number_of_bookmarks(self):
        return self.bookmarked_by.count()

        
class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE,related_name='recipes', related_query_name='recipe')
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE,related_name='recipes', related_query_name='recipe')
    quantity = models.CharField(max_length=50, blank=True, null=True)
    unit = models.CharField(max_length=50,validators=[validate_unit_of_measure]) 

    def __str__(self):
        return f"{self.recipe.title} - {self.ingredient.title}"

class RecipeImage(models.Model):
    """
    Returns images for a recipe
    """
    image = CloudinaryField('Image/recipe',overwrite=True, null=True,)
    caption = models.CharField(
        max_length=200, 
        verbose_name= 'Photo|caption',
        null=True,
        blank=True
    )
    default = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Recipe Image'


class RecipeReview(models.Model):
    """
    Returns comments for related recipe
    """
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE,related_name='reviews', related_query_name='review')
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='reviews', related_query_name='review')
    content = models.TextField(blank=True, null=True)
    stars = models.FloatField()
    date_added = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ("-date_added",)

    def __str__(self):
        return f"{self.content[:20]} by {self.user.username}"