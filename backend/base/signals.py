from django.db.models.signals import pre_save
from django.contrib.auth.models import User
'''
sender is the user actually sending the signal to perform an action
instance is the object
'''
def updateUser(sender,instance,**kwargs):
    user = instance
    if user.email != '':
        user.username = user.email


pre_save.connect(updateUser,sender=User)
