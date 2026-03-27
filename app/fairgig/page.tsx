"use client";

import React from 'react';
import Link from 'next/link';

const articles = [
  {
    title: "The FairGig Manifesto (v2.0)",
    description: "The End of the 'Pay-to-Play' Era. Cliff Franco's core doctrine on destroying the opaque and exploitative practices of the live music industry.",
    href: "/fairgig1.html",
    icon: "⚖️",
    accent: "from-red-500/20 to-rose-500/20"
  },
  {
    title: "FairGig: The Truth Tax (Legacy)",
    description: "The original manifesto on using transparent math and reputation profiles to expose industry gatekeepers.",
    href: "/fairgig.html",
    icon: "📜",
    accent: "from-green-500/20 to-emerald-500/20"
  },
  {
    title: "FairGig: The Arsenal",
    description: "Interactive tools to break the industry's hold: The Show Economics Simulator, Settlement Ledger, and Reputation Verification system.",
    href: "/fairgig-2.html",
    icon: "🛠️",
    accent: "from-emerald-600/20 to-teal-400/20"
  }
];

export default function FairGigHub() {
  return (
    <main className="min-h-screen bg-[#050505] text-slate-200 font-(family-name:--font-inter)">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-24">
        {/* Navigation */}
        <nav className="mb-12">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-[#00ff66] transition-colors group">
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
            Back to Global Portal
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-20">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#00ff66] text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_10px_rgba(0,255,102,0.1)]">
            Verified Resistance Protocol
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight font-(family-name:--font-oswald) uppercase">
            FairGig: <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00ff66] to-emerald-600 drop-shadow-[0_0_20px_rgba(0,255,102,0.2)]">
              The Truth Tax
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            Arming independent artists with the exact weapon venues have kept hidden for years: Mathematical Proof. Stop guessing, start knowing.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {articles.map((article, idx) => {
            const isManifesto = article.href.includes('fairgig1.html');
            const isLegacy = article.href.includes('fairgig.html');
            const isArsenal = article.href.includes('fairgig-2');
            const isHighlighted = isManifesto || isArsenal;
            
            return (
              <a
                key={idx}
                href={article.href}
                className={`group relative block p-8 rounded-3xl bg-[#0a0a0c]/80 border border-slate-800 transition-all duration-500 overflow-hidden shadow-2xl backdrop-blur-md
                  hover:border-[#00ff66]/50 hover:shadow-[0_0_40px_-10px_rgba(0,255,102,0.2)]
                  ${isHighlighted 
                    ? `lg:col-span-1 border-opacity-40` 
                    : ''
                  }`}
              >
                {isManifesto && (
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-[#ff1e1e] text-white text-[10px] font-black tracking-tighter uppercase shadow-[0_0_15px_rgba(255,30,30,0.5)]">
                    Primary Doctrine
                  </div>
                )}
                {isLegacy && (
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-[10px] font-black tracking-tighter uppercase border border-slate-700">
                    Legacy File
                  </div>
                )}
                {isArsenal && (
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black tracking-tighter uppercase shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                    Interactive Modules
                  </div>
                )}
                
                <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${article.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-4xl">{article.icon}</div>
                    {isHighlighted && <div className={`${isManifesto ? 'text-[#ff1e1e]/60' : 'text-[#00ff66]/60'} font-mono text-xs tracking-widest`}>SEQ: {isManifesto ? 'FG-BASE-01' : 'FG-TOOL-02'}</div>}
                  </div>
                  
                  <h2 className={`font-bold text-white mb-3 group-hover:text-[#00ff66] transition-colors font-(family-name:--font-oswald) uppercase tracking-wide ${isHighlighted ? 'text-4xl leading-tight' : 'text-2xl'} ${isManifesto ? 'group-hover:text-[#ff1e1e]' : ''}`}>
                    {article.title}
                  </h2>
                  <p className={`text-slate-400 leading-relaxed grow ${isHighlighted ? 'text-lg max-w-xl' : 'text-base'}`}>
                    {article.description}
                  </p>
                  
                  <div className={`mt-8 flex items-center text-sm font-bold uppercase tracking-widest font-mono transition-colors ${isManifesto ? 'text-[#ff1e1e] group-hover:text-red-400' : 'text-[#00ff66] group-hover:text-emerald-400'}`}>
                    {isHighlighted ? 'INITIALIZE PROTOCOL' : 'ACCESS FILE'}
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
