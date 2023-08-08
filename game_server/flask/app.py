from flask import Flask, jsonify, request
from score import getScore
app = Flask(__name__)

@app.route('/')
def index():
    return "Hello, World!"

@app.route('/upload', methods=['POST'])
def upload():
    try:
        # 녹음 파일을 받아서 처리하는 로직을 여기에 작성합니다.
        # request.files['file'] 로 파일 객체를 얻을 수 있습니다.
        # 처리된 결과를 리턴하거나 저장하거나 원하는 작업을 수행합니다.
        # 이 예제에서는 단순히 성공 메시지를 리턴합니다.
        file = request.files['file']
        result = getScore(file)
        return jsonify(result)
    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    # 포트를 8000으로 변경하려면 아래와 같이 port 매개변수를 추가합니다.
    app.run(host='0.0.0.0', port=8000)