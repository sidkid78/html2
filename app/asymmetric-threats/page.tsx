"use client";

import React from 'react';
import Link from 'next/link';

const articles = [
  {
    title: "Asymmetric Threat & Tactical Vulnerability",
    description: "Assessment of Iranian asymmetric capabilities, swarm tactics, and US naval vulnerabilities in restricted waterways.",
    href: "/asymmetric-threat-and-tactical-vulnerabilities.html",
    icon: "📡",
    accent: "from-cyan-500/20 to-blue-500/20"
  },
  {
    title: "Strategic Escalation Briefing",
    description: "Evaluation of kinetic trigger points, proxy actions, and conflict expansion from regional straits to the Indian Ocean.",
    href: "/escalation-risk.html",
    icon: "⚠️",
    accent: "from-red-500/20 to-orange-500/20"
  }
];

export default function AsymmetricHub() {
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
            Asymmetric Intelligence Hub
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
            Tactical <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
              Vulnerabilities
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            Specialized analysis of non-conventional threats, swarm doctrine, and systemic weaknesses in high-end naval architecture.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <a
              key={idx}
              href={article.href}
              className="group relative block p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.2)]"
            >
              <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${article.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="text-4xl mb-6">{article.icon}</div>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {article.title}
                </h2>
                <p className="text-slate-400 leading-relaxed grow">
                  {article.description}
                </p>
                <div className="mt-8 flex items-center text-sm font-bold text-cyan-500/80 group-hover:text-cyan-400 transition-colors">
                  READ REPORT
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
