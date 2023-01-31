# Generated by Django 4.1.5 on 2023-01-27 15:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Game",
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
                ("aggregated_rating", models.FloatField()),
                ("aggregated_rating_count", models.IntegerField()),
                (
                    "category",
                    models.CharField(
                        choices=[
                            ("main_game", 0),
                            ("dlc_addon", 1),
                            ("expansion", 2),
                            ("bundle", 3),
                            ("standalone_expansion", 4),
                            ("mod", 5),
                            ("episode", 6),
                            ("season", 7),
                            ("remake", 8),
                            ("remaster", 9),
                            ("expanded_game", 10),
                            ("port", 11),
                            ("fork", 12),
                            ("pack", 13),
                            ("update", 14),
                        ],
                        max_length=20,
                    ),
                ),
                ("checksum", models.UUIDField()),
                ("created_at", models.FloatField()),
                ("first_release_date", models.FloatField()),
                ("follows", models.IntegerField()),
                ("hypes", models.IntegerField()),
                ("name", models.CharField(max_length=255)),
                ("rating", models.FloatField()),
                ("rating_count", models.IntegerField()),
                ("slug", models.CharField(max_length=255)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("released", 0),
                            ("alpha", 2),
                            ("beta", 3),
                            ("early_access", 4),
                            ("offline", 5),
                            ("canceled", 6),
                            ("rumored", 7),
                            ("delisted", 8),
                        ],
                        max_length=20,
                    ),
                ),
                ("storyline", models.TextField()),
                ("summary", models.TextField()),
                ("total_rating", models.FloatField()),
                ("total_rating_count", models.IntegerField()),
                ("updated_at", models.FloatField()),
                ("url", models.CharField(max_length=255)),
                ("version_title", models.CharField(max_length=255)),
                (
                    "version_parent",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="versions",
                        to="api.game",
                    ),
                ),
            ],
        ),
    ]