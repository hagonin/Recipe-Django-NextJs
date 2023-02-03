from rest_framework import serializers
from rest_flex_fields import FlexFieldsModelSerializer
from .models import Recipe, RecipeReview, Category,RecipeIngredient, Instruction


class CategorySerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Category
        fields = ('id','name',)

class RecipeInstructionSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Instruction
        fields = '__all__'

class RecipeIngredientSerializer(serializers.ModelSerializer):
    class Meta: 
        model = RecipeIngredient
        fields = '__all__'


class RecipeReadSerializer(FlexFieldsModelSerializer):
    search_rank = serializers.FloatField(read_only=True)
    author = serializers.CharField(source="author.username", read_only=True)
    total_number_of_bookmarks = serializers.SerializerMethodField()
    
    class Meta: 
        model = Recipe
        exclude = ['search_vector']
        expandable_fields = {
        'category': (CategorySerializer),
        }

    def get_total_number_of_bookmarks(self, obj):
        return obj.get_total_number_of_bookmarks()

class RecipeWriteSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Recipe
        fields = "__all__"

class ReviewReadSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="author.username",read_only=True)

    class Meta: 
        model = RecipeReview
        fields = '__all__'


class ReviewWriteSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = RecipeReview
        fields = "__all__"