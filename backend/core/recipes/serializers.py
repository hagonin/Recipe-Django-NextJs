from rest_framework import serializers
from rest_flex_fields import FlexFieldsModelSerializer
from .models import Recipe, RecipeReview, Category,RecipeIngredient


class CategorySerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class RecipeIngredientSerializer(serializers.ModelSerializer):
    class Meta: 
        model = RecipeIngredient
        fields = '__all__'


class RecipeReviewSerializer(serializers.ModelSerializer):
    class Meta: 
        model = RecipeReview
        fields = '__all__'
      
class RecipeSerializer(FlexFieldsModelSerializer):
    search_rank = serializers.FloatField(read_only=True)
    
    class Meta: 
        model = Recipe
        exclude = ['search_vector']
        expandable_fields = {
          'categories': (CategorySerializer),
          
        }
