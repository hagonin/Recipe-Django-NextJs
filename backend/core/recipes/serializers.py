from rest_framework import serializers
from .models import Recipe, RecipeReview, Category,RecipeIngredient,Ingredient,RecipeImage


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id','name',)

class IngredientSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Ingredient
        fields = ('title', 'description')


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeImage
        fields = ('pk','caption', 'image')


class RecipeSerializer(serializers.ModelSerializer):
    search_rank = serializers.FloatField(read_only=True)
    author = serializers.CharField(source="author.username", read_only=True)
    total_number_of_bookmarks = serializers.SerializerMethodField()
    ingredient = serializers.StringRelatedField(
        many=True, read_only=True
        # queryset=RecipeIngredient.objects.all()
    )
    # category = serializers.StringRelatedField(
    #     many=True,read_only=True
    #     # queryset=Category.objects.all()
    # )
    # image = serializers.PrimaryKeyRelatedField(
    #     many=True,
    #     queryset=RecipeImage.objects.all()
    # )
    
    class Meta: 
        model = Recipe
        exclude = ['search_vector']


    def get_total_number_of_bookmarks(self, obj):
        return obj.get_total_number_of_bookmarks()

class RecipeIngredientSerializer(serializers.ModelSerializer):
    class Meta: 
        model = RecipeIngredient
        fields = ('pk','quantity', 'unit', 'notes')
    

class ReviewSerializer(serializers.ModelSerializer):

    class Meta: 
        model = RecipeReview
        fields = ('content','stars', 'date_added')




