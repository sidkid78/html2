"use client";

import React from 'react';
import Link from 'next/link';

const articles = [
  {
    title: "Oil Market Volatility Analysis",
    description: "Deep dive into crude oil price fluctuations and supply-demand imbalances during recent regional tensions.",
    href: "/oil_market_analysis.html",
    icon: "🛢️",
    accent: "from-amber-500/20 to-orange-500/20"
  },
  {
    title: "Maritime Logistics & Choke Points",
    description: "Assessment of transit risks in the Strait of Hormuz and Bab el-Mandeb following naval escalations.",
    href: "/maritime_logistics.html",
    icon: "🚢",
    accent: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Supply Chain Resilience Assessment",
    description: "Evaluation of critical component shortages and logistics bottlenecks in the energy sector.",
    href: "/supply_chain_assessment.html",
    icon: "📦",
    accent: "from-emerald-500/20 to-teal-500/20"
  },
  {
    title: "Policy Recommendations for 2026",
    description: "Strategic framework for energy independence and emergency stockpile management.",
    href: "/policy_recommendations.html",
    icon: "📋",
    accent: "from-purple-500/20 to-indigo-500/20"
  },
  {
    title: "Strategic Domain Report (Original)",
    description: "Baseline intelligence report on regional stability and economic spillover effects.",
    href: "/doman-report-1.html",
    icon: "🛡️",
    accent: "from-slate-500/20 to-slate-400/20"
  }
];

export default function EnergyHub() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-(family-name:--font-inter)">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-24">
        {/* Navigation */}
        <nav className="mb-12">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-amber-400 transition-colors group">
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
            Back to Global Portal
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-20">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold tracking-widest uppercase mb-6">
            Strategic Intelligence Hub
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
            Energy and <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-600">
              Economic Shockwaves
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            A comprehensive hub for tracking global energy disruptions, maritime risks, and macroeconomic volatility following recent geopolitical escalations.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <a
              key={idx}
              href={article.href}
              className="group relative block p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-amber-500/50 transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.2)]"
            >
              <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${article.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="text-4xl mb-6">{article.icon}</div>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {article.title}
                </h2>
                <p className="text-slate-400 leading-relaxed grow">
                  {article.description}
                </p>
                <div className="mt-8 flex items-center text-sm font-bold text-amber-500/80 group-hover:text-amber-400 transition-colors">
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
