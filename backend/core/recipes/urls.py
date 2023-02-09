from django.urls import include, path
from rest_framework.routers import DefaultRouter

from recipes.views import RecipeListViewSet,CategoryViewSet,RecipeReviewViewset,RecipeIngredientViewSet
from users import views
app_name = 'recipes'


router = DefaultRouter()
router.register(r"category", CategoryViewSet)
router.register(r"ingredient", RecipeIngredientViewSet)
router.register(r"review", RecipeReviewViewset)
router.register(r"", RecipeListViewSet)


urlpatterns = [
    path("", include(router.urls)),
]
