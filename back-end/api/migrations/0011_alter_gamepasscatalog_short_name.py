# Generated by Django 4.1.7 on 2023-04-03 17:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0010_alter_gamepasscatalog_id_alter_pspluscatalog_id"),
    ]

    operations = [
        migrations.AlterField(
            model_name="gamepasscatalog",
            name="short_name",
            field=models.TextField(),
        ),
    ]