# Generated by Django 4.1.5 on 2023-01-30 16:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0010_remove_game_aggregated_rating_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="DummyModel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
            ],
        ),
    ]