# Generated by Django 4.1.5 on 2023-01-30 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0014_remove_game_platforms_remove_game_screenshots_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="game",
            name="created_at",
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name="game",
            name="updated_at",
            field=models.IntegerField(null=True),
        ),
    ]
