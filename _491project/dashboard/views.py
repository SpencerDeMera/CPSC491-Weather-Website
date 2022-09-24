from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
import requests

def weather():
    """Weather Data Ingest"""
    

def index(request):
    
    
    return render(request, 'index.html', context = {
        'temp': 5,
    })