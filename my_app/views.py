import json
import time
from django.http import JsonResponse
from django.shortcuts import render
from my_app import gemini

def helperbot(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        input_value = data.get('inputValue')
        # print("Input Value:", input_value)
        RESULT = gemini.generate_content(input_value)
        response_data = {'message': RESULT}

        return JsonResponse(response_data)
    
    return render(request, "gemini.html")
