from django.db import models
from django.contrib.auth.models import User
import datetime

class MRICase(models.Model):

    gender = models.CharField(max_length=1, choices=[('F', 'F'), ('M', 'M')])
    birth_date = models.DateField()
    scan_date = models.DateField()

    risk = models.CharField(max_length=10, choices=[('L', 'Low'), ('M', 'Medium'), ('H', 'High')], default='')
    decision = models.CharField(max_length=10, choices=[('Y', 'Tumor'), ('N', 'No Tumor')], default='')
    radiologist = models.ForeignKey(User, on_delete=models.CASCADE, related_name="mricases")

    scan = models.ImageField(upload_to='scans/', default='')

    def __str__(self):
        return str(self.id)