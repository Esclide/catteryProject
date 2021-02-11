# Generated by Django 3.1.5 on 2021-02-03 14:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('catteries', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Cat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('title', models.CharField(blank=True, max_length=30)),
                ('city', models.CharField(blank=True, max_length=30)),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=1)),
                ('color', models.CharField(blank=True, max_length=30)),
                ('birthDate', models.DateField()),
                ('abilityToReproduce', models.BooleanField(default=True)),
                ('description', models.CharField(blank=True, max_length=500, null=True)),
                ('isAlive', models.BooleanField(default=True)),
                ('isDeleted', models.BooleanField(default=False)),
                ('deletionDate', models.DateTimeField(blank=True, null=True)),
                ('breed', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='cats', to='catteries.breed')),
                ('breeder', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='bredCats', to=settings.AUTH_USER_MODEL)),
                ('cattery', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='cats', to='catteries.cattery')),
                ('father', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='fatherChildCats', to='cats.cat')),
                ('mother', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='motherChildCats', to='cats.cat')),
                ('owner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ownCats', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Attachment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('attachment', models.ImageField(upload_to='cat_attachments')),
                ('type', models.CharField(choices=[('DOC', 'Document'), ('PHOTO', 'Photo')], max_length=10)),
                ('cat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attachments', to='cats.cat')),
            ],
        ),
    ]
