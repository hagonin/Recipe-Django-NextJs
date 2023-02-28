from rest_framework import permissions
from recipes.models import Recipe,RecipeImage,Ingredient, RecipeReview

class IsOwner(permissions.BasePermission):
    """
    Check if authenticated user is author of the recipe.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated is True

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        if type(obj) == Recipe or type(obj) == RecipeReview:
            return obj.user == request.user
        elif type(obj) == RecipeImage or type(obj) == Ingredient:
            return obj.recipe.user == request.user

        return False   