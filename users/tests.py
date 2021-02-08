from django.test import TestCase
from django.contrib.auth import get_user_model
from faker import Faker


class UserTests(TestCase):
    def create_user(self):
        fake = Faker()
        username = fake.name()
        email = fake.email()
        password = fake.password()
        first_name = fake.first_name()
        last_name = fake.last_name()

        user = get_user_model().objects.create_user(username, email, password, first_name, last_name)
        self.assertEqual(user.username, username)
        self.assertEqual(user.email, email)
        self.assertEqual(user.first_name, first_name)
        self.assertEqual(user.last_name, last_name)

        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

        return user

    def create_superuser(self):
        fake = Faker()
        username = fake.name()
        email = fake.email()
        password = fake.password()
        first_name = fake.first_name()
        last_name = fake.last_name()

        superuser = get_user_model().objects.create_superuser(username, email, password, first_name, last_name)
        self.assertEqual(superuser.username, username)
        self.assertEqual(superuser.email, email)
        self.assertEqual(superuser.first_name, first_name)
        self.assertEqual(superuser.last_name, last_name)

        self.assertTrue(superuser.is_active)
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_superuser)
