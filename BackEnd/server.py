import flask
from flask import *
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
import io
import os
import json
from google.cloud import vision
from google.cloud.vision_v1 import types
import openai
import urllib.request

client = vision.ImageAnnotatorClient()

with io.open('./api-key.json', 'r') as f:
    keys = json.load(f)

openai.api_key = keys["openai"]
client_id = keys["papago_id"]
client_secret = keys["papago_secret"]

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


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


@app.route('/')
@cross_origin()
def index():
    html = '''
        <h1>access denied</h1>
    '''
    return html


@app.route('/sendmsg', methods=['POST'])
@cross_origin()
def post_msg():
    msgdata = request.get_json()
    print("?????????????????? ????????? ????????? : " + msgdata['msg'])
    msgdata['msg'] = "'" + msgdata['msg'] + "'??? ???????????????."
    msgdata['state'] = 200
    return msgdata


@app.route('/upload', methods=['POST'])
@cross_origin()
def upload():
    # ????????? ?????????
    imgdata = request.files["image"]
    filename = request.form["filename"]
    print("????????? ?????? ??????, ????????? : " + filename)
    imgdata.save("./images/" + filename)
    print("????????? ?????? ??????")
    # vision api
    labels = requsetVisionApi(filename)
    print("Vision API, ????????? ??????")

    keyword = ""

    for label in labels:
        if keyword == "":
            keyword += label.description
        else:
            keyword = keyword + ", " + label.description
    print("????????? ?????? ??????")

    # openai GPT api
    recommend = requsetChatGPTApi(keyword)
    print("chatGPT API, ?????? ?????? ??????")

    # papago translate api
    translated_result = requestPapagoApi(recommend).split("\n")
    print("papago API, ?????? ??????")

    return {'msg': "????????? : " + keyword, 'state': 200, 'recommend': translated_result}


@app.route('/test', methods=['POST'])
@cross_origin()
def test():
    # ????????? ?????????
    file_list = []
    filename_list = []
    for i in range(int(request.form["length"])):
        file_list.append(request.files["file"+str(i)])
        filename_list.append(request.files["file"+str(i)].filename)
    print("????????? ?????? ??????, ?????? ??? : ",
          request.form["length"], "????????? : ", filename_list)
    for i in range(len(file_list)):
        file_list[i].save("./images/" + filename_list[i])
    print("????????? ?????? ??????")
    return "done!"


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3001, debug=True)
