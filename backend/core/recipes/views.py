from rest_framework import viewsets
from rest_flex_fields import is_expanded
from rest_framework.permissions import AllowAny,IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from .filters import SearchVectorFilter
from .serializers import (CategorySerializer,RecipeIngredientSerializer,
    RecipeReadSerializer,RecipeWriteSerializer, ReviewReadSerializer,ReviewWriteSerializer)
from .models import Recipe,RecipeIngredient,RecipeReview,Category

from .permissions import IsAuthorOrReadOnly


class CategoryViewSet(viewsets.ModelViewSet):
    """
    List and Retrieve categories
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filterset_fields = ['name']
    search_fields = ['name']


class RecipeIngredientViewSet(viewsets.ModelViewSet):

    queryset = RecipeIngredient.objects.all()
    serializer_class = RecipeIngredientSerializer


class RecipeListViewSet(viewsets.ModelViewSet):
    """
    CRUD recipes
    """
    queryset = Recipe.objects.all()
    serializer_class = RecipeReadSerializer
    permit_list_expands = ['category']
    filter_backends = (SearchVectorFilter,DjangoFilterBackend,OrderingFilter)
    search_fields = ['search_vector']
    ordering_fields = ['rating_value', 'created_at']

    def get_queryset(self):
        queryset = Recipe.objects.all()

        if is_expanded(self.request, 'categories'):
            queryset = queryset.prefetch_related('categories')
        
        return queryset

    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return RecipeWriteSerializer

        return RecipeReadSerializer


class RecipeReviewViewset(viewsets.ModelViewSet):
    """
    CRUD reviews a recipe
    """
    queryset = RecipeReview.objects.all()
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return ReviewWriteSerializer

        return ReviewReadSerializer

    def get_permissions(self):
        if self.action in ("create",):
            self.permission_classes = (IsAuthenticated,)
        elif self.action in ("update", "partial_update", "destroy"):
            self.permission_classes = (IsAuthorOrReadOnly,)
        else:
            self.permission_classes = (AllowAny,)

        return super().get_permissions()