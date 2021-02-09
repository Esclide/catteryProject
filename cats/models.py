from django.contrib.auth.models import User
from django.db import models
from catteries.models import Cattery, Breed


class Cat(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )

    name = models.CharField(max_length=30)
    title = models.CharField(max_length=30, blank=True)
    city = models.CharField(max_length=30, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    cattery = models.ForeignKey(Cattery, on_delete=models.SET_NULL, related_name='cats', null=True, blank=True)
    breeder = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='bredCats', null=True, blank=True)
    breed = models.ForeignKey(Breed, on_delete=models.SET_NULL, related_name='cats', null=True, blank=True)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='ownCats', null=True, blank=True)
    mother = models.ForeignKey('self', on_delete=models.SET_NULL, related_name='motherChildCats', null=True, blank=True)
    father = models.ForeignKey('self', on_delete=models.SET_NULL, related_name='fatherChildCats', null=True, blank=True)
    color = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField()
    ability_to_reproduce = models.BooleanField(default=True)
    description = models.CharField(max_length=500, null=True, blank=True)
    is_alive = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    deletion_date = models.DateTimeField(null=True, blank=True)


class Attachment(models.Model):
    ATTACHMENT_TYPES = (
        ('DOC', 'Document'),
        ('PHOTO', 'Photo'),
    )
    cat = models.ForeignKey(Cat, on_delete=models.CASCADE, related_name='attachments')
    attachment = models.ImageField(upload_to='cat_attachments')
    type = models.CharField(max_length=10, choices=ATTACHMENT_TYPES)

