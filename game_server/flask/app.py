from flask import Flask, jsonify, request
import os
from score import getLyricsScore, getMelodyScore, splitter, portion_splitter
from flask import send_file
import pymysql

app = Flask(__name__)


# MySQL database properties
host = 'i9b109.p.ssafy.io'
user = '9ithubB109_simons'
password = 'zlwhsalsrnrWid7991'
db = 'rhythm'
charset = 'utf8'

# host = 'localhost'
# user = 'root'
# password = '0000'
# db = 'rhythm'
# charset = 'utf8'

# Establishing a connection
conn = pymysql.connect(
    host=host,
    user=user,
    password=password,
    db=db,
    charset=charset
)

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
        # song_order = request.form['song_order']
        game_seq = request.form['game_seq']
        file = request.files['file']

        #파일명 따라서 mkdir 할 위치
        #mkdir 먼저 할 필요
        if (os.path.exists('./request/' + game_seq) == False):
            os.mkdir('./request/' + game_seq)
        if(os.path.exists('./recording/' + game_seq) == False):
            os.mkdir('./recording/' + game_seq)

        file.save('./request/' + game_seq + "/" + file.filename)
        audio_file = open('./request/' + game_seq + "/" + file.filename, 'rb')

        cursor = conn.cursor()
        cursor.execute("select * from lyrics where song_seq = %s order by lyrics_seq", song_seq)
        lyrics_arr = cursor.fetchall()

        lyrics_seq_start_idx = lyrics_arr[0][0]

        # 1. 파일 분할
        for i in range(len(lyrics_arr)):
            lyrics_seq, end_time, lyric, song_order, start_time, song_seq = lyrics_arr[i]

            if (song_order == 0): continue

            #게임시퀀스(디렉토리), 파일명(디렉토리/파일명), 시작 시간, 끝 시간
            portion_splitter(game_seq, file.filename, str(i + 1), start_time, end_time)

            user_audio = open("./recording/" + game_seq + "/" + str(i + 1) + ".wav", "rb")
            #answer_audio = open("./answer/" + song_seq + "/" + str(i + 1) + ".wav", "rb")

            lyricsScore = getLyricsScore(song_seq, lyrics_seq_start_idx + i, user_audio)
            # melodyScore = getMelodyScore(file.filename)

        return jsonify({
            "lyricsScore":lyricsScore
            ,"melodyScore":melodyScore
        })

    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    # 포트를 8000으로 변경하려면 아래와 같이 port 매개변수를 추가합니다.
    app.run(host='0.0.0.0', port=8081)