from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Product
from base.serializer import ProductSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User

from django.contrib.auth.hashers import make_password
from rest_framework import status


#get indivdual products
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

#get all the products
@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()  # data serialization
    serializer = ProductSerializer(products, many=True)
    print(serializer.data)
    return Response(serializer.data)