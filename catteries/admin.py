from django.contrib import admin
from catteries.models import *

admin.site.register(Cattery)
admin.site.register(Document)
admin.site.register(Breed)
admin.site.register(UserInCattery)
admin.site.register(ApplicationToCattery)
admin.site.register(Announcement)

