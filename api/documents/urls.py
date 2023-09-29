from django.urls import path
from . import views

urlpatterns = [
    path('documents/', views.DocumentViewGetPost.as_view(), name= 'document_get_post'),
    path('documents/<int:pk>/', views.DocumentViewUpdateDelete.as_view(), name= 'document_update_delete'),
]