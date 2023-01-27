import flask
from flask import *
from flask_cors import CORS

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

@app.route('/send', methods=['POST'])
def post_text():
    params = request.get_json()
    print(params['msg'])
    params['msg'] = "'" + params['msg'] + "'를 받았습니다."
    params['state'] = "Good"
    return params


if __name__ == '__main__':
    app.run()