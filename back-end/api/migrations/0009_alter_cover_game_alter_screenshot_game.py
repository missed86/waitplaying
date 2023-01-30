# Generated by Django 4.1.5 on 2023-01-30 15:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0008_alter_game_platforms_screenshot_cover_company_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="cover",
            name="game",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="game_cover",
                to="api.game",
            ),
        ),
        migrations.AlterField(
            model_name="screenshot",
            name="game",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="game_screenshot",
                to="api.game",
            ),
        ),
    ]
