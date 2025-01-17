from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import MRICase

class UserSerializer(serializers.ModelSerializer):
    
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class MRICaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = MRICase
        fields = ['id', 'gender', 'birth_date', 'scan_date', 'risk', 'decision', 'radiologist', 'scan']
        extra_kwargs = {'risk': {'read_only': True}, 'decision': {'read_only': True}, 'radiologist': {'read_only': True}}