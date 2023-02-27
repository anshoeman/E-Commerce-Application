from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('',views.getOrders,name='myorders'),
    path('add/',views.addOrderItems,name='order-add'),
    path('myorders/',views.getMyOrders,name="myorders"),
    path('<str:pk>/',views.getOrderById,name="user-orders"),
    path('<str:pk>/deliver/',views.updateOrderToDelivered,name="order-delivered"),
    path('<str:pk>/pay/',views.updateOrderToPaid,name="pay"),
]