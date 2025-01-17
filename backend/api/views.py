from django.shortcuts import render
from rest_framework import generics
from .serializers import UserSerializer, MRICaseSerializer
from .models import MRICase
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser

class CreateUserView(generics.CreateAPIView):
    
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny,]

class CreateMRICaseList(generics.CreateAPIView):
    
    queryset = MRICase.objects.all()
    serializer_class = MRICaseSerializer
    permission_classes = [IsAuthenticated,]

    def get_queryset(self):
        user = self.request.user
        return MRICase.objects.filter(radiologist=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(radiologist=self.request.user)
        else:
            print(serializer.errors)

class DeleteMRICase(generics.DestroyAPIView):

    serializer_class = MRICaseSerializer
    permission_classes = [IsAuthenticated,]

    def get_queryset(self):
        user = self.request.user
        return MRICase.objects.filter(radiologist=user)