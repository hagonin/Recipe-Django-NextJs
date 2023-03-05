import re
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils.text import slugify

from .models import Recipe, RecipeReview


def _slug_trip(value):
    """removes the '-' separator from the end or start of the string"""
    return re.sub(r'^%s+|%s+$' % ('-', '-'), '', value)

def unique_slugify(instance, value):
    """"func to create a unique slug to an instance"""
    slug = slugify(value)
    slug = slug[:255]

    slug = _slug_trip(slug)
    original_slug = slug

    queryset = instance.__class__.objects.all()
    if instance.pk:
        queryset = queryset.exclude(pk=instance.pk)

    _next=2
    while not slug or queryset.filter(slug=slug):
        slug = original_slug
        end = '-%s' % _next
        if len(slug) + len(end) > 255:
            slug = slug[:255 - len(end)]
            slug = _slug_trip(slug)
        slug = '%s%s' % (slug,end)
        _next +=1

    return slug

@receiver(pre_save, sender=Recipe)
def add_slug_to_recipe(instance, **kwargs):
    """sent before the recipe model save() 
    called to give a unique slug"""

    instance.slug = unique_slugify(instance, instance.title)

@receiver(pre_save, sender=RecipeReview)
def add_slug_to_reviews(instance, **kwargs):
    """sent before the recipereview model save() 
    called  to give a unique slug"""
    instance.slug = unique_slugify(instance, instance.title)

