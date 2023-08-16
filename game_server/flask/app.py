from flask import Flask, jsonify, request
import os
from score import getLyricsScore, getMelodyScore
from flask import send_file

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello, World!!!!"

# @app.route('/split', methods=['POST'])
# def splitVoice():
#     file = request.files['file']
#
#     file.save('./' + file.filename)
#     audio_file = open('./' + file.filename, 'rb')
#
#     os.system("spleeter separate -p spleeter:2stems -o output " + file.filename)
#
#     # Get the paths to the separated stems
#     vocals_path = "./output/blueming_iu/vocals.wav"
#     accompaniment_path = "./output/blueming_iu/accompaniment.wav"
#
#     # Return both stems as separate audio files
#     return {
#         "vocals": send_file(vocals_path, mimetype="audio/wav", download_name="vocals.wav", as_attachment=True),
#         "accompaniment": send_file(accompaniment_path, mimetype="audio/wav", download_name="accompaniment.wav",
#                                    as_attachment=True)
#     }

@app.route('/split', methods=['POST'])
def splitVoice():
    file = request.files['file']

    file.save('./' + file.filename)

    # Run Spleeter to separate the audio into stems
    os.system("spleeter separate -p spleeter:2stems -o output " + file.filename)

    # Get the paths to the separated stems
    vocals_path = "./output/blueming_iu/vocals.wav"
    accompaniment_path = "./output/blueming_iu/accompaniment.wav"

    # Return URLs to the separated stems
    return jsonify({
        "vocals_url": "/download?vocals",
        "accompaniment_url": "/download?accompaniment"
    })

@app.route('/download')
def downloadFile():
    stem = request.form['stem']
    song = request.form['song']

    if stem == "vocals":
        stem_path = "./output/" + song + "/vocals.wav"
        stem_filename = "vocals.wav"
    elif stem == "accompaniment":
        stem_path = "./output/" + song + "/accompaniment.wav"
        stem_filename = "accompaniment.wav"
    else:
        return "Invalid stem specified"

    return send_file(stem_path, mimetype="audio/wav", download_name=stem_filename, as_attachment=True)

@app.route('/score', methods=['POST'])
def upload():
    try:
        # 녹음 파일을 받아서 처리하는 로직을 여기에 작성합니다.
        # request.files['file'] 로 파일 객체를 얻을 수 있습니다.
        # 처리된 결과를 리턴하거나 저장하거나 원하는 작업을 수행합니다.
        # 이 예제에서는 단순히 성공 메시지를 리턴합니다.

        song_seq = request.form['song_seq']
        print("1")
        song_order = request.form['song_order']
        print("2")
        file = request.files['file']
        print("3")

        file.save('./' + file.filename)
        print("4")
        audio_file = open('./'+file.filename, 'rb')
        print("5")

        lyricsScore = getLyricsScore(song_seq, song_order, audio_file)
        print("6")
        melodyScore = getMelodyScore(file.filename)
        print("7")

        return jsonify({
            "lyricsScore":lyricsScore
            ,"melodyScore":melodyScore
        })
    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    # 포트를 8000으로 변경하려면 아래와 같이 port 매개변수를 추가합니다.
    app.run(host='0.0.0.0', port=8081, ssl_context=('cert.pem', 'privkey.pem'))
