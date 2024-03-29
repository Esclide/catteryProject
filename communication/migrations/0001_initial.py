# Generated by Django 3.1.5 on 2021-02-03 14:59

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('catteries', '0001_initial'),
        ('advertisement', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('isViewed', models.BooleanField(default=False)),
                ('creationDate', models.DateTimeField(default=django.utils.timezone.now)),
                ('viewedDate', models.DateTimeField(blank=True, null=True)),
                ('catteryAdvertisement', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='advertisement.catteryadvertisement')),
                ('generalAdvertisement', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='advertisement.generaladvertisement')),
                ('recipient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='gottenMessages', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sentMessages', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CatteryReview',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creationDate', models.DateTimeField(default=django.utils.timezone.now)),
                ('description', models.CharField(blank=True, max_length=500, null=True)),
                ('rate', models.PositiveIntegerField(validators=[django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(0)])),
                ('isDeleted', models.BooleanField(default=False)),
                ('deletionDate', models.DateTimeField(blank=True, null=True)),
                ('cattery', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='catteries.cattery')),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sentCatteryReviews', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='BreedReview',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creationDate', models.DateTimeField(default=django.utils.timezone.now)),
                ('description', models.CharField(blank=True, max_length=500, null=True)),
                ('rate', models.PositiveIntegerField(validators=[django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(0)])),
                ('isDeleted', models.BooleanField(default=False)),
                ('deletionDate', models.DateTimeField(blank=True, null=True)),
                ('breed', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='catteries.breed')),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sentBreedReviews', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='BreederReview',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creationDate', models.DateTimeField(default=django.utils.timezone.now)),
                ('description', models.CharField(blank=True, max_length=500, null=True)),
                ('rate', models.PositiveIntegerField(validators=[django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(0)])),
                ('isDeleted', models.BooleanField(default=False)),
                ('deletionDate', models.DateTimeField(blank=True, null=True)),
                ('breeder', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to=settings.AUTH_USER_MODEL)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sentBreederReviews', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
