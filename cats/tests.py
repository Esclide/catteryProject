from django.test import TestCase
from catteries.tests import CatteryModelTests
from users.tests import UserModelTests
from cats.models import *
from faker import Faker


class CatModelTests(TestCase):
    fake = Faker()

    def test_create_cat_without_parents(self):
        cat_fields = {
            'name': self.fake.pystr(0, 100),
            'title': self.fake.pystr(0, 100),
            'city': self.fake.pystr(0, 50),
            'gender': 'M',
            'cattery': CatteryModelTests.test_create_cattery(CatteryModelTests()),
            'breeder': UserModelTests.test_create_user(UserModelTests()),
            'breed': CatteryModelTests.test_create_breed(CatteryModelTests()),
            'owner': UserModelTests.test_create_user(UserModelTests()),
            'color': self.fake.pystr(0, 30),
            'birth_date': self.fake.date_of_birth(),
            'ability_to_reproduce': True,
            'description': self.fake.pystr(0, 500),
        }
        cat = Cat.objects.create(**cat_fields)

        for field, value in cat_fields.items():
            self.assertEqual(getattr(cat, field), value)

        self.assertTrue(cat.is_alive)
        self.assertFalse(cat.is_deleted)
        self.assertIsNone(cat.deletion_date)
        self.assertIsNone(cat.mother)
        self.assertIsNone(cat.father)

        return cat

    def test_create_cat_with_parents(self):
        cat_fields = {
            'name': self.fake.pystr(0, 100),
            'title': self.fake.pystr(0, 100),
            'city': self.fake.pystr(0, 50),
            'gender': 'M',
            'cattery': CatteryModelTests.test_create_cattery(CatteryModelTests()),
            'breeder': UserModelTests.test_create_user(UserModelTests()),
            'breed': CatteryModelTests.test_create_breed(CatteryModelTests()),
            'owner': UserModelTests.test_create_user(UserModelTests()),
            'color': self.fake.pystr(0, 30),
            'birth_date': self.fake.date_of_birth(),
            'ability_to_reproduce': True,
            'description': self.fake.pystr(0, 500),
            'mother': self.test_create_cat_without_parents(),
            'father': self.test_create_cat_without_parents(),
        }
        cat = Cat.objects.create(**cat_fields)

        for field, value in cat_fields.items():
            self.assertEqual(getattr(cat, field), value)

        self.assertTrue(cat.is_alive)
        self.assertFalse(cat.is_deleted)
        self.assertIsNone(cat.deletion_date)

        return cat
