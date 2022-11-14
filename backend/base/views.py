from django.shortcuts import render
from django.http import JsonResponse
from .fake import products
# Create your views here.
# views will help in the writting of logics
# these views will be regsitered in the urls.py file

#This will have our base products file
def getRoutes(request):
    return JsonResponse('Hello',safe=False)

def getProducts(request):
    return JsonResponse(products,safe=False)