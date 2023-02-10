from django.urls import include, path
from rest_framework.routers import DefaultRouter

from recipes.views import RecipeViewSet,ImageViewSet
from users import views
app_name = 'recipes'


router = DefaultRouter()
router.register(r'recipe', RecipeViewSet, basename='Recipe')
router.register(r'image', ImageViewSet, basename='Image')


urlpatterns = [
    path("", include(router.urls)),
]
