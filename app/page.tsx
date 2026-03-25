"use client";

import React from 'react';

const hubs = [
  {
    title: "Energy & Economic Shockwaves",
    description: "Tracking global energy disruptions, maritime risks, and macroeconomic volatility.",
    href: "/energy-economics",
    icon: "⚡",
    color: "from-amber-600 to-orange-600",
    border: "hover:border-amber-500/50",
    shadow: "hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.2)]"
  },
  {
    title: "Geopolitical Diplomacy & Alliance Leverage",
    description: "Strategic analysis of Indo-Pacific posturing and global alliance shifts.",
    href: "/geopolitical-diplomacy",
    icon: "🌍",
    color: "from-rose-600 to-red-700",
    border: "hover:border-rose-500/50",
    shadow: "hover:shadow-[0_0_40px_-10px_rgba(225,29,72,0.2)]"
  },
  {
    title: "Asymmetric Warfare & Tactical Risks",
    description: "Analysis of non-conventional threats, swarm tactics, and naval vulnerabilities.",
    href: "/asymmetric-threats",
    icon: "📡",
    color: "from-cyan-600 to-blue-700",
    border: "hover:border-cyan-500/50",
    shadow: "hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.2)]"
  },
  {
    title: "Executive Intelligence & Strategy",
    description: "C-Suite analysis of systemic risks, high-level countermeasures, and strategic alignment.",
    href: "/executive-brief",
    icon: "📋",
    color: "from-red-600 to-rose-700",
    border: "hover:border-red-500/50",
    shadow: "hover:shadow-[0_0_40px_-10px_rgba(239,68,68,0.2)]"
  },
  {
    title: "AI Consulting & Autonomous Enterprise",
    description: "Investigation into 2026 enterprise buyer behavior, procurement evolution, and scaled autonomous transformation.",
    href: "/ai-consulting",
    icon: "🤖",
    color: "from-cyan-600 to-blue-700",
    border: "hover:border-cyan-500/50",
    shadow: "hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.2)]"
  },
  {
    title: "The QUANTEON System",
    description: "Autonomous revenue performance integrations performing operational surgery to buy your life back.",
    href: "/quanteon",
    icon: "⟁",
    color: "from-red-600 to-rose-700",
    border: "hover:border-red-500/50",
    shadow: "hover:shadow-[0_0_40px_-10px_rgba(225,29,72,0.2)]"
  },
  {
    title: "FairGig: The Truth Tax",
    description: "Exposing the lie of the live music industry with break-even simulators, transparent ledgers, and venue reputation profiles.",
    href: "/fairgig",
    icon: "⚖️",
    color: "from-emerald-600 to-green-700",
    border: "hover:border-emerald-500/50",
    shadow: "hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.2)]"
  },
  {
    title: "Listen & Fix",
    description: "Shazam for broken machines. An AI-powered diagnostic platform ending the monopoly on technical knowledge.",
    href: "/listen-and-fix",
    icon: "🔧",
    color: "from-red-600 to-orange-600",
    border: "hover:border-red-500/50",
    shadow: "hover:shadow-[0_0_40px_-10px_rgba(255,51,51,0.2)]"
  }
];

export default function Portal() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-(family-name:--font-inter)">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-slate-900/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        <header className="text-center mb-24">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-bold tracking-[0.2em] uppercase mb-8">
            Strategic Intelligence Portal
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-8">
            Global <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-slate-500">Perspectives</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Select a strategic domain to explore correlated intelligence reports, transition assessments, and geopolitical analysis.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {hubs.map((hub, idx) => (
            <a
              key={idx}
              href={hub.href}
              className={`group relative p-10 rounded-[2.5rem] bg-slate-900/40 border border-slate-800 ${hub.border} transition-all duration-500 ${hub.shadow}`}
            >
              <div className={`absolute inset-0 rounded-[2.5rem] bg-linear-to-br ${hub.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-500">{hub.icon}</div>
                <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-white transition-colors">
                  {hub.title}
                </h2>
                <p className="text-slate-400 leading-relaxed mb-10 text-lg">
                  {hub.description}
                </p>
                
                <div className="flex items-center text-sm font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
                  Enter Domain
                  <span className="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <footer className="mt-32 text-center">
          <div className="h-px w-24 bg-linear-to-r from-transparent via-slate-700 to-transparent mx-auto mb-8" />
          <p className="text-slate-600 font-mono text-xs tracking-widest uppercase">
            System Identity: Antigravity-Core // Verified 2026
          </p>
        </footer>
      </div>
    </main>
  );
}
