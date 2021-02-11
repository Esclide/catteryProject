from datetime import timedelta

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

STATUS_CHOICES = (
    (0, 'Verifying'),
    (1, 'Active'),
    (2, 'Deleted'),
)


class Breed(models.Model):
    name = models.CharField(max_length=30, blank=True)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='breeds', default='breeds/default.png', null=True, blank=True)


class Cattery(models.Model):
    name = models.CharField(max_length=150)
    breeds = models.ManyToManyField(Breed, blank=True)
    registration_date = models.DateTimeField(default=timezone.now)
    membership_fee = models.IntegerField()
    leader = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ownedCatteries')
    country = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    status = models.IntegerField( choices=STATUS_CHOICES, default=1)
    site = models.CharField(max_length=100, null=True, blank=True)
    deletion_date = models.DateTimeField(null=True, blank=True)
    creation_date = models.DateTimeField(default=timezone.now)


class Document(models.Model):
    attachment = models.ImageField(upload_to='cattery_attachments')
    cattery = models.ForeignKey(Cattery, on_delete=models.CASCADE, related_name='attachments', null=True, blank=True)
    creation_date = models.DateTimeField(default=timezone.now)


class UserInCattery(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='catteries')
    cattery = models.ForeignKey(Cattery, on_delete=models.CASCADE, related_name='users', null=True, blank=True)
    status = models.IntegerField(choices=STATUS_CHOICES, default=0)
    is_admin = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    deletion_date = models.DateTimeField(null=True, blank=True)
    is_fee_paid = models.BooleanField(default=False)
    creation_date = models.DateTimeField(default=timezone.now)


class ApplicationToCattery(models.Model):
    APPLICATION_STATUS_CHOICES = (
        (0, 'InProgress'),
        (1, 'Rejected'),
        (2, 'Accepted'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
    cattery = models.ForeignKey(Cattery, on_delete=models.CASCADE, related_name='applications', null=True, blank=True)
    status = models.IntegerField(choices=APPLICATION_STATUS_CHOICES, default=0)
    message = models.CharField(max_length=500, blank=True, null=True)
    creation_date = models.DateTimeField(default=timezone.now)


class Announcements(models.Model):
    ANNOUNCEMENT_STATUS_CHOICES = (
        (0, 'Active'),
        (1, 'Deleted'),
    )
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='createdAnnouncements')
    cattery = models.ForeignKey(Cattery, on_delete=models.CASCADE, related_name='announcements', null=True, blank=True)
    photo = models.ImageField(upload_to='cattery_attachments', blank=True, null=True)
    status = models.IntegerField(choices=ANNOUNCEMENT_STATUS_CHOICES, default=0)
    text = models.TextField()
    creation_date = models.DateTimeField(default=timezone.now)
    show_until = models.DateTimeField(default=timezone.now()+timedelta(30))
    deletion_date = models.DateTimeField(null=True, blank=True)

