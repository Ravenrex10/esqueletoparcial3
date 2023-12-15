from rest_framework import serializers

class TokenSerializer(serializers.Serializer):
    idtoken = serializers.CharField()

class EntidadSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length = 24, required=False)
    nombre = serializers.CharField()
    timestamp = serializers.DateTimeField(required=False)
    lugar = serializers.CharField()
    lat = serializers.FloatField()
    lon = serializers.FloatField()
    organizador = serializers.CharField()
    imagen = serializers.CharField()

class CodigoSerializer(serializers.Serializer):
    codigoPostal = serializers.CharField()