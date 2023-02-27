from rest_framework import viewsets
from rest_framework.generics import get_object_or_404
from django.http import Http404
from rest_framework.decorators import action
from django.core.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from .forms import RecipeForm
from .filters import SearchVectorFilter
from . import serializers
from .models import Recipe,RecipeImage,RecipeReview,Ingredient

from .permissions import IsOwnerOrReadOnly


class RecipeListViewSet(viewsets.ReadOnlyModelViewSet):
    """
    View recipe
    """
    queryset = Recipe.objects.all()
    serializer_class = serializers.RecipeSerializer
    filter_backends = (SearchVectorFilter,DjangoFilterBackend,OrderingFilter)
    search_fields = ['^search_vector']
    ordering_fields = ['created_at', 'rating']
    filterset_fields = ('category','ingredients__desc', 'title')

class RecipeDetailViewSet(viewsets.ModelViewSet):
    """
    CRUD recipe
    """
    
    queryset = Recipe.objects.all()
    serializer_class = serializers.RecipeDetailSerializer
    ordering_fields = ['created_at']  
    # permission_classes = [IsOwnerOrReadOnly]
    
    
    def _params_to_ints(self, qs):
        """Convert a list of strings to integers."""
        return [int(str_id) for str_id in qs.split(',')]

    def get_serializer_context(self):
        return {'user': self.request.user}    
    
    def get_queryset(self):
        ingredients =self.request.query_params.get('ingredients')
        images =self.request.query_params.get('images')
        queryset = self.queryset
        if ingredients:
            ingr_ids = self._params_to_ints(ingredients)
            queryset = queryset.filter(ingredients__id__in=ingr_ids)
        if images:
            img_ids = self._params_to_ints(images)
            queryset = queryset.filter(images__id__in=img_ids)

        return queryset.filter(user=self.request.user).order_by('-id').distinct()
        
    def get_permissions(self):
        if self.action in ("create",):
            self.permission_classes = (IsAuthenticated,)
        elif self.action in ("update", "partial_update", "destroy"):
            self.permission_classes = (IsOwnerOrReadOnly,)
        else:
            self.permission_classes = (AllowAny,)

        return super().get_permissions()
    
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
                RecipeImage(images=image)
            )
        if images_list:
            RecipeImage.objects.bulk_create(images_list)

        return Response("Success")
    
class RecipeReviewViewset(viewsets.ModelViewSet):
    """
    CRUD reviews a recipe
    """
    lookup_field = 'slug'
    queryset = RecipeReview.objects.all()
    serializer_class = serializers.ReviewSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_object(self):
        if self.action == "create":
            return get_object_or_404(Recipe, slug = self.kwargs['recipe_slug'])
        if self.action == "destroy":
            return get_object_or_404(RecipeReview, recipe__slug= self.kwargs['recipe_slug'])

    def perform_create(self, serializer):
        serializer.save(recipe=self.get_object(), user=self.request.user)        
