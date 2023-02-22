from django.urls import include, path
from rest_framework.routers import DefaultRouter

from recipes.views import RecipeListViewSet,RecipeDetailViewSet,CategoryViewSet,IngredientViewSet,ImageViewSet
from users import views
app_name = 'recipes'


router = DefaultRouter()
router.register(r'recipe', RecipeListViewSet, basename='recipe')
router.register(r'recipe-detail', RecipeDetailViewSet, basename= 'recipe-detail')
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'ingredient', IngredientViewSet, basename='ingredient')
router.register(r'recipe-image', ImageViewSet, basename='recipe-image')


urlpatterns = [
    path("", include(router.urls)),
]
