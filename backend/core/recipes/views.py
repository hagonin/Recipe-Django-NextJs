from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
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

class IngredientViewSet(viewsets.ModelViewSet):
    """
    List and Retrieve ingredients
    """
    queryset = Ingredient.objects.all()
    serializer_class = serializers.IngredientSerializer

class ImageViewSet(viewsets.ModelViewSet):
    """
    List and Retrieve image's recipe
    """
    queryset = RecipeImage.objects.all()
    serializer_class = serializers.ImageSerializer

    @action(detail=False, methods=["POST"])
    def multiple_upload(self, request, *args, **kwargs):
        """Upload multiple images and create objects"""
        serializer = serializers.MultipleImageSerializer(data=request.data or None)
        serializer.is_valid(raise_exception=True)
        images = serializer.validated_data.get("images")

        images_list = []
        for image in images:
            images_list.append(
                RecipeImage(file=image)
            )
        if images_list:
            RecipeImage.objects.bulk_create(images_list)

        return Response("Success")

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