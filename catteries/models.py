from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

STATUS_CHOICES = (
    (0, 'Active'),
    (1, 'Verifying'),
    (2, 'Deleted'),
)


class Breed(models.Model):
    name = models.CharField(max_length=30, blank=True)
    description = models.CharField(max_length=500, blank=True)
    image = models.ImageField(upload_to='breeds', default='breeds/default.png')


class Cattery(models.Model):
    name = models.CharField(max_length=30)
    breeds = models.ManyToManyField(Breed, blank=True)
    registrationDate = models.DateTimeField(default=timezone.now)
    membershipFee = models.IntegerField()
    leader = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ownedCatteries')
    city = models.CharField(max_length=30, null=True, blank=True)
    status = models.IntegerField( choices=STATUS_CHOICES, default=1)
    site = models.CharField(max_length=100, null=True, blank=True)
    deletionDate = models.DateTimeField(null=True, blank=True)


class Document(models.Model):
    attachment = models.ImageField(upload_to='cattery_attachments')
    cattery = models.ForeignKey(Cattery, on_delete=models.CASCADE, related_name='attachments', null=True, blank=True)


class UserInCattery(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='catteries')
    cattery = models.ForeignKey(Cattery, on_delete=models.CASCADE, related_name='users', null=True, blank=True)
    status = models.IntegerField(choices=STATUS_CHOICES, default=1)
    isAdmin = models.BooleanField(default=False)
    deletionDate = models.DateTimeField(null=True, blank=True)
    isFeePaid = models.BooleanField(default=False)


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
    creationDate = models.DateTimeField(default=timezone.now)


class Announcements(models.Model):
    ANNOUNCEMENT_STATUS_CHOICES = (
        (0, 'Active'),
        (1, 'Deleted'),
    )
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='createdAnnouncements')
    cattery = models.ForeignKey(Cattery, on_delete=models.CASCADE, related_name='announcements', null=True, blank=True)
    photo = models.ImageField(upload_to='cattery_attachments')
    status = models.IntegerField(choices=ANNOUNCEMENT_STATUS_CHOICES, default=0)
    text = models.CharField(max_length=500, blank=True, null=True)
    creationDate = models.DateTimeField(default=timezone.now)
    # ToDo: add 30 days
    showUntil = models.DateTimeField()
    deletionDate = models.DateTimeField(null=True, blank=True)

