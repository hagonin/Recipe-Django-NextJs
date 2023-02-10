from rest_framework import serializers
from rest_flex_fields import FlexFieldsModelSerializer
from .models import Recipe, RecipeReview, Category,RecipeIngredient,Ingredient,RecipeImage


class CategorySerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Category
        fields = ('id','name',)
    
        expandable_fields = {
            'recipes': ('recipes.RecipeSerializer', {'many': True})
        }

class IngredientSerializer(FlexFieldsModelSerializer):
    class Meta: 
        model = Ingredient
        fields = ('title', 'description')

    
class RecipeSerializer(FlexFieldsModelSerializer):
    search_rank = serializers.FloatField(read_only=True)
    author = serializers.CharField(source="author.username", read_only=True)
    total_number_of_bookmarks = serializers.SerializerMethodField()
    
    
    class Meta: 
        model = Recipe
        exclude = ['search_vector']

        expandable_fields = {
            'category': ('recipes.CategorySerializer', {'many':True}),
            'recipe_detail': ('recipes.RecipeIngredientSerializer',{'many':True}),
            'reviews': ('recipes.ReviewSerializer', {'many':True}),
            'image': ('recipes.ImageSerializer', {'many':True}),
        }

    def get_total_number_of_bookmarks(self, obj):
        return obj.get_total_number_of_bookmarks()

class RecipeIngredientSerializer(FlexFieldsModelSerializer):
    class Meta: 
        model = RecipeIngredient
        fields = ('pk','quantity', 'unit', 'notes')

        expandable_fields = {
            'recipe': ('recipes.CategorySerializer'),
            'ingredients': ('recipes.IngredientSerializer')
        }    
    

class ReviewSerializer(FlexFieldsModelSerializer):

    class Meta: 
        model = RecipeReview
        fields = ('content','stars', 'date_added')

        expandable_fields = {
            'recipe':'recipes.CategorySerializer',
            'user': 'users.UserSerializer'
        }

class ImageSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = RecipeImage
        fields = ('pk','caption', 'image')

        expandable_fields = {
            'recipes': ('recipes.RecipeSerializer', {'many': True})
        }


