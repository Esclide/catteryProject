# PEP8 https://www.python.org/dev/peps/pep-0008/
from django.test import TestCase
from catteries.models import *
from faker import Faker
from users.tests import UserTests


class CatteriesTests(TestCase):

    def create_cattery(self):
        fake = Faker()
        cattery_fields = {
            'user': UserTests.create_user(UserTests()),
            'name': fake.company(),
            'membership_fee': fake.random.randint(0, 1000),
            'country': fake.country(),
            'city': fake.city(),
            'site': fake.url(),
        }
        cattery = Cattery.objects.create(**cattery_fields)
        for field, value in cattery_fields.items():
            self.assertEqual(cattery[field], value)
        self.assertEqual(cattery.breeds.count(), 0)
        return cattery

    def create_breed(self):
        breed = Breed.objects.create(name='Persian', description='Cute cat')
        self.assertEqual(breed.name, 'Persian')
        self.assertEqual(breed.description, 'Cute cat')
        return breed
