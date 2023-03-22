from rest_framework import serializers
from datetime import datetime, timezone
from .models import Recipe, RecipeReview, Ingredient,RecipeImage
from users.serializers import UserShortSerializer

class IngredientSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Ingredient
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = RecipeImage
        fields = '__all__'

    def validate_image(self, image):
        if image.size > 5 * 1024 * 1024:
                raise serializers.ValidationError("Image size should not exceed 5 MB.")
        return image

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
    user = UserShortSerializer(read_only=True)
    date_added = serializers.SerializerMethodField()

    def get_date_added(self, obj):
        now = datetime.now(timezone.utc)
        diff = now - obj.date_added
        if diff.days >= 30:
            return obj.date_added.strftime('%-d %B %Y')
        elif diff.days > 0:
            return f"{diff.days} days ago"
        elif diff.seconds >= 3600:
            hours = diff.seconds // 3600
            return f"{hours} {'hour' if hours == 1 else 'hours'} ago"
        elif diff.seconds >= 60:
            minutes = diff.seconds // 60
            return f"{minutes} {'minute' if minutes == 1 else 'minutes'} ago"
        else:
            return 'just now'


    class Meta: 
        model = RecipeReview
        fields = ('id','user','title', 'slug','rating','date_added',
                'content')
        extra_kwargs = {
            'slug': {'read_only': True}
        }
    
class RecipeDetailReadSerializer(serializers.ModelSerializer):
    user = UserShortSerializer(read_only=True)   
    ingredients = IngredientSerializer(many=True)
    images = ImageSerializer(many=True,required=False)
    reviews = serializers.SerializerMethodField(read_only=True)
    total_number_of_bookmarks = serializers.ReadOnlyField()
    rating = serializers.FloatField(read_only=True)

    class Meta:
        model = Recipe
        fields = ('id','user','title','slug','category','main_image','rating', 'ingredients',
                'description', 'instructions', 'images', 'serving', 'prep_time','cook_time','search_vector',
                'created_at','updated_at','source','notes','total_number_of_bookmarks',
                'reviews', 'reviews_count')

    def get_reviews(self, obj):
        queryset = obj.reviews.all()
        serializer = ReviewSerializer(queryset, many=True)
        return serializer.data
    
class RecipeDetailWriteSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    ingredients = IngredientSerializer(many=True)
    images = ImageSerializer(many=True,required=False)
    

    class Meta:
        model = Recipe
        fields = ('id','user','title','slug','category','main_image','ingredients',
                'description', 'instructions', 'images', 'serving', 'prep_time',
                'cook_time','search_vector','created_at','updated_at','source','notes')
    
    def get_user(self, obj):
        return obj.user.username
    
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