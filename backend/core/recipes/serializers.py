from rest_framework import serializers
from .models import Recipe, RecipeReview, Category,Ingredient,RecipeImage
from users.serializers import UserSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id','name')


class IngredientSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Ingredient
        fields = ('title','desc','quantity', 'unit', 'recipe')


class ImageSerializer(serializers.ModelSerializer):
    image_url = serializers.ReadOnlyField()
    
    class Meta:
        model = RecipeImage
        fields = ('image_url','image','caption', 'recipe')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.pop("image")

        return representation

class MultipleImageSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child = serializers.ImageField()
    )

class RecipeSerializer(serializers.ModelSerializer):
    search_rank = serializers.FloatField(read_only=True)
    image_url = serializers.ReadOnlyField()
    user = serializers.CharField(source="user.username", read_only=True)
    total_number_of_bookmarks = serializers.SerializerMethodField()
    categories = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    ingredients = IngredientSerializer(many=True)
    images = ImageSerializer(many=True,required=False)
    
    class Meta: 
        model = Recipe
        fields = ('slug','user','categories','main_image','image_url','rating', 'ingredients',
                'description', 'instructions', 'images', 'serving', 'prep_time','cook_time',
                'created_at','updated_at','source','notes','total_number_of_bookmarks',
                'reviews', 'reviews_count','search_rank')


    
    def get_total_number_of_bookmarks(self, obj):
        return obj.get_total_number_of_bookmarks()
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.pop("main_image")

        return representation
    
    
class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta: 
        model = RecipeReview
        fields = '__all__'
        extra_kwargs = {
            'slug': {'read_only': True}
        }

class RecipeDetailSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    categories = CategorySerializer(many=True)
    ingredients = IngredientSerializer(many=True)
    images = ImageSerializer(many=True,required=False)
    reviews = ReviewSerializer(many=True, read_only=True)
    total_number_of_bookmarks = serializers.ReadOnlyField()
    reviews_count = serializers.ReadOnlyField()
    rating = serializers.ReadOnlyField()

    class Meta:
        model = Recipe
        fields = ('user','categories','main_image','image_url','rating', 'ingredients',
                'description', 'instructions', 'images', 'serving', 'prep_time','cook_time',
                'created_at','updated_at','source','notes','total_number_of_bookmarks',
                'reviews', 'reviews_count')

    def create(self,validated_data):
        user = self.context.get('user', None)
        categories = validated_data.pop('categories')
        ingredients = validated_data.pop('ingredients')
        images = validated_data.pop('images')

        recipe = Recipe.objects.create(user=user, **validated_data)

        for category in categories:
            Category.objects.create(recipe = recipe, **category)

        for image in images:
            image.recipe = recipe
            image.save()

        for ingredient in ingredients:
            ingredient.recipe = recipe
            ingredient.save()

        return recipe
    
    def update(self, instance, validated_data):
        categories = validated_data.pop('categories', None)
        ingredients = validated_data.pop('ingredients', None)
        images = validated_data.pop('images', None)

        recipe = super().update(instance, validated_data)

        if images is not None:
            for image in images:
                image.recipe = recipe
                image.save()
            recipe.images.set(images)

        if ingredients is not None:
            for ingredient in ingredients:
                ingredient.recipe = recipe
                ingredient.save()
            recipe.ingredients.set(ingredients)

        if categories is not None:
            recipe.categories.set(categories)

        return recipe