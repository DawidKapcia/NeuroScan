# Generated by Django 4.2.18 on 2025-01-29 22:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_mricase_decision_alter_mricase_gender_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mricase',
            name='birth_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='mricase',
            name='scan_date',
            field=models.DateField(),
        ),
    ]
