"use client";

import React from 'react';
import Link from 'next/link';

const articles = [
  {
    title: "The QUANTEON Manifesto",
    description: "The core doctrine for rescuing the modern founder. End the busywork, automate the machine, and buy your life back.",
    href: "/quanteon.html",
    icon: "⟁",
    accent: "from-red-500/20 to-rose-500/20"
  },
  {
    title: "The QUANTEON System & RPIs",
    description: "Explore the unified algorithmic architecture and the five core Revenue Performance Integrations designed for operational surgery.",
    href: "/quanteon-2.html",
    icon: "⚙️",
    accent: "from-cyan-600/20 to-blue-400/20"
  }
];

export default function QuanteonHub() {
  return (
    <main className="min-h-screen bg-[#0a0a0c] text-slate-200 font-(family-name:--font-inter)">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-24">
        {/* Navigation */}
        <nav className="mb-12">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors group">
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform text-[#ff3300]">←</span>
            Back to Global Portal
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-20">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[#ff3300] text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_10px_rgba(255,51,0,0.1)]">
            Extraction Directive Active
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight font-(family-name:--font-space-grotesk) uppercase">
            The QUANTEON <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ff3300] to-rose-600 drop-shadow-[0_0_20px_rgba(255,51,0,0.2)]">
              Architecture
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            We don&apos;t care about AI as a buzzword. We care about one thing: Rescuing your human potential. The machine can do the heavy lifting. It&apos;s time for you to live.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {articles.map((article, idx) => {
            const isManifesto = article.href.includes('quanteon.html');
            const isSystem = article.href.includes('quanteon-2');
            const isHighlighted = isManifesto || isSystem;
            
            return (
              <a
                key={idx}
                href={article.href}
                className={`group relative block p-8 rounded-3xl bg-[#0a0a0c]/80 border border-slate-800 transition-all duration-500 overflow-hidden shadow-2xl backdrop-blur-md
                  hover:shadow-[0_0_40px_-10px_rgba(255,51,0,0.15)]
                  ${isManifesto ? 'hover:border-[#ff3300]/50' : 'hover:border-[#00f0ff]/50 hover:shadow-[0_0_40px_-10px_rgba(0,240,255,0.15)]'}
                  ${isHighlighted 
                    ? `lg:col-span-1 border-opacity-40` 
                    : ''
                  }`}
              >
                {isManifesto && (
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-[#ff3300] text-white text-[10px] font-black tracking-tighter uppercase shadow-[0_0_15px_rgba(255,51,0,0.5)]">
                    Core Intervention
                  </div>
                )}
                {isSystem && (
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-[#00f0ff] text-slate-950 text-[10px] font-black tracking-tighter uppercase shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                    System Blueprint
                  </div>
                )}
                
                <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${article.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-4xl">{article.icon}</div>
                    {isHighlighted && <div className={`${isManifesto ? 'text-[#ff3300]/60' : 'text-[#00f0ff]/60'} font-mono text-xs tracking-widest`}>OP: {isManifesto ? 'QNT-INIT-00' : 'QNT-SYS-01'}</div>}
                  </div>
                  
                  <h2 className={`font-bold text-white mb-3 transition-colors font-(family-name:--font-space-grotesk) uppercase tracking-wide ${isHighlighted ? 'text-4xl leading-tight' : 'text-2xl'} ${isManifesto ? 'group-hover:text-[#ff3300]' : 'group-hover:text-[#00f0ff]'}`}>
                    {article.title}
                  </h2>
                  <p className={`text-slate-400 leading-relaxed grow ${isHighlighted ? 'text-lg max-w-xl font-light' : 'text-base'}`}>
                    {article.description}
                  </p>
                  
                  <div className={`mt-8 flex items-center text-sm font-bold uppercase tracking-widest font-mono transition-colors ${isManifesto ? 'text-[#ff3300] group-hover:text-red-400' : 'text-[#00f0ff] group-hover:text-cyan-400'}`}>
                    {isHighlighted ? 'INITIATE EXTRACTION' : 'VIEW DOCUMENT'}
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
