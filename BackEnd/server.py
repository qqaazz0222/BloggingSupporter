import flask
from flask import *
from flask_cors import CORS
from werkzeug.utils import secure_filename

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
    imgdata = request.files["image"]
    filename = request.form["filename"]
    print(imgdata)
    print(filename)
    imgdata.save("./images/" + filename)
    return {'msg': filename + "이 서버에 저장되었습니다.", 'state': 200}

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3001, debug=True)