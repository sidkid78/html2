'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Flame, ListMusic, SkipForward } from 'lucide-react';

const tracks = [
  { id: 6, name: "Segment VI", file: "/audio/download (6).wav" },
  { id: 7, name: "Segment VII", file: "/audio/download (7).wav" },
  { id: 8, name: "Segment VIII", file: "/audio/download (8).wav" },
  { id: 9, name: "Segment IX", file: "/audio/download (9).wav" },
  { id: 10, name: "Segment X", file: "/audio/download (10).wav" },
];

// Segment IX (id: 9) is excluded from the continuous play queue
const continuousQueue = tracks.filter(t => t.id !== 9);

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

const TrackCard = ({ track, isPlaying, isQueued, isExcluded, onToggle, onEnded }: { 
  track: any, 
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
      setProgress(0);
      setCurrentTime(0);
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

  return (
    <div 
      className={`group relative bg-stone-900/30 backdrop-blur-xl border transition-all duration-500 rounded-3xl p-6 hover:translate-y-[-4px] overflow-hidden
        ${isPlaying
          ? 'border-amber-500/50 shadow-2xl shadow-amber-900/20 bg-stone-900/60'
          : isQueued
            ? 'border-amber-500/20 bg-amber-950/10'
            : 'border-stone-800 hover:border-stone-700'}`}
    >
      {isPlaying && (
        <div className="absolute inset-0 bg-amber-500/5 pointer-events-none blur-3xl animate-pulse"></div>
      )}
      {isQueued && !isPlaying && (
        <div className="absolute inset-0 bg-amber-600/5 pointer-events-none" />
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="text-[0.6rem] font-black text-stone-600 tracking-tighter uppercase font-mono">TRACKSET_SECTION_B</div>
          <div className="flex items-center gap-2">
            {isExcluded && (
              <span className="text-[0.6rem] font-black text-stone-600/50 uppercase tracking-widest border border-stone-700/40 px-1.5 py-0.5 rounded-md">manual only</span>
            )}
            {isQueued && !isPlaying && (
              <span className="text-[0.6rem] font-black text-amber-500/60 uppercase tracking-widest">queued</span>
            )}
            <div className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-amber-500 ring-4 ring-amber-500/20' : 'bg-transparent'}`} />
          </div>
        </div>

        <h3 className={`text-lg font-bold mb-8 transition-colors duration-300 ${isPlaying ? 'text-amber-400' : 'group-hover:text-amber-400'}`}>
          {track.name}
        </h3>

        <div className="space-y-4">
          <div className="h-1 w-full bg-stone-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-amber-600 to-amber-400 transition-all duration-100 ease-linear rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <button 
              onClick={onToggle}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 transform
                ${isPlaying ? 'bg-amber-600 rotate-0' : 'bg-stone-800 hover:bg-stone-700 rotate-[-8deg] hover:rotate-0'}`}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-white text-white" /> : <Play className="w-5 h-5 ml-1 text-stone-400 group-hover:text-amber-500 transition-colors" />}
            </button>
            <div className="text-[0.65rem] text-stone-600 font-mono font-bold tracking-widest bg-stone-950/50 py-1 px-2 rounded-md">
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

export default function AudioStoryHub2Page() {
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
      } else {
        ambientRef.current.play();
      }
      setAmbientPlaying(!ambientPlaying);
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

  // Advance through continuousQueue (excludes Segment IX)
  const handleTrackEnded = (id: number) => {
    if (continuousMode) {
      const currentIndex = continuousQueue.findIndex(t => t.id === id);
      const next = continuousQueue[currentIndex + 1];
      if (next) {
        setCurrentTrack(next.id);
      } else {
        // All queued segments done
        setCurrentTrack(null);
        duckAmbient(false);
        setContinuousMode(false);
      }
    } else {
      setCurrentTrack(null);
      duckAmbient(false);
    }
  };

  // Play All — starts ambient + queued segments (skips Segment IX)
  const handlePlayAll = () => {
    if (ambientRef.current && !ambientPlaying) {
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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-100 font-sans selection:bg-amber-600 selection:text-white">
      {/* Cinematic Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-stone-900/40 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-950/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-amber-950/10 rounded-full blur-[160px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <header className="text-center mb-16 space-y-4">
          <div className="flex justify-center mb-4">
            <div className="bg-amber-600/10 text-amber-500 px-4 py-1 rounded-full text-xs font-bold tracking-widest border border-amber-500/20 flex items-center gap-2">
              <Flame className="w-3 h-3" /> CINEMATIC HUB II
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-br from-stone-100 via-stone-400 to-stone-600">
            Audio Story Hub II
          </h1>
          <p className="text-stone-500 font-light text-lg max-w-2xl mx-auto italic">
            &quot;Weary Ambient to Cinematic Rock&quot; &mdash; The second chapter in the high-fidelity soundscape exploration.
          </p>
        </header>

        {/* Ambient Layer Panel */}
        <section className="mb-6">
          <div className="bg-stone-900/40 backdrop-blur-3xl border border-stone-800 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row items-center gap-8 ring-1 ring-white/5">
            <button 
              onClick={toggleAmbient}
              className="w-16 h-16 rounded-full bg-amber-600 hover:bg-amber-500 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg shadow-amber-600/30"
              title={ambientPlaying ? 'Pause Ambient' : 'Play Ambient'}
            >
              {ambientPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
            </button>
            
            <div className="flex-1 space-y-1 text-center md:text-left">
              <div className="text-[0.7rem] uppercase tracking-widest font-black text-amber-500/80">Foundation Track</div>
              <h2 className="text-xl font-bold text-stone-200">Weary Ambient To Cinematic Rock</h2>
            </div>

            <div className="flex items-center gap-4 bg-stone-950/50 py-3 px-6 rounded-2xl border border-stone-800">
              <Volume2 className="w-5 h-5 text-stone-500" />
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
                className="w-32 accent-amber-500 h-1 bg-stone-800 rounded-full appearance-none"
              />
            </div>
          </div>
        </section>

        {/* Continuous Play Toolbar */}
        <section className="mb-12">
          <div className={`rounded-2xl border px-6 py-4 flex flex-col sm:flex-row items-center gap-4 transition-all duration-500 ${isRunning ? 'bg-amber-950/30 border-amber-500/30 shadow-lg shadow-amber-900/20' : 'bg-stone-900/20 border-stone-800'}`}>
            <div className="flex items-center gap-3 flex-1">
              <ListMusic className={`w-5 h-5 ${isRunning ? 'text-amber-400' : 'text-stone-600'}`} />
              <div>
                <div className={`text-sm font-semibold ${isRunning ? 'text-amber-300' : 'text-stone-400'}`}>
                  {isRunning
                    ? `Playing continuously — now on ${tracks.find(t => t.id === currentTrack)?.name}`
                    : 'Continuous Play'}
                </div>
                <div className="text-xs text-stone-600 mt-0.5">
                  Plays VI → VII → VIII → X with background music (Segment IX available manually)
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
                    className="flex items-center gap-1.5 text-xs font-semibold text-stone-400 hover:text-amber-300 border border-stone-700 hover:border-amber-500/30 px-3 py-2 rounded-xl transition-all"
                    title="Skip to next segment"
                  >
                    <SkipForward className="w-3.5 h-3.5" /> Skip
                  </button>
                  <button
                    onClick={handleStop}
                    className="flex items-center gap-1.5 text-xs font-semibold text-stone-400 hover:text-red-400 border border-stone-700 hover:border-red-500/30 px-3 py-2 rounded-xl transition-all"
                    title="Stop continuous play"
                  >
                    Stop
                  </button>
                </>
              )}

              {!isRunning && (
                <button
                  onClick={handlePlayAll}
                  className="flex items-center gap-2 text-sm font-bold text-white bg-amber-600 hover:bg-amber-500 px-5 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md shadow-amber-600/30"
                  title="Play all segments (except IX) with background music"
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
              isQueued={continuousMode && currentTrack !== null && continuousQueue.some(t => t.id === track.id) && track.id > (currentTrack ?? 0)}
              isExcluded={track.id === 9}
              onToggle={() => handleToggleTrack(track.id)}
              onEnded={() => handleTrackEnded(track.id)}
            />
          ))}
        </section>

        <footer className="mt-24 text-center border-t border-stone-800/50 pt-12 pb-8 flex flex-col items-center gap-6">
            <div className="flex gap-4">
                <a href="/audio-story" className="text-stone-500 hover:text-indigo-400 text-xs transition-colors border border-stone-800 px-4 py-2 rounded-xl bg-stone-900/50">← Switch to Hub I (Modern Anxiety)</a>
            </div>
            <p className="text-stone-700 text-[0.7rem] font-mono tracking-widest uppercase font-bold">© {new Date().getFullYear()} Cinematic Foundation • Hub II Deploy Ready</p>
        </footer>
      </div>

      <audio 
        ref={ambientRef}
        src="/audio/background.mp3"
      />
    </div>
  );
}
