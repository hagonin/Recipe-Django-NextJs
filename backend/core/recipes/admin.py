from django.contrib import admin
from django.contrib.auth.models import Group

from .models import Category, Recipe, Ingredient, RecipeImage,RecipeReview


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin): 
    search_fields = ('title','ingredients')
    list_display= ('title','user')
    list_filter = ('categories',)
    prepopulated_fields = {'slug':('title',)}
    readonly_fields = ('created_at', 'updated_at')
    raw_id_fields = ('user',)


admin.site.register(Ingredient)
admin.site.register(RecipeReview)
admin.site.register(RecipeImage)

admin.site.unregister(Group)
admin.site.site_header = "Recipe App Admin"