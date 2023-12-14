from django.urls import path
from parcial3App import views

urlpatterns = [
    # PRODUCTOS
    path('logged', views.oauth),
    path('api/image/upload', views.upload_image),
    path('api/entidad/<str:idEntidad>/', views.entidad_view)
]