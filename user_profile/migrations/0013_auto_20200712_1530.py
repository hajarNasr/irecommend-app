# Generated by Django 3.0 on 2020-07-12 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0012_notification_seen'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='follow_obj_id',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='notification',
            name='obj_id',
            field=models.IntegerField(null=True),
        ),
    ]
