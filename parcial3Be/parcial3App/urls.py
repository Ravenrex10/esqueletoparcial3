from django.urls import path
from parcial3App import views

urlpatterns = [
    # PRODUCTOS
    path('logged', views.oauth),
    path('api/image/upload', views.upload_image),
    path('api/entidad', views.entidades),
    path('api/entidad/proximos', views.eventos_proximos),
    path('api/entidad/<str:idEntidad>/', views.entidad_view),
    path('api/entidad/coordenadas/<str:codigoPostal>/', views.getCoordenadas)
]