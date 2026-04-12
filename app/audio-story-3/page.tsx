'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, ShieldCheck, ListMusic, SkipForward, Wrench } from 'lucide-react';

const tracks = [
  { id: 11, name: "Diagnosis Phase", file: "/audio/landf.wav" },
  { id: 12, name: "Guidance Protocol", file: "/audio/landf1.wav" },
  { id: 13, name: "Resolution Cycle", file: "/audio/landf3.wav" },
  { id: 14, name: "Complete Sequence", file: "/audio/landf4.wav" }, // Master track
];

// Continuous progression only for segments
const continuousQueue = tracks.filter(t => t.id !== 14);

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

const TrackCard = ({ track, isPlaying, isQueued, isExcluded, onToggle, onEnded }: { 
  track: { id: number; name: string; file: string }, 
  isPlaying: boolean,
  isQueued: boolean,
  isExcluded: boolean,
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
      // Reset handled by onPause event to avoid synchronous setState in effect
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
      className={`group relative bg-cyan-950/20 backdrop-blur-2xl border transition-all duration-500 rounded-3xl p-6 hover:translate-y-[-4px] overflow-hidden
        ${isPlaying
          ? 'border-cyan-500/50 shadow-2xl shadow-cyan-900/20 bg-cyan-900/40'
          : isQueued
            ? 'border-cyan-500/20 bg-cyan-950/10'
            : 'border-white/5 hover:border-white/10'}`}
    >
      {isPlaying && (
        <div className="absolute inset-0 bg-cyan-500/5 pointer-events-none blur-3xl animate-pulse"></div>
      )}
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="text-[0.6rem] font-black text-cyan-600/60 tracking-widest uppercase font-mono">FOREMAN_LOG_LF</div>
          <div className="flex items-center gap-2">
            {isExcluded && (
              <span className="text-[0.6rem] font-bold text-slate-500 uppercase tracking-widest border border-white/5 px-2 py-0.5 rounded-full">Manual</span>
            )}
            {isQueued && !isPlaying && (
              <span className="text-[0.6rem] font-bold text-cyan-500/60 uppercase tracking-widest">In Queue</span>
            )}
            <div className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-transparent'}`} />
          </div>
        </div>

        <h3 className={`text-lg font-semibold mb-8 transition-colors duration-300 ${isPlaying ? 'text-white' : 'group-hover:text-cyan-300'}`}>
          {track.name}
        </h3>

        <div className="space-y-4">
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-cyan-600 to-emerald-400 transition-all duration-100 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <button 
              onClick={onToggle}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform
                ${isPlaying ? 'bg-cyan-600 scale-105 shadow-xl shadow-cyan-600/20' : 'bg-white/5 hover:bg-white/10'}`}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-white text-white" /> : <Play className="w-5 h-5 ml-1 text-cyan-500" />}
            </button>
            <div className="text-[0.65rem] text-cyan-600/80 font-mono font-bold tracking-widest bg-cyan-950/40 py-1.5 px-3 rounded-full border border-cyan-900/20">
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

export default function AudioStoryHub3Page() {
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const [ambientVolume, setAmbientVolume] = useState(0.5);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [continuousMode, setContinuousMode] = useState(false);
  const [highlightContinuous, setHighlightContinuous] = useState(false);

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
      const currentIndex = continuousQueue.findIndex(t => t.id === id);
      const next = continuousQueue[currentIndex + 1];
      if (next) {
        setCurrentTrack(next.id);
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
    if (ambientRef.current && !ambientPlaying) {
      ambientRef.current.currentTime = 0;
      ambientRef.current.play();
      setAmbientPlaying(true);
    }
    setContinuousMode(true);
    setCurrentTrack(continuousQueue[0].id);
    duckAmbient(true);
  };

  const handleStop = () => {
    setCurrentTrack(null);
    setContinuousMode(false);
    duckAmbient(false);
  };

  const isRunning = continuousMode && currentTrack !== null;

  // Auto-start continuous play if ?autoplay=1 is in the URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autoplay') === '1') {
      setHighlightContinuous(true);
      handlePlayAll();
      setTimeout(() => setHighlightContinuous(false), 2000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#05080a] text-slate-100 font-sans selection:bg-cyan-600 selection:text-white">
      {/* HUD-style Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-900/10 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-950/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#22d3ee 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <header className="text-center mb-16 space-y-4">
          <div className="flex justify-center mb-6">
            <div className="bg-cyan-500/10 text-cyan-400 px-5 py-1.5 rounded-full text-xs font-black tracking-[0.2em] border border-cyan-500/20 flex items-center gap-2 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" /> SYSTEM_CALIBRATED
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            Listen & Fix <span className="text-cyan-500">Hub III</span>
          </h1>
          <p className="text-slate-500 font-light text-xl max-w-2xl mx-auto">
            The Digital Foreman Protocol &mdash; Advanced mechanical diagnostic narrative and guided resolution tracks.
          </p>
        </header>

        {/* Diagnostic Foundation Panel */}
        <section className="mb-8">
          <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row items-center gap-8 ring-1 ring-white/5">
            <button 
              onClick={toggleAmbient}
              className="w-20 h-20 rounded-2xl bg-cyan-600 hover:bg-cyan-500 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-xl shadow-cyan-600/30 shrink-0"
              title={ambientPlaying ? 'Pause Atmosphere' : 'Play Atmosphere'}
            >
              {ambientPlaying ? <Pause className="w-8 h-8 fill-white text-white" /> : <Play className="w-8 h-8 fill-white ml-1 text-white" />}
            </button>
            
            <div className="flex-1 space-y-2 text-center md:text-left">
              <div className="text-[0.7rem] uppercase tracking-[0.3em] font-black text-cyan-500/60 font-mono">Atmospheric Protocol</div>
              <h2 className="text-2xl font-bold text-slate-200 uppercase tracking-tight">Industrial Foundation Layer</h2>
              <div className="flex items-center gap-4 mt-4 justify-center md:justify-start">
                  <div className={`text-[0.6rem] font-bold px-2 py-0.5 rounded-sm ${ambientPlaying ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-500'} font-mono transition-colors`}>
                      {ambientPlaying ? 'ACTIVE' : 'STANDBY'}
                  </div>
              </div>
            </div>

            <div className="flex items-center gap-5 bg-black/40 py-4 px-8 rounded-2xl border border-white/5">
              <Volume2 className="w-5 h-5 text-cyan-600" />
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={ambientVolume}
                title="Atmosphere Volume"
                onChange={(e) => {
                  setAmbientVolume(parseFloat(e.target.value));
                  if (ambientRef.current && currentTrack === null) {
                    ambientRef.current.volume = parseFloat(e.target.value);
                  }
                }}
                className="w-32 accent-cyan-500 h-1 bg-slate-800 rounded-full appearance-none"
              />
            </div>
          </div>
        </section>

        {/* Sequence Control Toolbar */}
        <section className={`mb-12 ${highlightContinuous ? 'ring-2 ring-cyan-500/40 rounded-2xl' : ''}`}>
          <div className={`rounded-2xl border px-8 py-5 flex flex-col sm:flex-row items-center gap-6 transition-all duration-500 ${isRunning ? 'bg-cyan-950/20 border-cyan-500/30' : 'bg-white/[0.01] border-white/5'}`}>
            <div className="flex items-center gap-4 flex-1">
              <ListMusic className={`w-6 h-6 ${isRunning ? 'text-cyan-400' : 'text-slate-700'}`} />
              <div>
                <div className={`text-base font-bold ${isRunning ? 'text-white' : 'text-slate-500'} uppercase tracking-tight`}>
                  {isRunning
                    ? `System Sequence Running: ${tracks.find(t => t.id === currentTrack)?.name}`
                    : 'Master Sequence Toggle'}
                </div>
                <div className="text-xs text-slate-600 mt-1 font-mono uppercase tracking-widest">
                  Auto-advances through the full Foreman narrative (Segments XI-XIII)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isRunning && (
                <>
                  <button
                    onClick={() => {
                      const idx = continuousQueue.findIndex(t => t.id === currentTrack);
                      const next = continuousQueue[idx + 1];
                      if (next) setCurrentTrack(next.id);
                      else handleStop();
                    }}
                    className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-white border border-cyan-900/40 hover:border-cyan-500 px-4 py-2.5 rounded-xl transition-all font-mono"
                  >
                    <SkipForward className="w-4 h-4" /> NEXT_PHASE
                  </button>
                  <button
                    onClick={handleStop}
                    className="text-xs font-bold text-rose-500 hover:text-white border border-rose-900/20 hover:border-rose-500 px-4 py-2.5 rounded-xl transition-all font-mono"
                  >
                    TERMINATE
                  </button>
                </>
              )}

              {!isRunning && (
                <button
                  onClick={handlePlayAll}
                  className="flex items-center gap-3 text-sm font-black text-black bg-cyan-400 hover:bg-white px-8 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-cyan-400/10 uppercase tracking-widest"
                >
                  <Play className="w-4 h-4 fill-black" />
                  Initiate Fix
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Narrative Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((track) => (
            <TrackCard 
              key={track.id}
              track={track}
              isPlaying={currentTrack === track.id}
              isQueued={continuousMode && currentTrack !== null && continuousQueue.some(t => t.id === track.id) && track.id > (currentTrack ?? 0)}
              isExcluded={track.id === 14}
              onToggle={() => handleToggleTrack(track.id)}
              onEnded={() => handleTrackEnded(track.id)}
            />
          ))}
        </section>

        <footer className="mt-24 text-center border-t border-white/5 pt-12 pb-12 flex flex-col items-center gap-10">
            <div className="flex flex-wrap justify-center gap-4">
                <a href="/audio-story" className="text-slate-500 hover:text-indigo-400 text-xs transition-colors border border-white/5 px-6 py-3 rounded-2xl bg-white/[0.02]">HUB I: Modern Anxiety</a>
                <a href="/audio-story-2" className="text-slate-500 hover:text-amber-500 text-xs transition-colors border border-white/5 px-6 py-3 rounded-2xl bg-white/[0.02]">HUB II: Cinematic Foundation</a>
            </div>
            <div className="flex flex-col items-center gap-4">
                <Wrench className="w-6 h-6 text-cyan-900" />
                <p className="text-slate-700 text-[0.65rem] font-mono tracking-[0.5em] uppercase font-black">© {new Date().getFullYear()} LISTEN & FIX • REPAIR_PROTOCOL_V3</p>
            </div>
        </footer>
      </div>

      <audio 
        ref={ambientRef}
        src="/audio/landfbackground.mp3"
        loop
      />
    </div>
  );
}
