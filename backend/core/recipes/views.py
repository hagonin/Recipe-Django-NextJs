from rest_framework.viewsets import ReadOnlyModelViewSet
from .serializers import RecipeSerializer,CategorySerializer,RecipeIngredientSerializer,RecipeReviewSerializer
from .models import Recipe,Category,RecipeIngredient,RecipeReview


class RecipeViewSet(ReadOnlyModelViewSet):

    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    search_fields = ['search_vector']

class CategoryViewSet(ReadOnlyModelViewSet):

    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class RecipeIngredientViewSet(ReadOnlyModelViewSet):

    serializer_class = RecipeIngredientSerializer
    queryset = RecipeIngredient.objects.all()

class RecipeReViewSet(ReadOnlyModelViewSet):

    serializer_class = RecipeReviewSerializer
    queryset = RecipeReview.objects.all()