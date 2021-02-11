from django.test import TestCase
from faker import Faker
from users.models import *
import tempfile


class UserModelTests(TestCase):
    fake = Faker()

    def test_create_user(self):
        user_fields = {
            'username': self.fake.name(),
            'email': self.fake.email(),
            'password': self.fake.password(),
            'first_name': self.fake.first_name(),
            'last_name': self.fake.last_name(),
        }
        user = User.objects.create_user(**user_fields)

        for field, value in user_fields.items():
            if field != 'password':
                self.assertEqual(getattr(user, field), value)
            else:
                self.assertTrue(user.check_password(user_fields['password']))

        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

        return user

    def test_create_superuser(self):
        user_fields = {
            'username': self.fake.name(),
            'email': self.fake.email(),
            'password': self.fake.password(),
            'first_name': self.fake.first_name(),
            'last_name': self.fake.last_name(),
        }
        superuser = User.objects.create_superuser(**user_fields)

        for field, value in user_fields.items():
            if field != 'password':
                self.assertEqual(getattr(superuser, field), value)
            else:
                self.assertTrue(superuser.check_password(user_fields['password']))

        self.assertTrue(superuser.is_active)
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_superuser)

    def test_create_profile(self):
        profile_fields = {
            'user': self.test_create_user(),
            'profile_image': tempfile.NamedTemporaryFile(suffix=".jpg").name,
            'phone': self.fake.phone_number(),
            'country': self.fake.country(),
            'city': self.fake.city(),
        }
        profile = Profile.objects.create(**profile_fields)

        for field, value in profile_fields.items():
            self.assertEqual(getattr(profile, field), value)

        return profile
