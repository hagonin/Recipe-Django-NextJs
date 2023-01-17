from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="recipes-home"),
    path('', views.RecipeListView.as_view(), name="recipes-home"),

    path('recipe/create', views.RecipeCreateView.as_view(), name="recipes-create"),
    path('recipe/<int:pk>/update', views.RecipeUpdateView.as_view(), name="recipes-update"),
    path('recipe/<int:pk>/delete', views.RecipeDeleteView.as_view(), name="recipes-delete"),
]