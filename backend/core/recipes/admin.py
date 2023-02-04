from django.contrib.auth import get_user_model
from django.contrib import admin
from django.contrib.auth.models import Group

from .models import Category, Recipe, RecipeIngredient, Instruction, RecipeImage,RecipeReview

User = get_user_model()


class InstructionInline(admin.StackedInline):
    model = Instruction
    extra = 0

class IngredientInline(admin.StackedInline):
    model = RecipeIngredient
    extra = 0

class ImageInline(admin.StackedInline):
    model = RecipeImage
    extra = 0

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin): 
    inlines = [IngredientInline,InstructionInline,ImageInline,]   
    search_fields = ('title',)
    list_display= ['title','author']
    list_filter = ('category',)
    prepopulated_fields = {'slug':('title',)}
    readonly_fields = ['created_at', 'updated_at']
    raw_id_fields = ['author']
    exclude = ('search_vector',)



admin.site.register(RecipeReview)

admin.site.unregister(Group)
admin.site.site_header = "Recipe App Admin"