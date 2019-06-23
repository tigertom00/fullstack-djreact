from django.urls import path, include
from contacts.api import urls as contacturls

urlpatterns = [
    path('contacts/', include(contacturls))
]
