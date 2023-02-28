from django import forms
from .models import Recipe
from django.utils.text import slugify
from django.core.exceptions import ValidationError

class RecipeForm(forms.ModelForm):
    class Meta:
        model = Recipe
        fields = ('__all__')

    def clean_title(self, title):

        slug = slugify(title)

        if Recipe.objects.filter(slug=slug).exists():
            raise ValidationError('A recipe with this title already exists.')

        return title
