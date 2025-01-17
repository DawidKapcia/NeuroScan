from django.urls import path
from . import views

urlpatterns = [
    path('mricases/', views.CreateMRICaseList.as_view(), name='mricase-list'),
    path('mricases/delete/<int:pk>/', views.DeleteMRICase.as_view(), name='mricase-delete'),
]