# Generated by Django 4.1.5 on 2023-02-27 11:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0002_initial'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='recipereview',
            unique_together={('recipe', 'slug')},
        ),
    ]
