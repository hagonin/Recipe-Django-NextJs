from rest_framework.permissions import BasePermission, SAFE_METHODS
from recipes.models import Recipe,RecipeImage,Ingredient, RecipeReview

class IsOwner(BasePermission):
    """
    Check if authenticated user is author of the recipe.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        if isinstance(obj, (Recipe, RecipeReview)):
            return obj.user == request.user
        elif isinstance(obj, (RecipeImage, Ingredient)):
            return obj.recipe.user == request.user
        return False