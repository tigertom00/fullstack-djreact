from django.contrib import admin
from django.urls import path, include
from . import apiurls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('api/', include(apiurls)),
    path('rest-auth/registration/', include('rest_auth.registration.urls'))

]
