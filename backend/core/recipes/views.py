from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_flex_fields import is_expanded

from .serializers import RecipeSerializer,RecipeIngredientSerializer
from .models import Recipe,RecipeIngredient



class RecipeIngredientViewSet(ReadOnlyModelViewSet):

    serializer_class = RecipeIngredientSerializer
    queryset = RecipeIngredient.objects.all()

class RecipeViewSet(ReadOnlyModelViewSet):

    serializer_class = RecipeSerializer
    permit_list_expands = ['categories']
    search_fields = ['search_vector']
    ordering_fields = ['rating_value', 'created_at']

    def get_queryset(self):
        queryset = Recipe.objects.all()

        if is_expanded(self.request, 'categories'):
            queryset = queryset.prefetch_related('categories')

        return queryset