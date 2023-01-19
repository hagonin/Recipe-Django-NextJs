from django.contrib.auth import get_user_model
from django.contrib import admin

from .models import Recipe, Ingredient

User = get_user_model()

admin.site.register(Ingredient)

class IngredientInline(admin.StackedInline):
    model = Ingredient
    extra = 0
    # fields = ['name', 'quanity', 'unit', 'directions']


class RecipeAdmin(admin.ModelAdmin):
    inlines = [IngredientInline]
    list_display= ['title','user']
    readonly_fields = ['created_at', 'updated_at']
    raw_id_fields = ['user']

admin.site.register(Recipe,RecipeAdmin)