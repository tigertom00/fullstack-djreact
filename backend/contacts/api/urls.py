from django.urls import path
from contacts.api.views import ContactViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', ContactViewSet, base_name='contact')
urlpatterns = router.urls
