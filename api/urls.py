from django.urls import path, include

from api.documents import urls

urlpatterns = [
    path('api/v1/', include(urls)),
]