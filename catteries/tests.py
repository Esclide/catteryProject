from django.test import TestCase
from catteries.models import *
from faker import Faker
from users.tests import UserModelTests
import tempfile


class CatteryModelTests(TestCase):
    fake = Faker()

    def test_create_cattery(self):
        cattery_fields = {
            'leader': UserModelTests.test_create_user(UserModelTests()),
            'name': self.fake.company(),
            'membership_fee': self.fake.random.randint(0, 1000),
            'country': self.fake.country(),
            'city': self.fake.city(),
            'site': self.fake.url(),
        }
        cattery = Cattery.objects.create(**cattery_fields)
        current_date = timezone.now().date()

        for field, value in cattery_fields.items():
            self.assertEqual(getattr(cattery, field), value)

        self.assertEqual(cattery.status, 1)
        self.assertEqual(cattery.breeds.count(), 0)
        self.assertEqual(cattery.creation_date.date(), current_date)

        return cattery

    def test_create_breed(self):
        breed_fields = {
            'name': self.fake.name(),
            'description': self.fake.text(),
            'image': tempfile.NamedTemporaryFile(suffix=".jpg").name,
        }
        breed = Breed.objects.create(**breed_fields)
        for field, value in breed_fields.items():
            self.assertEqual(getattr(breed, field), value)

        return breed

    def test_create_user_in_cattery(self):
        user_in_cattery_fields = {
            'user': UserModelTests.test_create_user(UserModelTests()),
            'cattery': self.test_create_cattery(),
            'status': self.fake.random.randint(0, 2),
            'is_admin': False,
        }
        user_in_cattery = UserInCattery.objects.create(**user_in_cattery_fields)

        for field, value in user_in_cattery_fields.items():
            self.assertEqual(getattr(user_in_cattery, field), value)

        self.assertFalse(user_in_cattery.is_deleted)
        self.assertFalse(user_in_cattery.is_fee_paid)
        self.assertIsNone(user_in_cattery.deletion_date)
        self.assertEqual(user_in_cattery.creation_date.date(), timezone.now().date())

        return user_in_cattery

    def test_create_application_to_cattery(self):
        application_to_cattery_fields = {
            'user': UserModelTests.test_create_user(UserModelTests()),
            'cattery': self.test_create_cattery(),
            'message': self.fake.pystr(0, 500),

        }
        application_to_cattery = ApplicationToCattery.objects.create(**application_to_cattery_fields)

        for field, value in application_to_cattery_fields.items():
            self.assertEqual(getattr(application_to_cattery, field), value)

        self.assertEqual(application_to_cattery.creation_date.date(), timezone.now().date())

        return application_to_cattery

    def test_create_announcement(self):
        announcement_fields = {
            'creator': UserModelTests.test_create_user(UserModelTests()),
            'cattery': self.test_create_cattery(),
            'text': self.fake.text(),
            'photo': tempfile.NamedTemporaryFile(suffix=".jpg").name

        }
        announcement = Announcements.objects.create(**announcement_fields)

        for field, value in announcement_fields.items():
            self.assertEqual(getattr(announcement, field), value)

        self.assertEqual(announcement.creation_date.date(), timezone.now().date())
        self.assertEqual(announcement.show_until.date(), timezone.now().date() + timedelta(30))

        self.assertEqual(announcement.status, 0)
        self.assertIsNone(announcement.deletion_date)

        return announcement


def test_create_document(self):
    document_fields = {
        'attachment': tempfile.NamedTemporaryFile(suffix=".jpg").name,
        'cattery': self.test_create_cattery(),

    }
    announcement = Document.objects.create(**document_fields)

    for field, value in document_fields.items():
        self.assertEqual(getattr(announcement, field), value)

    self.assertEqual(announcement.creation_date.date(), timezone.now().date())
    print(document_fields['cattery'])

    return announcement

