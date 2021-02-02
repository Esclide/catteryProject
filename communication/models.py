from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User
from cats.models import Breed
from advertisement.models import BaseAdvertisement
from catteries.models import Cattery
from django.utils import timezone
from django.db import models


class BaseReview(models.Model):
    class Meta:
        abstract = True

    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='advertisements')
    creationDate = models.DateTimeField(default=timezone.now)
    description = models.CharField(max_length=500, null=True, blank=True)
    rate = models.PositiveIntegerField(
        validators=[
            MaxValueValidator(5),
            MinValueValidator(0)
        ]
     )
    isDeleted = models.BooleanField(default=False)
    deletionDate = models.DateTimeField(null=True, blank=True)


class CatteryReview(BaseReview):
    cattery = models.ForeignKey(Cattery, on_delete=models.CASCADE, related_name='reviews')


class BreederReview(BaseReview):
    breeder = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')


class BreedReview(BaseReview):
    breed = models.ForeignKey(Breed, on_delete=models.CASCADE, related_name='reviews')


class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sentMessages')
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='gottenMessages')
    advertisement = models.ForeignKey(BaseAdvertisement, on_delete=models.CASCADE, related_name='replies')
    isViewed = models.BooleanField(default=False)
    creationDate = models.DateTimeField(default=timezone.now)
    viewedDate = models.DateTimeField(null=True, blank=True)