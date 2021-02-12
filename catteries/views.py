from django.shortcuts import render
from catteries.models import *


def all_breeds(request):
    return render(request, "catteries/all-breeds.html", {'breeds': Breed.objects.all()})
