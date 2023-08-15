import openai
from pydub import AudioSegment
import math
from difflib import SequenceMatcher
from correlation import correlate
import pymysql

conn = pymysql.connect(host='127.0.0.1', user='root', password='0000', db="rhythm", charset='utf8')

"""
만일 필요한 경우, 쓰게 될 파일 쪼개는 클래스
ex) 파라미터 예시
folder = "C://Users//SSAFY//Downloads"
file = "naul"
ext = ".wav"
ex) 사용 예시
split_wav = SplitWavAudioMubin(folder, file, ext)
split_wav.multiple_split(min_per_split=1)
결과는 Downloads 디렉터리에 '번호_파일명.wav'의 파일들 생성
"""

class SplitWavAudioMubin():
    def __init__(self, folder, filename, ext):
        self.folder = folder
        self.filename = filename
        self.ext = ext
        self.filepath = folder + '//' + filename + ext

        self.audio = AudioSegment.from_wav(self.filepath)

    def get_duration(self):
        return self.audio.duration_seconds

    def single_split(self, from_min, to_min, split_filename):
        t1 = from_min * 60 * 1000
        t2 = to_min * 60 * 1000
        split_audio = self.audio[t1:t2]
        split_audio.export(self.folder + '//' + split_filename, format="wav")

    def multiple_split(self, min_per_split):
        total_mins = math.ceil(self.get_duration() / 60)

        for i in range(0, total_mins, min_per_split):
            split_fn = str(i) + '_' + self.filename + self.ext
            self.single_split(i, i + min_per_split, split_fn)
            print(str(i) + ' Done')

            if i == total_mins - min_per_split:
                print('All splited successfully')

# 곡명, 파트로 매개변수 변경 필요
def getLyricsScore(song_seq, song_order, file):
    try:
        OPENAI_API_KEY = "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"
        openai.api_key = OPENAI_API_KEY

        global conn
        cur = conn.cursor()

        cur.execute("SELECT lyric FROM LYRICS WHERE song_seq = %s AND song_order = %s", (song_seq, song_order))
        lyricsAnswer = cur.fetchone()
        #
        #     #lyricsAnswer =
        #     lyricsSize = len(lyricsAnswer)
        #
        #     # audio_file = open("C://Users//SSAFY//Desktop//0_naul.wav", 'rb')
        # 음성 인식
        # transcript = openai.Audio.transcribe("whisper-1", audio_file)
        transcript = openai.Audio.transcribe("whisper-1", file)

        # 사용자 입력 가사
        userLyrics = transcript['text']

        lyricsAccuracy = SequenceMatcher(None, lyricsAnswer[0], userLyrics)

        # 파일을 원하는 방식으로 처리하는 로직을 작성합니다.
        # 여기에서는 가사 정확도를 간단히 리턴하는 예제를 보여줍니다.
        return {
            "score": lyricsAccuracy.ratio() * 100,
            "text": userLyrics
        }
    except Exception as e:
        print(e)

def getMelodyScore(filename):
    answerFile = ".//0_naul.wav"

    score = correlate(filename, answerFile)

    return {
        "score": score
    }

# folder = 'C://Users//SSAFY//Downloads'
# file = 'naul'
# ext = '.wav'
# split_wav = SplitWavAudioMubin(folder, file, ext)
# split_wav.multiple_split(min_per_split=1)