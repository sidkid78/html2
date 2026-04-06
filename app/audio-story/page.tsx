'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, ListMusic, SkipForward } from 'lucide-react';

const tracks = [
  { id: 1, name: "Segment I", file: "/audio/download.wav" },
  { id: 2, name: "Segment II", file: "/audio/download (2).wav" },
  { id: 3, name: "Segment III", file: "/audio/download (3).wav" },
  { id: 4, name: "Segment IV", file: "/audio/download (4).wav" },
  { id: 5, name: "Segment V", file: "/audio/download (5).wav" },
];

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

const TrackCard = ({ track, isPlaying, isQueued, onToggle, onEnded }: { 
  track: any, 
  isPlaying: boolean,
  isQueued: boolean,
  onToggle: () => void,
  onEnded: () => void 
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } else {
      audio.pause();
      // Reset progress when not playing and not just paused
      if (!isPlaying) {
        setProgress(0);
        setCurrentTime(0);
        audio.currentTime = 0;
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
      setCurrentTime(audio.currentTime);
    }
  };

  return (
    <div 
      className={`group bg-white/5 backdrop-blur-xl border transition-all duration-300 rounded-3xl p-6 hover:translate-y-[-4px] relative overflow-hidden
        ${isPlaying ? 'border-indigo-500/50 shadow-2xl shadow-indigo-500/10' : isQueued ? 'border-indigo-500/20 bg-indigo-900/10' : 'border-white/10 hover:border-white/20'}`}
    >
      {/* Queued indicator glow */}
      {isQueued && !isPlaying && (
        <div className="absolute inset-0 bg-indigo-600/5 pointer-events-none" />
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs font-mono text-slate-500">SEGMENT_0{track.id}</div>
          <div className="flex items-center gap-2">
            {isQueued && !isPlaying && (
              <span className="text-[0.6rem] font-black text-indigo-400/60 uppercase tracking-widest">queued</span>
            )}
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-indigo-500 animate-pulse' : 'bg-transparent'}`} />
          </div>
        </div>

        <h3 className={`text-lg font-semibold mb-8 transition-colors duration-300 ${isPlaying ? 'text-indigo-300' : 'group-hover:text-indigo-300'}`}>
          {track.name}
        </h3>

        <div className="space-y-4">
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-100 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <button 
              onClick={onToggle}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all 
                ${isPlaying ? 'bg-indigo-600' : 'bg-white/10 hover:bg-white/20'}`}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <div className="text-xs text-slate-500 font-mono">
              {formatTime(currentTime)}
            </div>
          </div>
        </div>
      </div>

      <audio 
        ref={audioRef}
        src={track.file}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onEnded}
      />
    </div>
  );
};

export default function AudioStoryPage() {
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const [ambientVolume, setAmbientVolume] = useState(0.5);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [continuousMode, setContinuousMode] = useState(false);

  const ambientRef = useRef<HTMLAudioElement>(null);

  const duckAmbient = (duck: boolean) => {
    if (ambientRef.current) {
      const target = duck ? ambientVolume * 0.3 : ambientVolume;
      ambientRef.current.volume = target;
    }
  };

  const toggleAmbient = () => {
    if (ambientRef.current) {
      if (ambientPlaying) {
        ambientRef.current.pause();
        setAmbientPlaying(false);
      } else {
        // 2-second delay before background music kicks in
        setTimeout(() => {
          if (ambientRef.current) {
            ambientRef.current.currentTime = 0; // reset in case it reached the end
            ambientRef.current.play();
            setAmbientPlaying(true);
          }
        }, 2000);
      }
    }
  };

  const handleToggleTrack = (id: number) => {
    if (currentTrack === id) {
      setCurrentTrack(null);
      duckAmbient(false);
    } else {
      setCurrentTrack(id);
      duckAmbient(true);
    }
  };

  // Advance to next track in continuous mode, or stop if last
  const handleTrackEnded = (id: number) => {
    if (continuousMode) {
      const currentIndex = tracks.findIndex(t => t.id === id);
      const nextTrack = tracks[currentIndex + 1];
      if (nextTrack) {
        setCurrentTrack(nextTrack.id);
        // ambient stays ducked — narration continues
      } else {
        // All done — restore ambient
        setCurrentTrack(null);
        duckAmbient(false);
        setContinuousMode(false);
      }
    } else {
      setCurrentTrack(null);
      duckAmbient(false);
    }
  };

  // "Play All" — start narration immediately, delay ambient by 2 seconds
  const handlePlayAll = () => {
    setContinuousMode(true);
    setCurrentTrack(tracks[0].id);
    if (!ambientPlaying) {
      // 2-second delay before background music kicks in
      setTimeout(() => {
        if (ambientRef.current) {
          ambientRef.current.currentTime = 0; // reset in case it reached the end
          ambientRef.current.play();
          setAmbientPlaying(true);
          duckAmbient(true);
        }
      }, 2000);
    } else {
      duckAmbient(true);
    }
  };

  // Stop everything
  const handleStop = () => {
    setCurrentTrack(null);
    setContinuousMode(false);
    duckAmbient(false);
  };

  const isRunning = continuousMode && currentTrack !== null;

  return (
    <div className="min-h-screen bg-[#0c1015] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-900/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <header className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-br from-white via-slate-200 to-slate-400">
            Audio Story Hub
          </h1>
          <p className="text-slate-400 font-light text-lg max-w-2xl mx-auto">
            Experience the fusion of modern anxiety and high-tech capability in this premium narrative showcase.
          </p>
        </header>

        {/* Ambient Layer Panel */}
        <section className="mb-6">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row items-center gap-8">
            <button 
              onClick={toggleAmbient}
              className="w-16 h-16 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/20"
              title={ambientPlaying ? 'Pause Ambient' : 'Play Ambient'}
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
                title="Ambient Volume"
                className="w-32 accent-indigo-500 h-1 bg-white/10 rounded-full appearance-none"
              />
            </div>
          </div>
        </section>

        {/* Continuous Play Toolbar */}
        <section className="mb-12">
          <div className={`rounded-2xl border px-6 py-4 flex flex-col sm:flex-row items-center gap-4 transition-all duration-500 ${isRunning ? 'bg-indigo-950/40 border-indigo-500/30 shadow-lg shadow-indigo-900/20' : 'bg-white/3 border-white/8'}`}>
            <div className="flex items-center gap-3 flex-1">
              <ListMusic className={`w-5 h-5 ${isRunning ? 'text-indigo-400' : 'text-slate-600'}`} />
              <div>
                <div className={`text-sm font-semibold ${isRunning ? 'text-indigo-300' : 'text-slate-400'}`}>
                  {isRunning
                    ? `Playing all segments continuously — now on ${tracks.find(t => t.id === currentTrack)?.name}`
                    : 'Continuous Play'}
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Auto-advances through all segments with background music
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isRunning && (
                <>
                  {/* Skip to next */}
                  <button
                    onClick={() => {
                      const currentIndex = tracks.findIndex(t => t.id === currentTrack);
                      const next = tracks[currentIndex + 1];
                      if (next) setCurrentTrack(next.id);
                      else handleStop();
                    }}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-indigo-300 border border-white/10 hover:border-indigo-500/30 px-3 py-2 rounded-xl transition-all"
                    title="Skip to next segment"
                  >
                    <SkipForward className="w-3.5 h-3.5" /> Skip
                  </button>
                  {/* Stop */}
                  <button
                    onClick={handleStop}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-red-400 border border-white/10 hover:border-red-500/30 px-3 py-2 rounded-xl transition-all"
                    title="Stop continuous play"
                  >
                    Stop
                  </button>
                </>
              )}

              {!isRunning && (
                <button
                  onClick={handlePlayAll}
                  className="flex items-center gap-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md shadow-indigo-600/30"
                  title="Play all segments with background music"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Play All
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Narrative Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track) => (
            <TrackCard 
              key={track.id}
              track={track}
              isPlaying={currentTrack === track.id}
              isQueued={continuousMode && currentTrack !== null && track.id > (currentTrack ?? 0)}
              onToggle={() => handleToggleTrack(track.id)}
              onEnded={() => handleTrackEnded(track.id)}
            />
          ))}
        </section>

        <footer className="mt-24 text-center border-t border-white/5 pt-12 pb-8 flex flex-col items-center gap-6">
            <div className="flex gap-4">
                <a href="/audio-story-2" className="text-slate-500 hover:text-amber-400 text-xs transition-colors border border-white/5 px-4 py-2 rounded-xl bg-white/5">Switch to Hub II (Cinematic Rock) →</a>
            </div>
            <p className="text-slate-600 text-sm">© {new Date().getFullYear()} Audio Story Showcase • Built for Vercel Deployment</p>
        </footer>
      </div>

      <audio 
        ref={ambientRef}
        src="/audio/easy.mp3" // Modern Anxiety to High-Tech Capability..mp3"
      />
    </div>
  );
}
