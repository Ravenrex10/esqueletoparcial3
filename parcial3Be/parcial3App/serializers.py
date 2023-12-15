from rest_framework import serializers

class TokenSerializer(serializers.Serializer):
    idtoken = serializers.CharField()

class EntidadSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length = 24, required=False)
    nombre = serializers.CharField()
    date = serializers.DateTimeField(required=False)
    double = serializers.FloatField()
    boolean = serializers.BooleanField()
    inte = serializers.IntegerField()
    photoUrls = serializers.ListField()