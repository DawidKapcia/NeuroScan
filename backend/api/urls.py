from django.urls import path
from . import views

urlpatterns = [
    path('mricases/', views.CreateMRICaseList.as_view(), name='mricase-list'),
    path('mricases/all', views.ListMRICasesView.as_view(), name='mricase-list-all'),
    path('mricases/delete/<int:pk>/', views.DeleteMRICase.as_view(), name='mricase-delete'),
    path('mricases/update/<int:pk>/', views.UpdateCaseView.as_view(), name='mricase-update'),
]