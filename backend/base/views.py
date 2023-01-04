from django.shortcuts import render
from django.http import JsonResponse
from .fake import products
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializer import ProductSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
# Create your views here.
# views will help in the writting of logics
# these views will be regsitered in the urls.py file


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data['username'] = self.user.username
        data['email'] = self.user.email
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


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()  # data serialization
    serializer = ProductSerializer(products, many=True)
    print(serializer.data)
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
