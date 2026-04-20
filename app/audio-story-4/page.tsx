'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, ListMusic, SkipForward, ArrowLeft } from 'lucide-react';

const tracks = [
  { id: 1, name: "Manifesto Segment I", file: "/audio/sec-1.wav" },
  { id: 2, name: "Manifesto Segment II", file: "/audio/sec-2.wav" },
  { id: 3, name: "Manifesto Segment III", file: "/audio/sec-3.wav" },
  { id: 4, name: "Manifesto Segment IV", file: "/audio/sec-4.wav" },
  { id: 5, name: "Manifesto Segment V", file: "/audio/sec-5.wav" },
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
      audio.currentTime = 0;
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
      setCurrentTime(audio.currentTime);
    }
  };

  const handlePause = () => {
    setProgress(0);
    setCurrentTime(0);
  };

  return (
    <div 
      className={`group bg-white/5 backdrop-blur-xl border transition-all duration-300 rounded-3xl p-6 hover:translate-y-[-4px] relative overflow-hidden
        ${isPlaying ? 'border-emerald-500/50 shadow-2xl shadow-emerald-500/10' : isQueued ? 'border-emerald-500/20 bg-emerald-900/10' : 'border-white/10 hover:border-white/20'}`}
    >
      {isQueued && !isPlaying && (
        <div className="absolute inset-0 bg-emerald-600/5 pointer-events-none" />
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="text-[0.6rem] font-mono text-emerald-500/60 tracking-widest uppercase">SECTION_0{track.id}</div>
          <div className="flex items-center gap-2">
            {isQueued && !isPlaying && (
              <span className="text-[0.6rem] font-black text-emerald-400/60 uppercase tracking-widest">queued</span>
            )}
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-transparent'}`} />
          </div>
        </div>

        <h3 className={`text-lg font-semibold mb-8 transition-colors duration-300 ${isPlaying ? 'text-emerald-300' : 'group-hover:text-emerald-300'}`}>
          {track.name}
        </h3>

        <div className="space-y-4">
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-100 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <button 
              onClick={onToggle}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all 
                ${isPlaying ? 'bg-emerald-600' : 'bg-white/10 hover:bg-white/20'}`}
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
        onPause={handlePause}
      />
    </div>
  );
};

export default function AudioStory4Page() {
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
        ambientRef.current.currentTime = 0;
        ambientRef.current.play();
        setAmbientPlaying(true);
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

  const handleTrackEnded = (id: number) => {
    if (continuousMode) {
      const currentIndex = tracks.findIndex(t => t.id === id);
      const nextTrack = tracks[currentIndex + 1];
      if (nextTrack) {
        setCurrentTrack(nextTrack.id);
      } else {
        setCurrentTrack(null);
        duckAmbient(false);
        setContinuousMode(false);
      }
    } else {
      setCurrentTrack(null);
      duckAmbient(false);
    }
  };

  const handlePlayAll = () => {
    setContinuousMode(true);
    setCurrentTrack(tracks[0].id);
    if (!ambientPlaying) {
      if (ambientRef.current) {
        ambientRef.current.currentTime = 0;
        ambientRef.current.play();
        setAmbientPlaying(true);
        duckAmbient(true);
      }
    } else {
      duckAmbient(true);
    }
  };

  const handleStop = () => {
    setCurrentTrack(null);
    setContinuousMode(false);
    duckAmbient(false);
  };

  const isRunning = continuousMode && currentTrack !== null;

  return (
    <div className="min-h-screen bg-[#080a0d] text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <nav className="mb-12">
            <a href="/fairgig101.html" className="group flex items-center gap-2 text-xs font-mono text-emerald-500/60 hover:text-emerald-400 transition-colors uppercase tracking-[0.2em]">
                <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" /> Back to Manifesto
            </a>
        </nav>

        <header className="mb-16 space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[0.6rem] font-black uppercase tracking-[0.3em] mb-2">
            Tactical Audio Intel
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-linear-to-br from-white via-slate-200 to-slate-500">
            FairGig Hub IV
          </h1>
          <p className="text-slate-400 font-light text-lg max-w-2xl">
            A comprehensive high-fidelity audio journey through the FairGig narrative ecosystem.
          </p>
        </header>

        {/* Ambient Layer Panel */}
        <section className="mb-6">
          <div className="bg-white/3 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row items-center gap-8">
            <button 
              onClick={toggleAmbient}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg 
                ${ambientPlaying ? 'bg-emerald-600 shadow-emerald-600/20' : 'bg-white/10 hover:bg-white/20'}`}
              title={ambientPlaying ? 'Pause Background' : 'Play Background'}
            >
              {ambientPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white" />}
            </button>
            
            <div className="flex-1 space-y-1">
              <div className="text-[0.7rem] uppercase tracking-widest font-bold text-emerald-500/60">Atmospheric Foundation</div>
              <h2 className="text-xl font-semibold">Strategic Acoustic Layer</h2>
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
                  const val = parseFloat(e.target.value);
                  setAmbientVolume(val);
                  if (ambientRef.current) {
                    ambientRef.current.volume = currentTrack === null ? val : val * 0.3;
                  }
                }}
                className="w-32 accent-emerald-500 h-1 bg-white/10 rounded-full appearance-none"
              />
            </div>
          </div>
        </section>

        {/* Continuous Play Toolbar */}
        <section className="mb-12">
          <div className={`rounded-2xl border px-6 py-4 flex flex-col sm:flex-row items-center gap-4 transition-all duration-500 ${isRunning ? 'bg-emerald-950/20 border-emerald-500/30 shadow-lg shadow-emerald-900/10' : 'bg-white/2 border-white/5'}`}>
            <div className="flex items-center gap-3 flex-1">
              <ListMusic className={`w-5 h-5 ${isRunning ? 'text-emerald-400' : 'text-slate-600'}`} />
              <div>
                <div className={`text-sm font-semibold tracking-wide ${isRunning ? 'text-emerald-300' : 'text-slate-400'}`}>
                  {isRunning
                    ? `MASTER SEQUENCE ACTIVE — ${tracks.find(t => t.id === currentTrack)?.name}`
                    : 'Master Playback Sequence'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isRunning && (
                <>
                  <button
                    onClick={() => {
                      const currentIndex = tracks.findIndex(t => t.id === currentTrack);
                      const next = tracks[currentIndex + 1];
                      if (next) setCurrentTrack(next.id);
                      else handleStop();
                    }}
                    className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-emerald-300 border border-white/10 hover:border-emerald-500/30 px-4 py-2 rounded-xl transition-all"
                  >
                    <SkipForward className="w-3.5 h-3.5" /> SKIP
                  </button>
                  <button
                    onClick={handleStop}
                    className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-red-400 border border-white/10 hover:border-red-500/30 px-4 py-2 rounded-xl transition-all"
                  >
                    STOP
                  </button>
                </>
              )}

              {!isRunning && (
                <button
                  onClick={handlePlayAll}
                  className="flex items-center gap-2 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-500 px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md shadow-emerald-600/20 uppercase tracking-widest"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Initialize Sequence
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
            <div className="flex flex-wrap justify-center gap-4">
                <a href="/audio-story" className="text-slate-500 hover:text-emerald-400 text-[0.6rem] font-mono transition-colors border border-white/5 px-4 py-2 rounded-xl bg-white/5 uppercase tracking-widest">Hub I</a>
                <a href="/audio-story-2" className="text-slate-500 hover:text-emerald-400 text-[0.6rem] font-mono transition-colors border border-white/5 px-4 py-2 rounded-xl bg-white/5 uppercase tracking-widest">Hub II</a>
                <a href="/audio-story-3" className="text-slate-500 hover:text-emerald-400 text-[0.6rem] font-mono transition-colors border border-white/5 px-4 py-2 rounded-xl bg-white/5 uppercase tracking-widest">Hub III</a>
            </div>
            <p className="text-slate-600 text-[0.6rem] font-mono uppercase tracking-[0.2em]">© {new Date().getFullYear()} FairGig Tactical Systems</p>
        </footer>
      </div>

      <audio 
        ref={ambientRef}
        src="/audio/secbackground.mp3"
        loop
      />
    </div>
  );
}
