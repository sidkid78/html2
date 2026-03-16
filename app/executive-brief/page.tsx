"use client";

import React from 'react';
import Link from 'next/link';

const articles = [
  {
    title: "Strategic Executive Brief",
    description: "C-level synthesis of global instability, supply chain vulnerabilities, and strategic countermeasures for 2024-2025.",
    href: "/executive-brief.html",
    icon: "📋",
    accent: "from-red-600/30 to-rose-600/30",
    isPrimary: true
  }
];

export default function ExecutiveHub() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-(family-name:--font-inter)">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-24">
        {/* Navigation */}
        <nav className="mb-12">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-red-400 transition-colors group">
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
            Back to Global Portal
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-20">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold tracking-widest uppercase mb-6">
            Executive Intelligence Hub
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
            Strategic <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-rose-600">
              Briefings
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            High-impact syntheses tailored for decisive action. Core intelligence for leadership and strategic alignment.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8">
          {articles.map((article, idx) => (
            <a
              key={idx}
              href={article.href}
              className={`group relative block p-12 rounded-[2.5rem] bg-slate-900/40 border transition-all duration-500 overflow-hidden shadow-2xl
                ${article.isPrimary 
                  ? 'border-red-500/40 bg-linear-to-br from-slate-900 via-slate-900 to-red-950/20' 
                  : 'border-slate-800 hover:border-red-500/50'
                }`}
            >
              {article.isPrimary && (
                <div className="absolute top-8 right-8 z-20 px-4 py-1.5 rounded-full bg-red-500 text-white text-[10px] font-black tracking-widest uppercase shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse">
                  Priority Analysis
                </div>
              )}
              
              <div className={`absolute inset-0 rounded-[2.5rem] bg-linear-to-br ${article.accent} ${article.isPrimary ? 'opacity-40' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 h-full flex flex-col md:flex-row md:items-center gap-10">
                <div className="shrink-0">
                  <div className="w-24 h-24 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    {article.icon}
                  </div>
                </div>
                
                <div className="grow">
                  <div className="text-red-500/50 font-mono text-xs mb-4">REF: EXEC-STRAT-2024</div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors leading-tight">
                    {article.title}
                  </h2>
                  <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-3xl">
                    {article.description}
                  </p>
                  
                  <div className="mt-8 flex items-center text-sm font-bold text-red-500 group-hover:text-red-400 transition-colors tracking-widest">
                    INITIALIZE EXECUTIVE PROTOCOL
                    <span className="ml-3 transform group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
