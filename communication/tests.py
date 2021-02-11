from django.test import TestCase
from catteries.tests import CatteryModelTests
from advertisement.tests import AdvertisementModelTests
from users.tests import UserModelTests
from communication.models import *
from faker import Faker


class CommunicationModelTests(TestCase):
    fake = Faker()

    def test_create_message(self):
        message_fields = {
            'sender': UserModelTests.test_create_user(UserModelTests()),
            'recipient': UserModelTests.test_create_user(UserModelTests()),
            'cattery_advertisement': AdvertisementModelTests.test_create_cattery_advertisement(AdvertisementModelTests()),
        }
        message = Message.objects.create(**message_fields)
        current_date = timezone.now().date()

        for field, value in message_fields.items():
            self.assertEqual(getattr(message, field), value)

        self.assertEqual(message.creation_date.date(), current_date)

        self.assertFalse(message.is_viewed)

        self.assertIsNone(message.general_advertisement)
        self.assertIsNone(message.viewed_date)

        return message

    def test_create_cattery_review(self):
        cattery_review_fields = {
            'creator': UserModelTests.test_create_user(UserModelTests()),
            'description': self.fake.pystr(0, 500),
            'rate': self.fake.random.randint(0, 5),
            'cattery': CatteryModelTests.test_create_cattery(CatteryModelTests()),
        }
        cattery_review = CatteryReview.objects.create(**cattery_review_fields)
        current_date = timezone.now().date()

        for field, value in cattery_review_fields.items():
            self.assertEqual(getattr(cattery_review, field), value)

        self.assertEqual(cattery_review.creation_date.date(), current_date)

        return cattery_review

    def test_create_breeder_review(self):
        breeder_review_fields = {
            'creator': UserModelTests.test_create_user(UserModelTests()),
            'description': self.fake.pystr(0, 500),
            'rate': self.fake.random.randint(0, 5),
            'breeder': UserModelTests.test_create_user(UserModelTests()),
        }
        breeder_review = BreederReview.objects.create(**breeder_review_fields)
        current_date = timezone.now().date()

        for field, value in breeder_review_fields.items():
            self.assertEqual(getattr(breeder_review, field), value)

        self.assertEqual(breeder_review.creation_date.date(), current_date)

        return breeder_review

    def test_create_breed_review(self):
        breed_review_fields = {
            'creator': UserModelTests.test_create_user(UserModelTests()),
            'description': self.fake.pystr(0, 500),
            'rate': self.fake.random.randint(0, 5),
            'breed': CatteryModelTests.test_create_breed(CatteryModelTests()),
        }
        breed_review = BreedReview.objects.create(**breed_review_fields)
        current_date = timezone.now().date()

        for field, value in breed_review_fields.items():
            self.assertEqual(getattr(breed_review, field), value)

        self.assertEqual(breed_review.creation_date.date(), current_date)

        return breed_review
