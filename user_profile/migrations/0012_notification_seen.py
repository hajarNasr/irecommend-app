# Generated by Django 3.0 on 2020-07-11 17:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0011_auto_20200710_1837'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='seen',
            field=models.BooleanField(default=False),
        ),
    ]
