from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User
from cats.models import Breed
from advertisement.models import CatteryAdvertisement, GeneralAdvertisement
from catteries.models import Cattery
from django.utils import timezone
from django.db import models


class BaseReview(models.Model):
    class Meta:
        abstract = True

    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sentReviews')
    creation_date = models.DateTimeField(default=timezone.now)
    description = models.CharField(max_length=500, null=True, blank=True)
    rate = models.PositiveIntegerField(
        validators=[
            MaxValueValidator(5),
            MinValueValidator(0)
        ]
     )
    is_deleted = models.BooleanField(default=False)
    deletion_date = models.DateTimeField(null=True, blank=True)


class CatteryReview(BaseReview):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sentCatteryReviews')
    cattery = models.ForeignKey(Cattery, on_delete=models.CASCADE, related_name='reviews')


class BreederReview(BaseReview):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sentBreederReviews')
    breeder = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')


class BreedReview(BaseReview):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sentBreedReviews')
    breed = models.ForeignKey(Breed, on_delete=models.CASCADE, related_name='reviews')


class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sentMessages')
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='gottenMessages')
    cattery_advertisement = models.ForeignKey(CatteryAdvertisement, on_delete=models.CASCADE, related_name='replies', null=True, blank=True)
    general_advertisement = models.ForeignKey(GeneralAdvertisement, on_delete=models.CASCADE, related_name='replies', null=True, blank=True)
    is_viewed = models.BooleanField(default=False)
    creation_date = models.DateTimeField(default=timezone.now)
    viewed_date = models.DateTimeField(null=True, blank=True)