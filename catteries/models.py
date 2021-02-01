from django.db import models
from django.contrib.auth.models import User
from cats.models import Breed
from django.utils import timezone

STATUS_CHOICES = (
    (0, 'Active'),
    (1, 'Verifying'),
    (2, 'Deleted'),
)


class Cattery(models.Model):
    name = models.CharField(max_length=30)
    breed = models.ForeignKey(Breed, on_delete=models.SET_NULL, related_name='cats', null=True, blank=True)
    registrationDate = models.DateTimeField(default=timezone.now)
    membershipFee = models.IntegerField(max_length=30)
    leader = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ownedCatteries')
    city = models.CharField(max_length=30, null=True, blank=True)
    status = models.IntegerField(max_length=1, choices=STATUS_CHOICES, default=1)
    site = models.CharField(max_length=100, null=True, blank=True)
    deletionDate = models.DateTimeField(null=True, blank=True)


class Document(models.Model):
    attachment = models.ImageField(upload_to='cattery_attachments')
    cattery = models.ForeignKey(Cattery, on_delete=models.CASCADE, related_name='cats', null=True, blank=True)


class UserInCattery(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='catteries')
    cattery = models.ForeignKey(Cattery, on_delete=models.CASCADE, related_name='users', null=True, blank=True)
    status = models.IntegerField(max_length=1, choices=STATUS_CHOICES, default=1)
    isAdmin = models.BooleanField(default=False)
    deletionDate = models.DateTimeField(null=True, blank=True)
    isFeePaid = models.BooleanField(default=False)


class ApplicationToCattery(models.Model):
    APPLICATION_STATUS_CHOICES = (
        (0, 'InProgress'),
        (1, 'Rejected'),
        (2, 'Accepted'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='catteries')
    cattery = models.ForeignKey(Cattery, on_delete=models.CASCADE, related_name='users', null=True, blank=True)
    status = models.IntegerField(max_length=1, choices=APPLICATION_STATUS_CHOICES, default=0)
    message = models.CharField(max_length=500, blank=True, null=True)
    creationDate = models.DateTimeField(default=timezone.now)


class Announcements(models.Model):
    ANNOUNCEMENT_STATUS_CHOICES = (
        (0, 'Active'),
        (1, 'Deleted'),
    )
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='catteries')
    cattery = models.ForeignKey(Cattery, on_delete=models.CASCADE, related_name='users', null=True, blank=True)
    photo = models.ImageField(upload_to='cattery_attachments')
    status = models.IntegerField(max_length=1, choices=ANNOUNCEMENT_STATUS_CHOICES, default=0)
    text = models.CharField(max_length=500, blank=True, null=True)
    creationDate = models.DateTimeField(default=timezone.now)
    # add 30 days
    showUntil = models.DateTimeField()
    deletionDate = models.DateTimeField(null=True, blank=True)
