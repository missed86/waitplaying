# Generated by Django 4.1.5 on 2023-02-02 12:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_rename_game_id_releasedate_game_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='releasedate',
            name='date',
            field=models.DateField(),
        ),
    ]