from django.contrib.auth import get_user_model
from django.contrib import admin
from django.contrib.auth.models import Group

from .models import Source, Category, Recipe, RecipeIngredient, Instruction, RecipeImage,RecipeReview

User = get_user_model()


class SourceAdmin(admin.ModelAdmin):
    list_display = ('name', 'url',)


class RecipeInlineAdmin(admin.TabularInline):
    model = Recipe
    extra = 0

class ImageInlineAdmin(admin.StackedInline):
    model = RecipeImage
    extra = 0

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'type',)

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin): 
    inlines = [ImageInlineAdmin]   
    search_fields = ('title',)
    list_display= ['title','author']
    list_filter = ('categories',)
    prepopulated_fields = {'slug':('title',)}
    readonly_fields = ['created_at', 'updated_at']
    raw_id_fields = ['author']

@admin.register(RecipeIngredient)
class IngredientAdmin(admin.ModelAdmin):
    extra = 0
    readonly_fields = ['quantity_as_float']


admin.site.register(Source, SourceAdmin)
admin.site.register(Instruction)
admin.site.register(RecipeReview)

admin.site.unregister(Group)
admin.site.site_header = "Recipe App Admin"