from django.urls import include, path
from rest_framework.routers import DefaultRouter

from recipes.views import RecipeListViewSet,CategoryViewSet,IngredientViewSet,ImageViewSet
from users import views
app_name = 'recipes'


router = DefaultRouter()
router.register(r'recipe', RecipeListViewSet, basename='recipe')
router.register(r'category', CategoryViewSet, basename='category')
router.register(r'ingredient', IngredientViewSet, basename='ingredient')
router.register(r'recipe-image', ImageViewSet, basename='recipe-image')


urlpatterns = [
    path("", include(router.urls)),
]
