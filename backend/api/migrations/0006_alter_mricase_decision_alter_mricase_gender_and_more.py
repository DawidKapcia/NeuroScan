# Generated by Django 4.2.18 on 2025-01-29 22:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_mricase_decision_alter_mricase_risk'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mricase',
            name='decision',
            field=models.CharField(choices=[('Y', 'Tumor'), ('N', 'No Tumor')], default='', max_length=10),
        ),
        migrations.AlterField(
            model_name='mricase',
            name='gender',
            field=models.CharField(choices=[('F', 'F'), ('M', 'M')], max_length=1),
        ),
        migrations.AlterField(
            model_name='mricase',
            name='risk',
            field=models.CharField(choices=[('L', 'Low'), ('M', 'Medium'), ('H', 'High')], default='', max_length=10),
        ),
    ]
