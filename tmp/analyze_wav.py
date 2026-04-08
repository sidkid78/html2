import wave

def analyze_wav(file_path):
    with wave.open(file_path, 'rb') as w:
        params = w.getparams()
        print(f"Channels: {params.nchannels}")
        print(f"Sample Rate: {params.framerate}")
        print(f"Bit Depth: {params.sampwidth * 8}")
        print(f"Frames: {params.nframes}")
        duration = params.nframes / params.framerate
        print(f"Duration: {duration:.2f} seconds")

if __name__ == "__main__":
    analyze_wav(r"c:\Users\sidki\source\repos\html2\public\audio\landf.wav")
