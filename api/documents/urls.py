from django.urls import path
from . import views

urlpatterns = [
    path('documents/', views.DocumentView.as_view(), name= 'document_list'),
]