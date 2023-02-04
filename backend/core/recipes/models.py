from django.db import models
from django.db.models import Index
from django.contrib.postgres.search import SearchVectorField
from django.contrib.postgres.indexes import GinIndex
from django.conf import settings
from django.utils.translation import gettext_lazy as _

from .validators import validate_unit_of_measure


class Category(models.Model):
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


def get_default_recipe_category():
    return Category.objects.get_or_create(name='Others')[0]


class Recipe(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="recipes", on_delete=models.CASCADE)
    category = models.ForeignKey(Category,related_name="recipes",on_delete=models.SET(get_default_recipe_category))
    title = models.CharField(max_length=100, verbose_name='Recipe|title')
    summary = models.CharField(max_length=500, blank=True, verbose_name='Recipe|summary')
    description = models.TextField(blank=True, verbose_name='Recipe|description')
    image = models.ImageField(upload_to='images', null=True, blank=True)
    serving = models.IntegerField(blank=True, null=True)
    rating_value = models.FloatField(null=True, blank=True)
    rating_count = models.IntegerField(null=True, blank=True)
    slug = models.SlugField(unique=True, max_length=50)
    prep_time = models.CharField(max_length=100, blank=True)  
    cook_time = models.CharField(max_length=100, blank=True)  
    search_vector = SearchVectorField(null=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    source = models.CharField(max_length=200, verbose_name='Source|url', null=True)


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
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredient', related_query_name='recipe')
    name = models.CharField(max_length=220)   
    quantity = models.CharField(max_length=50, blank=True, null=True)
    unit = models.CharField(max_length=50,validators=[validate_unit_of_measure])       
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
        

class Instruction(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE,related_name='instruction')
    direction = models.TextField(blank=True, verbose_name='Recipe|direction')

class RecipeImage(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    image = models.ImageField( 
        verbose_name= "image",
        help_text= "Upload a product image",
        upload_to="images",
        default="images/default.png"
    ) 
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
    recipe = models.ForeignKey(Recipe, related_name='review', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='review',on_delete=models.SET_NULL, null=True)
    content = models.TextField(blank=True, null=True)
    stars = models.FloatField()
    date_added = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ("-date_added",)

    def __str__(self):
        return f"{self.content[:20]} by {self.user.username}"