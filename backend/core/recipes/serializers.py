from rest_framework import serializers
from .models import Recipe, RecipeReview, Category,Ingredient,RecipeImage


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id','name')

class IngredientSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Ingredient
        fields = ('title','description','quantity', 'unit', 'recipe')


class ImageSerializer(serializers.ModelSerializer):
    image_url = serializers.ReadOnlyField()
    
    class Meta:
        model = RecipeImage
        fields = ('image_url','image','caption')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.pop("image")

        return representation

class RecipeSerializer(serializers.ModelSerializer):
    search_rank = serializers.FloatField(read_only=True)
    author = serializers.CharField(source="author.username", read_only=True)
    total_number_of_bookmarks = serializers.SerializerMethodField()
    category = CategorySerializer()
    ingredients = IngredientSerializer(many=True)
    images = ImageSerializer(many=True)
    
    class Meta: 
        model = Recipe
        exclude = ['search_vector']


    def get_total_number_of_bookmarks(self, obj):
        return obj.get_total_number_of_bookmarks()
    
    

class ReviewSerializer(serializers.ModelSerializer):

    class Meta: 
        model = RecipeReview
        fields = ('content','stars', 'date_added')




