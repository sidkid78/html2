import wave
import os

def trim_wav(input_path, output_path, seconds_to_cut):
    with wave.open(input_path, 'rb') as w_in:
        params = w_in.getparams()
        samplerate = params.framerate
        frames_to_cut = int(seconds_to_cut * samplerate)
        
        print(f"Original frames: {params.nframes}")
        print(f"Cutting first {seconds_to_cut} seconds ({frames_to_cut} frames)")
        
        # Check if we have enough frames
        if frames_to_cut >= params.nframes:
            print("Error: Cut duration is longer than file duration.")
            return False
            
        # Move to the start position
        w_in.setpos(frames_to_cut)
        remaining_frames = params.nframes - frames_to_cut
        
        data = w_in.readframes(remaining_frames)
        
        with wave.open(output_path, 'wb') as w_out:
            w_out.setparams(params)
            w_out.setnframes(remaining_frames)
            w_out.writeframes(data)
            
        print(f"Trimmed file saved to {output_path}")
        print(f"New frames: {remaining_frames}")
        return True

if __name__ == "__main__":
    src = r"c:\Users\sidki\source\repos\html2\public\audio\landf.wav"
    dest = r"c:\Users\sidki\source\repos\html2\public\audio\landf_trimmed.wav"
    
    if trim_wav(src, dest, 17):
        # Backup original
        backup = src + ".bak"
        if os.path.exists(backup):
            os.remove(backup)
        os.rename(src, backup)
        # Move trimmed to original name
        os.rename(dest, src)
        print("Trimming complete. Original backed up to .bak")
