from django.test import TestCase
from catteries.tests import CatteryModelTests
from users.tests import UserModelTests
from cats.tests import CatModelTests
from advertisement.models import *
from faker import Faker
import tempfile


class AdvertisementModelTests(TestCase):
    fake = Faker()

    def test_create_general_advertisement(self):
        advertisement_fields = {
            'type': self.fake.random.randint(0, 1),
            'title': self.fake.pystr(0, 100),
            'description': self.fake.pystr(0, 500),
            'breed': CatteryModelTests.test_create_breed(CatteryModelTests()),
            'color': self.fake.pystr(0, 30),
            'creator': UserModelTests.test_create_user(UserModelTests()),
            'price': self.fake.random.randint(0, 50000),
            'country': self.fake.country(),
            'city': self.fake.city(),
        }
        general_advertisement = GeneralAdvertisement.objects.create(**advertisement_fields)
        current_date = timezone.now().date()

        for field, value in advertisement_fields.items():
            self.assertEqual(getattr(general_advertisement, field), value)

        self.assertEqual(general_advertisement.is_deleted, False)
        self.assertIsNone(general_advertisement.deletion_date)
        self.assertEqual(general_advertisement.cats.count(), 0)
        self.assertIsNone(general_advertisement.rating)

        self.assertEqual(general_advertisement.creation_date.date(), current_date)

        return general_advertisement

    def test_create_cattery_advertisement(self):
        advertisement_fields = {
            'type': self.fake.random.randint(0, 1),
            'title': self.fake.pystr(0, 100),
            'description': self.fake.pystr(0, 500),
            'breed': CatteryModelTests.test_create_breed(CatteryModelTests()),
            'color': self.fake.pystr(0, 30),
            'creator': UserModelTests.test_create_user(UserModelTests()),
            'price': self.fake.random.randint(0, 50000),
            'cattery': CatteryModelTests.test_create_cattery(CatteryModelTests()),
            'country': self.fake.country(),
            'city': self.fake.city(),
        }
        cattery_advertisement = CatteryAdvertisement.objects.create(**advertisement_fields)
        current_date = timezone.now().date()

        for field, value in advertisement_fields.items():
            self.assertEqual(getattr(cattery_advertisement, field), value)

        self.assertEqual(cattery_advertisement.is_deleted, False)
        self.assertIsNone(cattery_advertisement.deletion_date)
        self.assertEqual(cattery_advertisement.cats.count(), 0)
        self.assertIsNone(cattery_advertisement.rating)

        self.assertEqual(cattery_advertisement.creation_date.date(), current_date)

        return cattery_advertisement

    def test_add_document(self):
        document_fields = {
            'attachment': tempfile.NamedTemporaryFile(suffix=".jpg").name,
            'general_advertisement': self.test_create_general_advertisement(),
        }
        document = Document.objects.create(**document_fields)

        for field, value in document_fields.items():
            self.assertEqual(getattr(document, field), value)

        self.assertIsNone(document.cattery_advertisement)

        return document

    def test_create_general_advertisement_with_cats(self):
        general_advertisement = self.test_create_general_advertisement()
        first_cat = CatModelTests.test_create_cat_without_parents(CatModelTests()),
        second_cat = CatModelTests.test_create_cat_without_parents(CatModelTests()),
        general_advertisement.cats.add(first_cat[0].id)
        general_advertisement.cats.add(second_cat[0].id)

        self.assertEqual(general_advertisement.cats.count(), 2)
        print(general_advertisement.cats)

        return general_advertisement

