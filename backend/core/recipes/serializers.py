from rest_framework import serializers
from .models import Recipe, RecipeReview, Ingredient,RecipeImage
from users.serializers import UserSerializer

class IngredientSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Ingredient
        fields = ('id','heading','title','quantity', 'unit','recipe')

class ImageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = RecipeImage
        fields = ('id','image','caption','recipe')

class MultipleImageSerializer(serializers.Serializer):
    images = ImageSerializer()

class RecipeSerializer(serializers.ModelSerializer):
    search_rank = serializers.FloatField(read_only=True)
    reviews_count = serializers.ReadOnlyField()
    total_number_of_bookmarks = serializers.SerializerMethodField()
    rating = serializers.ReadOnlyField()
    
    class Meta: 
        model = Recipe
        fields = ('id','title','slug','category','main_image','description',
            'updated_at','total_number_of_bookmarks','rating','reviews_count',
            'search_rank','search_vector')
    
    def get_total_number_of_bookmarks(self, obj):
        return obj.get_total_number_of_bookmarks()
    
class ReviewSerializer(serializers.ModelSerializer):
    # user = serializers.CharField(source='user.username',read_only=True)
    # avatar = serializers.CharField(source='user.profile.avatar')
    user = UserSerializer(read_only=True)

    class Meta: 
        model = RecipeReview
        fields = ('id','user','title', 'slug','rating','date_added',
                'content')
        extra_kwargs = {
            'slug': {'read_only': True}
        }

class RecipeDetailReadSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username',read_only=True)
    ingredients = IngredientSerializer(many=True)
    images = ImageSerializer(many=True,required=False)
    reviews = serializers.SerializerMethodField(method_name='get_reviews', read_only=True)
    total_number_of_bookmarks = serializers.ReadOnlyField()
    reviews_count = serializers.ReadOnlyField()
    rating = serializers.ReadOnlyField()

    class Meta:
        model = Recipe
        fields = ('id','user','title','slug','category','main_image','rating', 'ingredients',
                'description', 'instructions', 'images', 'serving', 'prep_time','cook_time','search_vector',
                'created_at','updated_at','source','notes','total_number_of_bookmarks',
                'reviews', 'reviews_count')
        
    def get_reviews(self, obj):
        reviews = obj.reviews.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data
    
class RecipeDetailWriteSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username',read_only=True)
    ingredients = IngredientSerializer(many=True)
    images = ImageSerializer(many=True,required=False)
    

    class Meta:
        model = Recipe
        fields = ('id','user','title','slug','category','main_image','ingredients',
                'description', 'instructions', 'images', 'serving', 'prep_time',
                'cook_time','search_vector','created_at','updated_at','source','notes')

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