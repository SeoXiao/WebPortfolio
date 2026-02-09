
from django.shortcuts import render, redirect
from django.conf import settings
import json

def home(request):
    return render(request, 'portfolio/home.html')

def base(request):
    return render(request, 'portfolio/base.html')

