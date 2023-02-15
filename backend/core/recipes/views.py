from rest_framework import viewsets
from rest_framework.permissions import AllowAny,IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from .filters import SearchVectorFilter
from . import serializers
from .models import Recipe,RecipeImage,Category,RecipeReview,Ingredient

from .permissions import IsAuthorOrReadOnly


class CategoryViewSet(viewsets.ModelViewSet):
    """
    List and Retrieve categories
    """
    queryset = Category.objects.all()
    serializer_class = serializers.CategorySerializer
    filterset_fields = ['name']
    search_fields = ['name']

class IngredientViewSet(viewsets.ModelViewSet):
    """
    List and Retrieve categories
    """
    queryset = Ingredient.objects.all()
    serializer_class = serializers.IngredientSerializer
   

class RecipeListViewSet(viewsets.ModelViewSet):
    """
    CRUD recipes
    """
    queryset = Recipe.objects.all()
    serializer_class = serializers.RecipeSerializer
    filter_backends = (SearchVectorFilter,DjangoFilterBackend,OrderingFilter)
    search_fields = ['search_vector']
    ordering_fields = ['rating_value', 'created_at']


class RecipeReviewViewset(viewsets.ModelViewSet):
    """
    CRUD reviews a recipe
    """
    queryset = RecipeReview.objects.all()
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return serializers.ReviewWriteSerializer

        return serializers.ReviewReadSerializer

    def get_permissions(self):
        if self.action in ("create",):
            self.permission_classes = (IsAuthenticated,)
        elif self.action in ("update", "partial_update", "destroy"):
            self.permission_classes = (IsAuthorOrReadOnly,)
        else:
            self.permission_classes = (AllowAny,)

        return super().get_permissions()