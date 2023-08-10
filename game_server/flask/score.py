import openai
from pydub import AudioSegment
import math
from difflib import SequenceMatcher

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
def getLyricsScore(file):
    OPENAI_API_KEY = "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"
    openai.api_key = OPENAI_API_KEY
    lyricsAnswer = [
        "바람이 마음을 스치는 날에는 그대 숨결을 느낄 수 있죠 난 잘 있어요 아무 걱정 말아요 이젠 제법 익숙한 걸요 추억이 마음을 여미는 날에는 그대 생각을 멈출 수 없죠 지나간 기억들을 떠올리는 일은 어떤 의미도 없는걸요 오 걸음을 멈추"
    ]
    lyricsSize = len(lyricsAnswer)

    # audio_file = open("C://Users//SSAFY//Desktop//0_naul.wav", 'rb')
    # 음성 인식
    # transcript = openai.Audio.transcribe("whisper-1", audio_file)
    transcript = openai.Audio.transcribe("whisper-1", file)

    # 사용자 입력 가사
    userLyrics = transcript['text']

    lyricsAccuracy = SequenceMatcher(None, lyricsAnswer[0], userLyrics)

    # 파일을 원하는 방식으로 처리하는 로직을 작성합니다.
    # 여기에서는 가사 정확도를 간단히 리턴하는 예제를 보여줍니다.
    return {
        "score": lyricsAccuracy.ratio(),
        "text": userLyrics
    }