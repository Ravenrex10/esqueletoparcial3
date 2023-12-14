from django.shortcuts import render
#from parcial3App.serializers import  ProductoSerializer

import pymongo
import requests
import json

from datetime import datetime
from dateutil import parser

from bson import ObjectId
from rest_framework.response import Response

from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import status

from google.oauth2 import id_token
from google.auth.transport import requests

from pymongo import ReturnDocument

from django.shortcuts import render, get_object_or_404

from parcial3App.serializers import TokenSerializer, EntidadSerializer

import cloudinary
import cloudinary.uploader

# Conexión a la base de datos MongoDB
my_client = pymongo.MongoClient('mongodb+srv://usuario:usuario@parcial3.jo5shgi.mongodb.net')

# Nombre de la base de datos
dbname = my_client['Parcial3']

# Colecciones
#collection_productos = dbname["productos"]
collection_entidades = dbname["entidad"]

CLIENT_ID = '739979864172-bbrds0insroblueqf3grvncjuj4m3dca.apps.googleusercontent.com'
# ----------------------------------------  VISTAS DE LA APLICACIÓN ------------------------------

# ----------------------------------TOKEN -------------------------------

@api_view(['POST'])
def oauth(request):
    if request.method == 'POST':
        serializer = TokenSerializer(data=request.data)
        if serializer.is_valid():
            tokenData = serializer.validated_data
            try:
                token = tokenData['idtoken']
                # Specify the CLIENT_ID of the app that accesses the backend:
                idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

                # Or, if multiple clients access the backend server:
                # idinfo = id_token.verify_oauth2_token(token, requests.Request())
                # if idinfo['aud'] not in [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]:
                #     raise ValueError('Could not verify audience.')

                # If auth request is from a G Suite domain:
                # if idinfo['hd'] != GSUITE_DOMAIN_NAME:
                #     raise ValueError('Wrong hosted domain.')

                # ID token is valid. Get the user's Google Account ID from the decoded token.
                userid = idinfo['sub']
                if userid:
                    return Response({"userid": userid,},
                                    status=status.HTTP_200_OK)
            except ValueError:
                # Invalid token
                return Response({"error": "Token no valido",},
                                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#----------------------------------------- IMAGENES ---------------------------------- #

@api_view(['POST'])
def upload_image(request):
    if request.method == 'POST' and request.FILES.getlist('images'):
        uploaded_files = request.FILES.getlist('images')
        uploaded_urls = []

        # Upload each image to Cloudinary
        cloudinary.config(
                cloud_name="dr4ermv09",
                api_key="895664941251193",
                api_secret="JhAWx8Yq6S1YRJsXw2IVFbAl2wk"
            )

        for file in uploaded_files:
            upload_result = cloudinary.uploader.upload(
                file,
                folder='ingenieriaweb'
            )
            uploaded_urls.append(upload_result['secure_url'])
        return JsonResponse({'urls': uploaded_urls})
    return HttpResponse(status=400)

# ---------------------------------------- CRUD ------------------------------------- #

@api_view(['GET'])
def entidad_view(request, idEntidad):
    entidad = collection_entidades.find_one({'_id': ObjectId(idEntidad)})
    entidad['_id'] = str(ObjectId(entidad.get('_id', [])))
    serializer = Enç(data=entidad)
    if serializer.is_valid():
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)