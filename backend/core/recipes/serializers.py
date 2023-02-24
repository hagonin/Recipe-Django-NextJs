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
        fields = ('id','title','desc','quantity', 'unit')


class ImageSerializer(serializers.ModelSerializer):
    image_url = serializers.ReadOnlyField()
    
    class Meta:
        model = RecipeImage
        fields = ('image_url','image','caption')

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
    ingredients = IngredientSerializer(many=True,required=False)
    images = ImageSerializer(many=True,required=False)
    
    class Meta: 
        model = Recipe
        fields = ('id','user','title','categories','main_image','image_url','rating', 'ingredients',
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

class RecipeRewriteSerializer(serializers.ModelSerializer):
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
        fields = ('user','categories','main_image','image_url','title','rating', 'ingredients',
                'description', 'instructions', 'images', 'serving', 'prep_time','cook_time',
                'created_at','updated_at','source','notes','total_number_of_bookmarks',
                'reviews', 'reviews_count')

    def _get_or_create_categories(self, categories, recipe):
        for category in categories:
            cat_obj = Category.objects.get_or_create(**category)
            recipe.categories.add(cat_obj)

    def _create_ingredients(self, ingredients, recipe):
        for ingredient in ingredients:
            ingr = Ingredient.objects.create(**ingredient)
            recipe.ingredients.add(ingr)

    def _create_images(self, images, recipe):
        for image in images:
            img = Recipe.objects.create(**image)
            recipe.images.add(img)

    def create(self,validated_data):
        user = self.context.get('user', None)
        categories = validated_data.pop('categories',[])
        ingredients = validated_data.pop('ingredients',[])
        images = validated_data.pop('images',[])

        recipe = Recipe.objects.create(user=user, **validated_data)
        self._get_or_create_categories(categories,recipe)
        self._create_images(ingredients, recipe)
        self._create_images(images, recipe)

        return recipe
    
    def update(self, instance, validated_data):
        """Update recipe"""
        categories = validated_data.pop('categories', None)
        ingredients = validated_data.pop('ingredients', None)
        images = validated_data.pop('images', None)

        if categories is not None : 
            instance.cetegories.clear()
            self._get_or_create_categories(categories, instance)
        if ingredients is not None :
            instance.ingredients.clear()
            self._create_ingredients(ingredients, instance)
        if images is not None :
            instance.images.clear()
            self._create_images(images, instance)

        instance.save()
        return instance