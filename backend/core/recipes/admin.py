from django.contrib import admin
from django.contrib.auth.models import Group

from .models import  Recipe, Ingredient, RecipeImage,RecipeReview

class IngredientInline(admin.StackedInline):
    model = Ingredient
    extra = 0

class RecipeImageInline(admin.StackedInline):
    model = RecipeImage
    extra = 0

@admin.register(Recipe)
class RecipeModelAdmin(admin.ModelAdmin): 
    inlines = [IngredientInline,RecipeImageInline]
    search_fields = ('title','ingredients')
    list_display= ('title','user')
    list_filter = ('category',)
    prepopulated_fields = {'slug':('title',)}
    readonly_fields = ('created_at', 'updated_at')
    raw_id_fields = ('user',)

@admin.register(RecipeReview)
class RecipeReviewModelAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug':('title',)}


admin.site.unregister(Group)
admin.site.site_header = "Recipe App Admin"