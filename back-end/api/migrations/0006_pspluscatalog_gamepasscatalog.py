# Generated by Django 4.1.7 on 2023-04-03 16:20

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0005_releasedate_category"),
    ]

    operations = [
        migrations.CreateModel(
            name="PsPlusCatalog",
            fields=[
                ("id", models.IntegerField(primary_key=True, serialize=False)),
                ("name", models.TextField(unique=True)),
                ("slug_catalog", models.TextField()),
                (
                    "start_date",
                    models.DateField(blank=True, default=datetime.date.today),
                ),
                ("end_date", models.DateField(blank=True)),
                ("active", models.BooleanField(default=True)),
                (
                    "game",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="api.game",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="GamepassCatalog",
            fields=[
                ("id", models.IntegerField(primary_key=True, serialize=False)),
                ("name", models.TextField(unique=True)),
                ("short_name", models.TextField(unique=True)),
                ("slug_catalog", models.TextField()),
                (
                    "start_date",
                    models.DateField(blank=True, default=datetime.date.today),
                ),
                ("end_date", models.DateField(blank=True)),
                ("active", models.BooleanField(default=True)),
                ("pc", models.BooleanField(default=False)),
                ("console", models.BooleanField(default=False)),
                (
                    "game",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="api.game",
                    ),
                ),
            ],
        ),
    ]