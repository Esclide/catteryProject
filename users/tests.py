from django.test import TestCase
from django.contrib.auth import get_user_model


class UsersManagersTests(TestCase):
    def createUser(self):
        userModel = get_user_model()
        user = userModel.objects.create_user(username='firstUser', email='user@yandex.ru', password='Pa$$w0rd', first_name='Anna',
                                             last_name='Loginova')
        self.assertEqual(user.username, 'firstUser')
        self.assertEqual(user.email, 'user@yandex.ru')
        self.assertEqual(user.first_name, 'Anna')
        self.assertEqual(user.last_name, 'Loginova')

        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def createSuperuser(self):
        userModel = get_user_model()
        admin_user = userModel.objects.create_superuser(username='firstSuperuser', email='admin@yandex.ru',
                                                        password='Pa$$w0rd', first_name='Liza', last_name='Smith')
        self.assertEqual(admin_user.email, 'admin@yandex.ru')
        self.assertEqual(admin_user.first_name, 'Liza')
        self.assertEqual(admin_user.last_name, 'Smith')

        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
