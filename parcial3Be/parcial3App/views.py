from django.http import HttpResponse
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
dbname = my_client['parcial3']

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

@api_view(['GET', 'POST'])
def entidades(request):
    if request.method == 'GET':
        prueba = list(collection_entidades.find({}))        
        for p in prueba:
            p['_id'] = str(ObjectId(p.get('_id',[])))

        prueba_serializer = EntidadSerializer(data=prueba, many= True)
        if prueba_serializer.is_valid():
            json_data = prueba_serializer.data
            return Response(json_data, status=status.HTTP_200_OK)
        else:
            return Response(prueba_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == 'POST':
        serializer = EntidadSerializer(data=request.data)
        if serializer.is_valid():
            prueba = serializer.validated_data
            #Probablemente esto se use para el oauth
            # existing_user = collection_prueba.find_one({'_id': prueba['_id']})
            # if existing_user is not None:
            #     return Response({"error": "Ya existe un usuario con ese correo."},
            #                     status=status.HTTP_400_BAD_REQUEST)
            prueba['_id'] = ObjectId()
            prueba['date'] = datetime.now()
            prueba['photoUrls'] = []
            prueba['objid'] = ObjectId(prueba['objid'])
            result = collection_entidades.insert_one(prueba)
            if result.acknowledged:
                return Response({"message": "Producto creado con éxito."}, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "Algo salió mal. Producto no creado."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def entidad_view(request, idEntidad):
    if request.method == 'PUT':
        serializer = EntidadSerializer(data=request.data)
        if serializer.is_valid():
            prueba = serializer.validated_data
            prueba['_id'] = ObjectId(idEntidad)
            result = collection_entidades.replace_one({'_id': ObjectId(idEntidad)}, prueba)
            if result.acknowledged:
                return Response({"message": "Usuario actualizado con éxito",},
                                status=status.HTTP_200_OK)
            else:
                return Response({"error": "Algo salió mal. Usuario no actualizado."},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'GET':
            p = collection_entidades.find_one({'_id': ObjectId(idEntidad)})
            p['_id'] = str(ObjectId(p.get('_id', [])))

            serializer = EntidadSerializer(data=p)
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE' :
        delete_data = collection_entidades.delete_one({'_id': ObjectId(idEntidad)})
        if delete_data.deleted_count == 1:
            return Response({"mensaje": "Usuario eliminado con éxito"}, status=status.HTTP_200_OK)
        else:
            return Response({"ERROR": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)