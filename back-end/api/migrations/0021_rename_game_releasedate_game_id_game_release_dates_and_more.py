# Generated by Django 4.1.5 on 2023-02-02 11:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_remove_game_platforms_game_platforms'),
    ]

    operations = [
        migrations.RenameField(
            model_name='releasedate',
            old_name='game',
            new_name='game_id',
        ),
        migrations.AddField(
            model_name='game',
            name='release_dates',
            field=models.ManyToManyField(to='api.releasedate'),
        ),
        migrations.AlterField(
            model_name='game',
            name='platforms',
            field=models.ManyToManyField(to='api.platform'),
        ),
    ]