# Generated by Django 4.1.3 on 2022-11-30 07:15

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('events', '0002_rename_host_id_event_host'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='participant',
            field=models.ManyToManyField(blank=True, related_name='participants', to=settings.AUTH_USER_MODEL),
        ),
    ]