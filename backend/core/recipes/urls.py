from django.urls import include, path
from rest_framework.routers import DefaultRouter

from recipes.views import (RecipeListViewSet,RecipeWriteDetailViewSet,
                        IngredientViewSet,ImageViewSet,RecipeReviewViewset,
                        RecipeDetailViewSet)


app_name = 'recipes'


router = DefaultRouter()
router.register(r'recipe', RecipeListViewSet, basename='recipe')
router.register(r'recipe-write', RecipeWriteDetailViewSet, basename= 'recipe-write')
router.register(r'recipe-detail', RecipeDetailViewSet, basename= 'recipe-detail')

router.register(r'ingredient', IngredientViewSet, basename='ingredient')
router.register(r'recipe-image', ImageViewSet, basename='recipe-image')

recipe_review_router = DefaultRouter()
recipe_review_router.register('',RecipeReviewViewset, basename='recipe-reviews')

urlpatterns = [
    path("", include(router.urls)),
    path("<slug:recipe_slug>/reviews", include(recipe_review_router.urls))
]
