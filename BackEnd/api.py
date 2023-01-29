from werkzeug.utils import secure_filename
import io
import os
import json
from google.cloud import vision
from google.cloud.vision_v1 import types
import openai
import urllib.request


def requsetVisionApi(filename):
    file_name = os.path.join(
        os.path.dirname(__file__),
        'images/' + filename)

    with io.open(file_name, 'rb') as image_file:
        content = image_file.read()

    image = types.Image(content=content)

    response = client.label_detection(image=image)
    labels = response.label_annotations
    return labels


def requsetChatGPTApi(keyword):
    gptresponse = openai.Completion.create(
        model="text-davinci-003",
        prompt="Please write 5 sentences for product review with the following keywords. keywrods : " + keyword,
        temperature=0.7,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    text = gptresponse["choices"][0]["text"].split("\n")
    recommend = ""
    for i in text:
        if i != "" and i != "\n":
            recommend += i
    return recommend


def requestPapagoApi(enText):
    translated_result_text = ""
    text = urllib.parse.quote(enText)
    target = "source=en&target=ko&text=" + text
    url = "https://openapi.naver.com/v1/papago/n2mt"
    translate_request = urllib.request.Request(url)
    translate_request.add_header("X-Naver-Client-Id", client_id)
    translate_request.add_header("X-Naver-Client-Secret", client_secret)
    translate_response = urllib.request.urlopen(
        translate_request, data=target.encode("utf-8"))
    translate_rescode = translate_response.getcode()
    if(translate_rescode == 200):
        translate_response_body = translate_response.read()
        translate_result = translate_response_body.decode('utf-8')
        translated_result_json = json.loads(translate_result)
        translated_result_text = translated_result_json["message"]["result"]["translatedText"]
    else:
        print("Error Code:" + translate_rescode)
    return translated_result_text


def textToArray(t):
    temp = []
    res = []
    for i in range(1, 7):
        print(i, ": t :", t)
        temp = t.split(str(i)+". ")
        print(temp)
        if i < 6:
            t = temp[1]
        if i > 1:
            res.append(temp[0])
    return res
