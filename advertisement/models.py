from django.db import models
from django.contrib.auth.models import User
from cats.models import Breed
from catteries.models import Cattery
from django.utils import timezone


class BaseAdvertisement(models.Model):
    class Meta:
        abstract = True;

    TYPE_CHOICES = (
        (0, 'sale'),
        (1, 'knitting'),
    )
    LEVEL_CHOICES = (
        (0, 'public'),
        (1, 'cattery'),
    )
    type = models.IntegerField(max_length=1, choices=TYPE_CHOICES)
    level = models.IntegerField(max_length=1, choices=TYPE_CHOICES, default=0)
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=500, null=True, blank=True)
    breed = models.ForeignKey(Breed, on_delete=models.SET_NULL, null=True, blank=True)
    color = models.CharField(max_length=30, null=True, blank=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='advertisements')
    # ToDo: check how it works
    cats = models.ManyToManyField(Breed, on_delete=models.CASCADE, null=True, blank=True)
    isDeleted = models.BooleanField(default=False)
    deletionDate = models.DateTimeField(null=True, blank=True)
    price = models.IntegerField()
    creationDate = models.DateTimeField(default=timezone.now)
    rating = models.IntegerField(null=True, blank=True)


class Document(models.Model):
    attachment = models.ImageField(upload_to='advertisement_attachments')
    cattery = models.ForeignKey(Cattery, on_delete=models.CASCADE, related_name='attachments', null=True, blank=True)


class GeneralAdvertisement(BaseAdvertisement):
    pass


class CatteryAdvertisement(BaseAdvertisement):
    cattery = models.ForeignKey(Cattery, on_delete=models.CASCADE, related_name='cats', null=True, blank=True)


