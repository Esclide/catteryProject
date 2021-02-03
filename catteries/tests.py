from django.test import TestCase
from catteries.models import Cattery
from django.contrib.auth import get_user_model


class CatteriesTests(TestCase):
    def test_create_cattery(self):

        user = get_user_model().objects.create_user(username='firstUser', email='user@yandex.ru', password='Pa$$w0rd',
                                             first_name='Anna', last_name='Loginova')
        cattery = Cattery.objects.create(name='Cat Paradise', membershipFee=1000, leader=user, country='Russia',
                          city='Saint Petersburg', site='sdfsfsd')

        self.assertEqual(cattery.name, 'Cat Paradise')
        self.assertEqual(cattery.membershipFee, 1000)
        self.assertEqual(cattery.leader, user)
        self.assertEqual(cattery.country, 'Russia')
        self.assertEqual(cattery.city, 'Saint Petersburg')
        self.assertEqual(cattery.site, 'sdfsfsd')
        self.assertIsNone(cattery.breeds)
