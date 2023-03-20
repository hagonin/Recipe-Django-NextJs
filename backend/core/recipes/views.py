from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
from rest_framework import viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.mixins import CreateModelMixin,DestroyModelMixin,UpdateModelMixin
from rest_framework.permissions import IsAuthenticated,AllowAny  
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.throttling import AnonRateThrottle,UserRateThrottle

from . import serializers
from .paginations import RecipeCustomPagination
from .filters import SearchVectorFilter
from .models import Recipe,RecipeImage,RecipeReview,Ingredient

from .permissions import IsOwner


class RecipeListViewSet(viewsets.ReadOnlyModelViewSet):
    """
    View recipe
    """
    queryset = Recipe.objects.all()
    serializer_class = serializers.RecipeSerializer
    filter_backends = (SearchVectorFilter,DjangoFilterBackend,OrderingFilter)
    pagination_class = RecipeCustomPagination
    search_fields = ['search_vector']
    ordering_fields = ['created_at']
    filterset_fields = ('category','ingredients__title', 'title')
    
    @method_decorator(cache_page(60*60*4))
    @method_decorator(vary_on_cookie)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
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
    throttle_classes = [AnonRateThrottle, UserRateThrottle]
    filter_backends = (SearchVectorFilter,DjangoFilterBackend,OrderingFilter)
    search_fields = ['search_vector']
    ordering_fields = ['created_at']
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
    
class RecipeDetailReadViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = 'slug' 
    queryset = Recipe.objects.all()
    serializer_class = serializers.RecipeDetailReadSerializer
    filter_backends = (SearchVectorFilter,DjangoFilterBackend,OrderingFilter)
    search_fields = ['search_vector']
    ordering_fields = ['created_at']
    filterset_fields = ('category','ingredients__title', 'title')
    permission_classes = [AllowAny]

    @method_decorator(cache_page(60*60*4))
    @method_decorator(vary_on_cookie)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

class IngredientViewSet(viewsets.ModelViewSet):
    """
    List, retrieve and update ingredients
    """
    queryset = Ingredient.objects.all()
    serializer_class = serializers.IngredientSerializer
    permission_classes = [IsOwner]
    filterset_fields = ['title']
    search_fields = ['title']

    @method_decorator(cache_page(60*60*4))    # With cookie: cache requested url for each user for 4 hours
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
    parser_classes = (MultiPartParser, FormParser,)
    
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