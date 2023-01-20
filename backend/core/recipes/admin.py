from django.contrib.auth import get_user_model
from django.contrib import admin
from django.contrib.auth.models import Group

from .models import Category, Recipe, RecipeIngredient, Instruction, RecipeImage

User = get_user_model()

admin.site.site_header = "Recipe App Admin"
admin.site.unregister(Group)

admin.site.register(RecipeIngredient)

class IngredientInline(admin.StackedInline):
    model = RecipeIngredient
    extra = 0
    readonly_fields = ['quantity_as_float']


class InstructionInline(admin.StackedInline):
    model = Instruction
    extra = 0

class ImageInline(admin.StackedInline):
    model = RecipeImage
    extra = 0

class RecipeAdmin(admin.ModelAdmin):
    inlines = [IngredientInline,InstructionInline,ImageInline]
    list_display= ['title','author']
    readonly_fields = ['created_at', 'updated_at']
    raw_id_fields = ['author']

admin.site.register(Recipe,RecipeAdmin)

admin.site.register(Category)