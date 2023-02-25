from rest_framework import serializers
from .models import Recipe, RecipeReview, Ingredient,RecipeImage
from users.serializers import UserSerializer
from cloudinary.models import CloudinaryField


class IngredientSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Ingredient
        fields = ('id','title','desc','quantity', 'unit','recipe')


class ImageSerializer(serializers.ModelSerializer):
    image_url = serializers.ReadOnlyField()
    
    class Meta:
        model = RecipeImage
        fields = ('image_url','image','caption','recipe')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.pop("image")

        return representation

class MultipleImageSerializer(serializers.Serializer):
    images = ImageSerializer()

class RecipeSerializer(serializers.ModelSerializer):
    search_rank = serializers.FloatField(read_only=True)
    image_url = serializers.ReadOnlyField()
    user = serializers.CharField(source="user.username", read_only=True)
    total_number_of_bookmarks = serializers.SerializerMethodField()
    ingredients = IngredientSerializer(many=True,required=False)
    images = ImageSerializer(many=True,required=False)
    reviews = serializers.SerializerMethodField(method_name='get_reviews', read_only=True)
    
    class Meta: 
        model = Recipe
        fields = ('id','user','title','slug','category','main_image','image_url','rating', 'ingredients',
                'description', 'instructions', 'images', 'serving', 'prep_time','cook_time',
                'created_at','updated_at','source','notes','total_number_of_bookmarks',
                'reviews', 'reviews_count','search_rank')


    
    def get_total_number_of_bookmarks(self, obj):
        return obj.get_total_number_of_bookmarks()
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.pop("main_image")

        return representation
    
    def get_reviews(self, obj):
        reviews = obj.reviews.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data
    
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
    ingredients = IngredientSerializer(many=True)
    images = ImageSerializer(many=True,required=False)
    reviews = ReviewSerializer(many=True, read_only=True)
    total_number_of_bookmarks = serializers.ReadOnlyField()
    reviews_count = serializers.ReadOnlyField()
    rating = serializers.ReadOnlyField()

    class Meta:
        model = Recipe
        fields = ('user','title', 'category','main_image','image_url','rating', 'ingredients',
                'description', 'instructions', 'images', 'serving', 'prep_time','cook_time',
                'created_at','updated_at','source','notes','total_number_of_bookmarks',
                'reviews', 'reviews_count')


    def _create_ingredients(self, ingredients, recipe):
        for ingredient in ingredients:
            ingr = Ingredient.objects.create(**ingredient)
            recipe.ingredients.add(ingr)

    def _create_images(self, images, recipe):
        for image in images:
            img = RecipeImage.objects.create(**image)
            recipe.images.add(img)

    def create(self,validated_data):
        user = self.context.get('user', None)
        ingredients = validated_data.pop('ingredients',[])
        images = validated_data.pop('images',[])

        recipe = Recipe.objects.create(user=user, **validated_data)
        self._create_ingredients(ingredients, recipe)
        self._create_images(images, recipe)

        return recipe
    
    def update(self, instance, validated_data):
        """Update recipe"""
        ingredients = validated_data.pop('ingredients', None)
        images = validated_data.pop('images', None)

        
        if ingredients is not None :
            instance.ingredients.clear()
            self._create_ingredients(ingredients, instance)
        if images is not None :
            instance.images.clear()
            self._create_images(images, instance)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance