import flask
from flask import *
from flask_cors import CORS
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

client_id = "Xa13p0zhdJGJ1lFVl0aU"
client_secret = "nGkE4escvB"

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    html = '''
        <div>
            <form action="/send" method="post">
                <input name="msg"/>
                <button type="submit">전송</button>
            </form>
        </div>
    '''
    return html


@app.route('/sendmsg', methods=['POST'])
def post_msg():
    msgdata = request.get_json()
    print("클라이언트로 부터의 메세지 : " + msgdata['msg'])
    msgdata['msg'] = "'" + msgdata['msg'] + "'를 받았습니다."
    msgdata['state'] = 200
    return msgdata


@app.route('/sendimg', methods=['POST'])
def post_img():
    # 이미지 수신부
    imgdata = request.files["image"]
    filename = request.form["filename"]
    print(imgdata)
    imgdata.save("./images/" + filename)

    # vision api 요청부
    file_name = os.path.join(
        os.path.dirname(__file__),
        'images/' + filename)

    with io.open(file_name, 'rb') as image_file:
        content = image_file.read()

    image = types.Image(content=content)

    response = client.label_detection(image=image)
    labels = response.label_annotations

    # 키워드 처리부
    keyword = ""

    for label in labels:
        if keyword == "":
            keyword += label.description
        else:
            keyword = keyword + ", " + label.description

    # openai GPT api 요청부
    gptresponse = openai.Completion.create(
        model="text-davinci-003",
        prompt="Please write 5 sentences for product review with the following keywords. keywrods : " + keyword,
        temperature=0.7,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    print(gptresponse["choices"][0])
    text = gptresponse["choices"][0]["text"].split("\n")
    recommend = ""
    for i in text:
        if i != "" and i != "\n":
            recommend += i

    # 파파고 번역부
    translated_text = []
    kocText = urllib.parse.quote(recommend)
    data = "source=en&target=ko&text=" + kocText
    url = "https://openapi.naver.com/v1/papago/n2mt"
    translate_request = urllib.request.Request(url)
    translate_request.add_header("X-Naver-Client-Id", client_id)
    translate_request.add_header("X-Naver-Client-Secret", client_secret)
    translate_response = urllib.request.urlopen(
        translate_request, data=data.encode("utf-8"))
    translate_rescode = translate_response.getcode()
    if(translate_rescode == 200):
        translate_response_body = translate_response.read()
        translate_result = translate_response_body.decode('utf-8')
        translated_texts = json.loads(translate_result)
        translated_result_text = translated_texts["message"]["result"]["translatedText"].split(
            ".")
        for tt in translated_result_text:
            if tt != "" or tt != " " or tt != "." or tt not in ["1", "2", "3", "4", "5"]:
                translated_text.append(tt)
    else:
        print("Error Code:" + translate_rescode)

    return {'msg': "키워드 : " + keyword, 'state': 200, 'recommend': translated_text}


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3001, debug=True)
