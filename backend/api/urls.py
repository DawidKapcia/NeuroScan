from django.urls import path
from . import views

urlpatterns = [
    path('mricases/', views.CreateMRICaseList.as_view(), name='mricase-list'),
    path('mricases/all', views.ListMRICasesView.as_view(), name='mricase-list-all'),
    path('mricases/<int:pk>/', views.MRICaseDetailView.as_view(), name='mricase-detail'),
    path('mricases/delete/<int:pk>/', views.DeleteMRICase.as_view(), name='mricase-delete'),
]