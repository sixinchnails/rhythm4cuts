# from game_server.flask.score import SplitWavAudioMubin
# from game_server.flask.correlation import correlate
# import os
#
# folder = "D:"
# file = "seven"
# ext = ".wav"
#
# correlate(folder)

from difflib import SequenceMatcher

answerLyrics = "바람이 마음을 스치는 날에는 그대 숨결을 느낄 수 있죠 난 잘 있어요 아무 걱정 말아요 이젠 제법 익숙한 걸요 추억이 마음을 여미는 날에는 그대 생각을 멈출 수 없죠 지나간 기억들을 떠올리는 일은 어떤 의미도 없는걸요 오 걸음을 멈추는"
userLyrics = "바람이 마음을 스치는 날에는 그대 숨결을 느낄 수 있죠 난 잘 있어요 아무 걱정 말아요 이젠 제법 익숙한걸요 추억이 마음을 여미는 날에는 그대 생각을 멈출 수 없죠 지나간 기억들을 떠올리는 일은 어떤 의미도 없는걸요 아, 걸음을 멈추고"

print(SequenceMatcher(None, userLyrics, answerLyrics).ratio())