"use client";

import React from 'react';
import Link from 'next/link';

const articles = [
  {
    title: "Listen & Fix: The Mission",
    description: "Shazam for broken machines. An AI-powered diagnostic and repair platform ending the monopoly on technical knowledge.",
    href: "/listen-&-fix.html",
    icon: "🔧",
    accent: "from-red-500/20 to-orange-500/20"
  }
];

export default function ListenAndFixHub() {
  return (
    <main className="min-h-screen bg-[#050505] text-slate-200 font-(family-name:--font-inter)">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-24">
        {/* Navigation */}
        <nav className="mb-12">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-[#ff3333] transition-colors group">
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
            Back to Global Portal
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-20">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[#ff3333] text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_10px_rgba(255,51,51,0.1)]">
            A Right-To-Repair Revolution
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight font-(family-name:--font-space-grotesk) uppercase">
            Listen & <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ff3333] to-orange-500 drop-shadow-[0_0_20px_rgba(255,51,51,0.2)]">
              Fix
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            We are tearing down the walls of technical gatekeeping. If you bought it, you should be able to fix it. Turn intimidated consumers into empowered owners, one broken machine at a time.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-4xl">
          {articles.map((article, idx) => {
            return (
              <a
                key={idx}
                href={article.href}
                className="group relative block p-8 md:p-12 rounded-[2.5rem] bg-[#0a0a0c]/80 border border-slate-800 transition-all duration-500 overflow-hidden shadow-2xl backdrop-blur-md hover:border-[#ff3333]/50 hover:shadow-[0_0_50px_-10px_rgba(255,51,51,0.2)]"
              >
                <div className="absolute top-6 right-6 z-20 px-4 py-1.5 rounded-full bg-[#ff3333] text-white text-xs font-black tracking-widest uppercase shadow-[0_0_20px_rgba(255,51,51,0.5)]">
                  Diagnostic App
                </div>
                
                <div className={`absolute inset-0 rounded-[2.5rem] bg-linear-to-br ${article.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 h-full flex flex-col items-start">
                  <div className="flex items-center justify-between w-full mb-8">
                    <div className="text-6xl group-hover:scale-110 transition-transform duration-500">{article.icon}</div>
                    <div className="text-[#ff3333]/60 font-mono text-sm tracking-widest">APP: L&F-01</div>
                  </div>
                  
                  <h2 className="font-bold text-white mb-4 group-hover:text-[#ff3333] transition-colors font-(family-name:--font-space-grotesk) uppercase tracking-wide text-4xl md:text-5xl leading-tight">
                    {article.title}
                  </h2>
                  <p className="text-slate-400 leading-relaxed max-w-2xl text-lg md:text-xl font-light">
                    {article.description}
                  </p>
                  
                  <div className="mt-10 flex items-center text-sm font-bold text-[#ff3333] group-hover:text-orange-400 transition-colors uppercase tracking-widest font-mono">
                    INITIALIZE SHAZAM FOR MACHINES
                    <span className="ml-3 transform group-hover:translate-x-2 transition-transform text-lg">→</span>
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
