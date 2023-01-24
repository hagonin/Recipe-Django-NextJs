from rest_framework import serializers
from rest_flex_fields import FlexFieldsModelSerializer
from .models import Recipe, RecipeReview, Category,RecipeIngredient


class CategorySerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Category
        fields = ['pk', 'name']

class RecipeIngredientSerializer(serializers.ModelSerializer):
    class Meta: 
        model = RecipeIngredient
        fields = '__all__'


class RecipeReviewSerializer(serializers.ModelSerializer):
    class Meta: 
        model = RecipeReview
      
class RecipeSerializer(FlexFieldsModelSerializer):
    class Meta: 
        model = Recipe
        expandable_fields = {
          'category': (CategorySerializer, {'many': True})
        }
        exclude = ['search_vector']
