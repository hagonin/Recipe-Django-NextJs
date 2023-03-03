from rest_framework import viewsets
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.gzip import gzip_page
from django.views.decorators.vary import vary_on_cookie
from rest_framework.generics import get_object_or_404
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.mixins import (CreateModelMixin,DestroyModelMixin, 
                                UpdateModelMixin)

from rest_framework.permissions import IsAuthenticated,AllowAny  
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from .filters import SearchVectorFilter
from . import serializers
from .models import Recipe,RecipeImage,RecipeReview,Ingredient
from users.models import CustomUser

from .permissions import IsOwner


class RecipeListViewSet(viewsets.ReadOnlyModelViewSet):
    """
    View recipe
    """
    queryset = Recipe.objects.all()
    serializer_class = serializers.RecipeSerializer
    filter_backends = (SearchVectorFilter,DjangoFilterBackend,OrderingFilter)
    search_fields = ['search_vector']
    ordering_fields = ['created_at']
    filterset_fields = ('category','ingredients__title', 'title')

    
class RecipeDetailViewSet(CreateModelMixin,
                        UpdateModelMixin,
                        DestroyModelMixin,
                        viewsets.GenericViewSet):
    """
    CRUD recipe
    """
    lookup_field = 'slug' 
    queryset = Recipe.objects.all()   
    permission_classes = [IsOwner]
    serializer_class = serializers.RecipeDetailWriteSerializer
    filter_backends = (SearchVectorFilter,DjangoFilterBackend,OrderingFilter)
    search_fields = ['^search_vector']
    ordering_fields = ['created_at', 'rating']
    filterset_fields = ('category','ingredients__title', 'title')

    
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
    
class RecipeDetailReadViewSet(viewsets.ViewSet):
    lookup_field = 'slug' 
    permission_classes = [AllowAny]

    @method_decorator(cache_page(60*60*24))
    @method_decorator(vary_on_cookie)
    def list(self, request):
        queryset = Recipe.objects.all()
        serializer = serializers.RecipeDetailReadSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, slug=None):
        queryset = Recipe.objects.all()
        recipe = get_object_or_404(queryset, slug=slug)
        serializer = serializers.RecipeDetailReadSerializer(recipe)
        return Response(serializer.data)

class IngredientViewSet(viewsets.ModelViewSet):
    """
    List and Retrieve ingredients
    """
    queryset = Ingredient.objects.all()
    serializer_class = serializers.IngredientSerializer
    permission_classes = [IsOwner]
    filterset_fields = ['title']
    search_fields = ['title']

    @method_decorator(cache_page(60*60*24))    # With cookie: cache requested url for each user for 24 hours
    @method_decorator(vary_on_cookie)
    def list(self, *args, **kwargs):
        return super().list(*args, **kwargs)

class ImageViewSet(viewsets.ModelViewSet):
    """
    List and Retrieve image's recipe
    """
    queryset = RecipeImage.objects.all()
    serializer_class = serializers.ImageSerializer
    permission_classes = [IsOwner]

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
    
class RecipeReviewViewset(CreateModelMixin,
                        DestroyModelMixin,
                        viewsets.GenericViewSet):
    """
    Add and delete reviews a recipe
    """
    
    lookup_field = 'slug'
    queryset = RecipeReview.objects.all()
    serializer_class = serializers.ReviewSerializer
    permission_classes = [IsAuthenticated, IsOwner]
    
    def get_object(self):
        if self.action == "create":
            return get_object_or_404(Recipe, slug = self.kwargs['recipe_slug'])
        if self.action == "destroy":
            return get_object_or_404(RecipeReview, recipe__slug= self.kwargs['recipe_slug'],
                                    slug=self.kwargs['slug'])

    def perform_create(self, serializer):
        serializer.save(recipe=self.get_object(), user=self.request.user)        
