# Generated by Django 4.1.5 on 2023-03-03 13:55

import cloudinary.models
import django.contrib.postgres.search
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import recipes.validators


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=220)),
                ('desc', models.TextField(blank=True, null=True)),
                ('quantity', models.CharField(blank=True, max_length=50, null=True)),
                ('unit', models.CharField(max_length=50, validators=[recipes.validators.validate_unit_of_measure])),
            ],
        ),
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(choices=[('appetizers', 'Appetizers'), ('bread', 'Bread'), ('breakfast', 'Breakfast'), ('desserts', 'Desserts'), ('vegan', 'Vegan'), ('drink', 'Drink'), ('main dish', 'Maindish'), ('salad', 'Salad'), ('soups, stew and chill', 'Soups'), ('side dish', 'Sidedish'), ('marinades and sauces', 'Marinades')], max_length=50)),
                ('main_image', cloudinary.models.CloudinaryField(blank=True, max_length=255, verbose_name='image')),
                ('title', models.CharField(max_length=100, verbose_name='Recipe|title')),
                ('description', models.TextField(blank=True, verbose_name='Recipe|description')),
                ('instructions', models.TextField(blank=True, verbose_name='Recipe|instruction')),
                ('serving', models.IntegerField(blank=True, null=True)),
                ('slug', models.SlugField(blank=True, max_length=255, unique=True)),
                ('prep_time', models.CharField(blank=True, max_length=100)),
                ('cook_time', models.CharField(blank=True, max_length=100)),
                ('search_vector', django.contrib.postgres.search.SearchVectorField(null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateField(auto_now=True)),
                ('source', models.CharField(max_length=200, null=True, verbose_name='Source|url')),
                ('notes', models.TextField(blank=True, null=True)),
            ],
            options={
                'verbose_name': 'Recipe',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='RecipeImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', cloudinary.models.CloudinaryField(max_length=255, null=True, verbose_name='image')),
                ('caption', models.CharField(blank=True, max_length=200, null=True, verbose_name='Photo|caption')),
            ],
        ),
        migrations.CreateModel(
            name='RecipeReview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('content', models.TextField(blank=True, null=True)),
                ('slug', models.SlugField(max_length=255)),
                ('rating', models.PositiveIntegerField(validators=[django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(1)])),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('recipe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', related_query_name='review', to='recipes.recipe')),
            ],
            options={
                'ordering': ('-date_added',),
            },
        ),
    ]
