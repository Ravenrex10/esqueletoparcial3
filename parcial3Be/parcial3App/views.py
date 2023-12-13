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

# Conexión a la base de datos MongoDB
my_client = pymongo.MongoClient('mongodb+srv://usuario:usuario@parcial3.jo5shgi.mongodb.net')

# Nombre de la base de datos
dbname = my_client['Parcial3']

# Colecciones
#collection_productos = dbname["productos"]

CLIENT_ID = '739979864172-bbrds0insroblueqf3grvncjuj4m3dca.apps.googleusercontent.com'
# ----------------------------------------  VISTAS DE LA APLICACIÓN ------------------------------

@api_view(['GET', 'POST'])
def oauth(request):
    if request.method == 'POST':
        data = request.data
        token = data.idtoken
        try:
            # Specify the CLIENT_ID of the app that accesses the backend:
            idinfo = token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

            # Or, if multiple clients access the backend server:
            # idinfo = id_token.verify_oauth2_token(token, requests.Request())
            # if idinfo['aud'] not in [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]:
            #     raise ValueError('Could not verify audience.')

            # If auth request is from a G Suite domain:
            # if idinfo['hd'] != GSUITE_DOMAIN_NAME:
            #     raise ValueError('Wrong hosted domain.')

            # ID token is valid. Get the user's Google Account ID from the decoded token.
            userid = idinfo['sub']
            print('Token verificado uwu')
        except ValueError:
            # Invalid token
            pass
