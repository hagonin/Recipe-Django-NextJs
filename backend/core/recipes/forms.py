from django.forms import ModelForm      
from .models import RecipeImage

class PhotoForm(ModelForm):
  class Meta:
      model = RecipeImage
      fields = ['image', 'caption','default']