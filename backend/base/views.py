from django.shortcuts import render
from django.http import JsonResponse
from .fake import products
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, User
from .serializer import ProductSerializer, UserSerializer, UserSerialzerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerialzerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# This will have our base products file
@api_view(['GET'])
def getRoutes(request):
    routes = [
        ' /api/products',
        '/api/products/create/',
        '/api/products/upload/',
        '/api/products/<id>/reviews/',
        '/api/products/top/',
        '/api/products/<id>',
        '/api/products/delete/<id>',
        '/api/products/<update>/<id>'
    ]
    return Response(routes)


def getProducts(request):
    return JsonResponse(products, safe=False)

# get product


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()  # data serialization
    serializer = ProductSerializer(products, many=True)
    print(serializer.data)
    return Response(serializer.data)


# get users without isAuthenticated
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUsers(request):
    users = User.objects.all()  # data serialization
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = None
    print(type(pk))
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    print(products)
    for i in serializer.data:
        if i['_id'] == int(pk):
            product = i
            print(product)
            break
    print("value", product)
    return Response(product)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)
