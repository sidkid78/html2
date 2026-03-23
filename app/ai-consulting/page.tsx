"use client";

import React from 'react';
import Link from 'next/link';

const articles = [
  {
    title: "2026 Enterprise AI Domain Report",
    description: "Investigation into 2026 enterprise buyer behavior, procurement evolution, and scaled autonomous transformation.",
    href: "/consulting-1.html",
    icon: "🤖",
    accent: "from-cyan-500/20 to-blue-500/20"
  },
  {
    title: "2026 AI Consulting Strategic Blueprint",
    description: "Executive-level synthesis of strategic insights, market bifurcation, and prioritized next steps.",
    href: "/executive.html",
    icon: "📑",
    accent: "from-blue-600/20 to-cyan-400/20"
  },
  {
    title: "2026 AI Consulting Competitive Landscape",
    description: "Mapping market sizing, key player archetypes, and the shift toward outcome-based pricing models.",
    href: "/consulting-2.html",
    icon: "📊",
    accent: "from-emerald-500/20 to-teal-500/20"
  },
  {
    title: "Technological and Operational Evolution",
    description: "Analyzing the transition from single-model pilot wrappers to scaled multi-agent autonomous orchestration.",
    href: "/consulting-3.html",
    icon: "⚙️",
    accent: "from-purple-500/20 to-indigo-500/20"
  }
];

export default function AIConsultingHub() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-(family-name:--font-inter)">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-24">
        {/* Navigation */}
        <nav className="mb-12">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors group">
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
            Back to Global Portal
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-20">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-xs font-bold tracking-widest uppercase mb-6">
            Strategic Intelligence Hub
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
            AI Consulting & <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
              Autonomous Enterprise
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            A comprehensive hub for tracking the evolution of enterprise AI procurement, corporate governance, and the shift toward scaled autonomous operations.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, idx) => {
            const isDomainReport = article.href.includes('consulting-1');
            const isExecutive = article.href.includes('executive');
            const isHighlighted = isDomainReport || isExecutive;
            
            return (
              <a
                key={idx}
                href={article.href}
                className={`group relative block p-8 rounded-3xl bg-slate-900/40 border border-slate-800 transition-all duration-500 overflow-hidden shadow-2xl
                  ${isHighlighted 
                    ? `lg:col-span-2 border-cyan-500/40 bg-linear-to-br from-slate-900 via-slate-900 to-${isExecutive ? 'blue' : 'cyan'}-950/30` 
                    : 'hover:border-cyan-500/50 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.2)]'
                  }`}
              >
                {isDomainReport && (
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black tracking-tighter uppercase animate-pulse">
                    Master Synthesis
                  </div>
                )}
                {isExecutive && (
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-blue-500 text-slate-950 text-[10px] font-black tracking-tighter uppercase">
                    Strategic Briefing
                  </div>
                )}
                
                <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${article.accent} ${isHighlighted ? 'opacity-40' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-4xl">{article.icon}</div>
                    {isHighlighted && <div className="text-cyan-500/50 font-mono text-xs">REF: {isExecutive ? 'EB-AI-2026' : 'DR-AI-001'}</div>}
                  </div>
                  
                  <h2 className={`font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors ${isHighlighted ? 'text-4xl leading-tight' : 'text-2xl'}`}>
                    {article.title}
                  </h2>
                  <p className={`text-slate-400 leading-relaxed grow ${isHighlighted ? 'text-lg max-w-2xl' : 'text-base'}`}>
                    {article.description}
                  </p>
                  
                  <div className="mt-8 flex items-center text-sm font-bold text-cyan-500 group-hover:text-cyan-400 transition-colors">
                    {isHighlighted ? 'INITIALIZE FULL ANALYSIS' : 'READ REPORT'}
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </main>
  );
}
