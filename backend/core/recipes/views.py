from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from drf_yasg.utils import swagger_auto_schema
from django.utils.decorators import method_decorator

from .filters import SearchVectorFilter
from . import serializers
from .models import Recipe,RecipeImage,Category,RecipeReview,Ingredient

from .permissions import IsOwner


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

class RecipeListViewSet(viewsets.ReadOnlyModelViewSet):
    """
    View recipe
    """
    queryset = Recipe.objects.all()
    serializer_class = serializers.RecipeSerializer
    filter_backends = (SearchVectorFilter,DjangoFilterBackend,OrderingFilter)
    search_fields = ['search_vector']
    ordering_fields = ['created_at', 'rating']
    

# @method_decorator(name='list', decorator=swagger_auto_schema(
#     operation_description="description"
# ))
class RecipeDetailViewSet(viewsets.ModelViewSet):
    """
    CRUD recipe
    """
    
    lookup_field = 'id'
    queryset = Recipe.objects.all()
    serializer_class = serializers.RecipeRewriteSerializer
    ordering_fields = ['created_at']    
    permission_classes = (IsAuthenticatedOrReadOnly,IsOwner)

    def _params_to_ints(self, qs):
        """Convert a list of strings to integers."""
        return [int(str_id) for str_id in qs.split(',')]

    def get_serializer_context(self):
        return {'user': self.request.user}    
    
    def get_queryset(self):
        ingredients =self.request.query__params.get(ingredients)
        queryset = self.queryset
        if ingredients:
            ingr_ids = self._params_to_ints(ingredients)
            queryset = queryset.filter(ingredients=ingr_ids)

    # def perform_create(self, serializer):
    #     """Create a new recipe."""
    #     serializer.save(user=self.request.user)
            
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
            self.permission_classes = (IsOwner)
        else:
            self.permission_classes = (AllowAny,)

        return super().get_permissions()