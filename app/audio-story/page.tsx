'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Music, Mic2 } from 'lucide-react';

const tracks = [
  { id: 1, name: "Segment I", file: "/audio/download (1).wav" },
  { id: 2, name: "Segment II", file: "/audio/download (2).wav" },
  { id: 3, name: "Segment III", file: "/audio/download (3).wav" },
  { id: 4, name: "Segment IV", file: "/audio/download (4).wav" },
  { id: 5, name: "Segment V", file: "/audio/download (5).wav" },
];

export default function AudioStoryPage() {
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const [ambientVolume, setAmbientVolume] = useState(0.5);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [trackProgress, setTrackProgress] = useState<{ [key: number]: number }>({});

  const ambientRef = useRef<HTMLAudioElement>(null);
  const trackRefs = useRef<{ [key: number]: HTMLAudioElement | null }>({});

  // Initialize progress tracking
  useEffect(() => {
    const intervals: { [key: number]: NodeJS.Timeout } = {};

    tracks.forEach((track) => {
      const audio = trackRefs.current[track.id];
      if (audio) {
        audio.onended = () => {
          setCurrentTrack(null);
          duckAmbient(false);
        };
      }
    });

    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
  }, []);

  // Update progress bars
  useEffect(() => {
    const handleTimeUpdate = (id: number) => {
      const audio = trackRefs.current[id];
      if (audio) {
        setTrackProgress(prev => ({
          ...prev,
          [id]: (audio.currentTime / audio.duration) * 100 || 0
        }));
      }
    };

    tracks.forEach(track => {
      const audio = trackRefs.current[track.id];
      if (audio) {
        audio.ontimeupdate = () => handleTimeUpdate(track.id);
      }
    });
  }, []);

  const toggleAmbient = () => {
    if (ambientRef.current) {
      if (ambientPlaying) {
        ambientRef.current.pause();
      } else {
        ambientRef.current.play();
      }
      setAmbientPlaying(!ambientPlaying);
    }
  };

  const duckAmbient = (duck: boolean) => {
    if (ambientRef.current) {
      const target = duck ? ambientVolume * 0.3 : ambientVolume;
      ambientRef.current.volume = target;
    }
  };

  const toggleTrack = (id: number) => {
    const audio = trackRefs.current[id];
    if (!audio) return;

    if (currentTrack === id) {
      audio.pause();
      setCurrentTrack(null);
      duckAmbient(false);
    } else {
      // Stop previous
      if (currentTrack !== null) {
        trackRefs.current[currentTrack]?.pause();
      }
      audio.play();
      setCurrentTrack(id);
      duckAmbient(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1015] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-900/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <header className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-400">
            Audio Story Hub
          </h1>
          <p className="text-slate-400 font-light text-lg max-w-2xl mx-auto">
            Experience the fusion of modern anxiety and high-tech capability in this premium narrative showcase.
          </p>
        </header>

        {/* Ambient Layer Panel */}
        <section className="mb-12">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row items-center gap-8">
            <button 
              onClick={toggleAmbient}
              className="w-16 h-16 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/20"
            >
              {ambientPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white" />}
            </button>
            
            <div className="flex-1 space-y-1">
              <div className="text-[0.7rem] uppercase tracking-widest font-bold text-sky-400">Atmospheric Foundation</div>
              <h2 className="text-xl font-semibold">Modern Anxiety to High-Tech Capability</h2>
            </div>

            <div className="flex items-center gap-4 bg-white/5 py-2 px-4 rounded-2xl border border-white/5">
              <Volume2 className="w-5 h-5 text-slate-400" />
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={ambientVolume}
                onChange={(e) => {
                  setAmbientVolume(parseFloat(e.target.value));
                  if (ambientRef.current && currentTrack === null) {
                    ambientRef.current.volume = parseFloat(e.target.value);
                  }
                }}
                className="w-32 accent-indigo-500 h-1 bg-white/10 rounded-full appearance-none"
              />
            </div>
          </div>
        </section>

        {/* Narrative Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track, index) => (
            <div 
              key={track.id}
              className={`group bg-white/5 backdrop-blur-xl border transition-all duration-300 rounded-3xl p-6 hover:translate-y-[-4px] 
                ${currentTrack === track.id ? 'border-indigo-500/50 shadow-2xl shadow-indigo-500/10' : 'border-white/10 hover:border-white/20'}`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="text-xs font-mono text-slate-500">SEGMENT_0{track.id}</div>
                <div className={`w-2 h-2 rounded-full ${currentTrack === track.id ? 'bg-indigo-500 animate-pulse' : 'bg-transparent'}`} />
              </div>

              <h3 className="text-lg font-semibold mb-8 group-hover:text-indigo-300 transition-colors">{track.name}</h3>

              <div className="space-y-4">
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-100 ease-linear rounded-full"
                    style={{ width: `${trackProgress[track.id] || 0}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => toggleTrack(track.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all 
                      ${currentTrack === track.id ? 'bg-indigo-600' : 'bg-white/10 hover:bg-white/20'}`}
                  >
                    {currentTrack === track.id ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <div className="text-xs text-slate-500 font-mono">
                    {trackRefs.current[track.id] ? formatTime(trackRefs.current[track.id]!.currentTime) : '0:00'}
                  </div>
                </div>
              </div>

              <audio 
                ref={el => { trackRefs.current[track.id] = el }}
                src={track.file}
              />
            </div>
          ))}
        </section>

        <footer className="mt-24 text-center border-t border-white/5 pt-12 pb-8">
            <p className="text-slate-600 text-sm">© {new Date().getFullYear()} Audio Story Showcase • Built for Vercel Deployment</p>
        </footer>
      </div>

      <audio 
        ref={ambientRef}
        loop
        src="/audio/Modern Anxiety to High-Tech Capability..mp3"
      />
    </div>
  );
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
