from game_server.flask.score import SplitWavAudioMubin
import os

folder = "D:"
file = "seven"
ext = ".wav"

split_wav = SplitWavAudioMubin(folder, file, ext)
split_wav.multiple_split(min_per_split=1)