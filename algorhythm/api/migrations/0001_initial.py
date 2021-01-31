# Generated by Django 3.1.5 on 2021-01-31 16:20

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(default=api.models.code_creator, max_length=8, unique=True)),
                ('host', models.CharField(max_length=30, unique=True)),
                ('email', models.EmailField(max_length=254)),
                ('can_guests_pause', models.BooleanField(default=False)),
                ('votes_for_skip', models.IntegerField(default=2)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
