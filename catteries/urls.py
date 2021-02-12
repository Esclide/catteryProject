from catteries.views import *
from django.urls import path

app_name = "catteries"


urlpatterns = [
    path('breeds/', all_breeds, name="all-breeds"),
]
