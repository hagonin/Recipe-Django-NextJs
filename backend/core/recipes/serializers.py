from rest_framework import serializers
from rest_flex_fields import FlexFieldsModelSerializer
from .models import Recipe, RecipeReview, Category,RecipeIngredient


class CategorySerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class RecipeIngredientSerializer(serializers.ModelSerializer):
    class Meta: 
        model = RecipeIngredient
        fields = '__all__'


class RecipeReviewSerializer(serializers.ModelSerializer):
    class Meta: 
        model = RecipeReview
        fields = '__all__'
      
class RecipeSerializer(FlexFieldsModelSerializer):
    class Meta: 
        model = Recipe
        fields = '__all__'
        expandable_fields = {
          'categories': (CategorySerializer, {'many': True}),
          
        }
