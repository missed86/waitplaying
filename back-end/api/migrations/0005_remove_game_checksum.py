# Generated by Django 4.1.5 on 2023-01-30 14:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0004_alter_game_category_alter_game_status"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="game",
            name="checksum",
        ),
    ]
