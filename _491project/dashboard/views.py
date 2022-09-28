from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
import json
import requests
from datetime import datetime, timedelta
import time

# Fullerton coordinates
testCoords = {
    'lat': 33.870350,
    'lon': -117.924301,
}

# get API keys from API.txt
def getAPIKeys():
    with open('API.txt', 'r') as f:
        lines = f.read()
        openWeather = lines.split('\n', 1)[0]
        
        keys = {
            'openWeather': openWeather,
        }
        
        return keys

# Get primary weather from OWM One Call API
def weather():
    """Weather Data Ingest"""
    keys = getAPIKeys()
    r = requests.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + str(testCoords['lat']) + '&lon=' + str(testCoords['lon']) + '&units=imperial&appid=' + keys['openWeather'])
    resp = json.loads(json.dumps(r.json()))
    
    # Call different values within functions to grab JSON data (current conditions, hourly forecast, etc)
    data = {
        'lat': resp['lat'],
        'lon': resp['lon'],
        'current': resp['current'],
        'currWeather': resp['current']['weather'][0],
        'minutelyPrecip': resp['minutely'],
        'hourly': resp['hourly'],
        'daily': resp['daily'],
    }
    
    return data

# Get separate AQI from OWM Air Quality API
def aqi():
    """AQI Data Ingest"""
    prior = datetime.now() - timedelta(minutes=60)
    now = datetime.now()
    start = int(time.mktime(prior.timetuple()))
    end = int(time.mktime(now.timetuple()))

    keys = getAPIKeys()
    r = requests.get(
        'http://api.openweathermap.org/data/2.5/air_pollution/history?lat=' + str(testCoords['lat']) + '&lon=' + str(testCoords['lon']) + '&start='
        + str(start) + '&end=' + str(end) + '&appid=' + keys['openWeather'])
    resp = json.loads(json.dumps(r.json()))
    
    data = {
        'overallAQI': resp['list'][0]['main']['aqi'],
        'ozone': resp['list'][0]['components']['o3'],
        'fine': resp['list'][0]['components']['pm2_5'],
        'coarse': resp['list'][0]['components']['pm10'],
    }

    return data

# Main view return for dashboard app
def index(request):
    weatherData = weather()
    aqiData = aqi()
    
    return render(request, 'index.html', context = {
        'temp': 5,
    })