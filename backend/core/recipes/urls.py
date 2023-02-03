from django.urls import include, path
from rest_framework.routers import DefaultRouter

from recipes.views import RecipeListViewSet,CategoryViewSet,RecipeReviewViewset,RecipeIngredientViewSet
from users import views
app_name = 'recipes'


router = DefaultRouter()
router.register(r"categories", CategoryViewSet)
router.register(r"ingredient", RecipeIngredientViewSet)
router.register(r"^(?P<recipe_id>\d+)/review", RecipeReviewViewset)
router.register(r"", RecipeListViewSet)


urlpatterns = [
    path("", include(router.urls)),
]
