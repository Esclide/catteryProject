from django.db import models
from django.contrib.auth.models import User
from cats.models import Breed
from catteries.models import Cattery
from cats.models import Cat
from django.utils import timezone


class BaseAdvertisement(models.Model):
    class Meta:
        abstract = True

    TYPE_CHOICES = (
        (0, 'sale'),
        (1, 'knitting'),
    )
    type = models.IntegerField(choices=TYPE_CHOICES)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500, null=True, blank=True)
    breed = models.ForeignKey(Breed, on_delete=models.SET_NULL, null=True, blank=True, related_name='advertisements')
    color = models.CharField(max_length=30, null=True, blank=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='advertisements')
    cats = models.ManyToManyField(Cat, blank=True)
    is_deleted = models.BooleanField(default=False)
    deletion_date = models.DateTimeField(null=True, blank=True)
    price = models.IntegerField()
    creation_date = models.DateTimeField(default=timezone.now)
    rating = models.IntegerField(null=True, blank=True)
    country = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)


class GeneralAdvertisement(BaseAdvertisement):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='generalAdvertisements')
    breed = models.ForeignKey(Breed, on_delete=models.SET_NULL, null=True, blank=True,
                              related_name='generalAdvertisements')
    pass


class CatteryAdvertisement(BaseAdvertisement):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='catteryAdvertisements')
    breed = models.ForeignKey(Breed, on_delete=models.SET_NULL, null=True, blank=True,
                              related_name='catteryAdvertisements')
    cattery = models.ForeignKey(Cattery, on_delete=models.CASCADE, related_name='advertisements', null=True, blank=True)

class Document(models.Model):
    attachment = models.ImageField(upload_to='advertisement_attachments')
    general_advertisement = models.ForeignKey(GeneralAdvertisement, on_delete=models.CASCADE, related_name='advertisementAttachments', null=True, blank=True)
    cattery_advertisement = models.ForeignKey(CatteryAdvertisement, on_delete=models.CASCADE, related_name='advertisementAttachments', null=True, blank=True)

