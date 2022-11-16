from django.shortcuts import render
from django.http import JsonResponse
from .fake import products
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.
# views will help in the writting of logics
# these views will be regsitered in the urls.py file

#This will have our base products file
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/products',
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
    return JsonResponse(products,safe=False)