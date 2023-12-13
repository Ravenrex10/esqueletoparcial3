from django.urls import path
from parcial3App import views

urlpatterns = [
    # PRODUCTOS
    path('logged', views.oauth),
]