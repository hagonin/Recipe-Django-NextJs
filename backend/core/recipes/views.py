from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_flex_fields import is_expanded
from rest_flex_fields.views import FlexFieldsModelViewSet,FlexFieldsMixin
from rest_framework.permissions import AllowAny,IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from .filters import SearchVectorFilter
from . import serializers
from .models import Recipe,RecipeImage

from .permissions import IsAuthorOrReadOnly



class RecipeViewSet(FlexFieldsMixin, ReadOnlyModelViewSet):

    serializer_class = serializers.RecipeSerializer
    permit_list_expands = ['category', 'recipe_detail', 'reviews', 'recipe_detail.ingredient', 'ingredients']
    filterset_fields = ('category',)

    def get_queryset(self):
        queryset = Recipe.objects.all()
        if is_expanded(self.request, 'ingredients'):
            queryset = queryset.prefetch_related('ingredients')
        if is_expanded(self.request, 'category'):
            queryset = queryset.prefetch_related('category')

        if is_expanded(self.request, 'reviews'):
            queryset = queryset.prefetch_related('reviews')

        if is_expanded(self.request, 'recipe_detail'):
            queryset = queryset.prefetch_related('recipe_detail')

        if is_expanded(self.request, 'ingredient'):
            queryset = queryset.prefetch_related('recipe_detail__ingredient')


        return queryset


class ImageViewSet(FlexFieldsModelViewSet):

    serializer_class = serializers.ImageSerializer
    queryset = RecipeImage.objects.all()
    # permission_classes = [IsAuthenticated]


# class CategoryViewSet(viewsets.ModelViewSet):
#     """
#     List and Retrieve categories
#     """
#     queryset = Category.objects.all()
#     serializer_class = serializers.CategorySerializer
#     filterset_fields = ['name']
#     search_fields = ['name']


# class RecipeListViewSet(FlexFieldsModelViewSet):
#     """
#     CRUD recipes
#     """
#     queryset = Recipe.objects.all()
#     serializer_class = serializers.RecipeReadSerializer
#     permit_list_expands = ['category']
#     filter_backends = (SearchVectorFilter,DjangoFilterBackend,OrderingFilter)
#     search_fields = ['search_vector']
#     ordering_fields = ['rating_value', 'created_at']

#     def get_queryset(self):
#         queryset = Recipe.objects.all()

#         if is_expanded(self.request, 'categories'):
#             queryset = queryset.delect_related('categories')
        
#         return queryset

#     def get_serializer_class(self):
#         if self.action in ("create", "update", "partial_update", "destroy"):
#             return serializers.RecipeWriteSerializer

#         return serializers.RecipeReadSerializer


# class RecipeReviewViewset(viewsets.ModelViewSet):
#     """
#     CRUD reviews a recipe
#     """
#     queryset = RecipeReview.objects.all()
#     permission_classes = [AllowAny]

#     def get_serializer_class(self):
#         if self.action in ("create", "update", "partial_update", "destroy"):
#             return serializers.ReviewWriteSerializer

#         return serializers.ReviewReadSerializer

#     def get_permissions(self):
#         if self.action in ("create",):
#             self.permission_classes = (IsAuthenticated,)
#         elif self.action in ("update", "partial_update", "destroy"):
#             self.permission_classes = (IsAuthorOrReadOnly,)
#         else:
#             self.permission_classes = (AllowAny,)

#         return super().get_permissions()