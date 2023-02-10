from django.contrib.auth import get_user_model
from django.contrib import admin
from django.contrib.auth.models import Group

from .models import Category, Recipe, Ingredient, RecipeIngredient, RecipeImage,RecipeReview

User = get_user_model()


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin): 
    search_fields = ('title',)
    list_display= ['title','author']
    list_filter = ('category',)
    prepopulated_fields = {'slug':('title',)}
    readonly_fields = ['created_at', 'updated_at']
    raw_id_fields = ['author']
    exclude = ('search_vector',)


admin.site.register(Ingredient)
admin.site.register(RecipeIngredient)
admin.site.register(RecipeReview)
admin.site.register(RecipeImage)

admin.site.unregister(Group)
admin.site.site_header = "Recipe App Admin"