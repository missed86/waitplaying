# Generated by Django 4.1.5 on 2023-01-30 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0006_platform_releasedate"),
    ]

    operations = [
        migrations.AddField(
            model_name="game",
            name="platforms",
            field=models.ManyToManyField(related_name="games", to="api.platform"),
        ),
    ]