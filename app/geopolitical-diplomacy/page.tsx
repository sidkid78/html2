"use client";

import React from 'react';
import Link from 'next/link';

const geopoliticalData = {
  "analysis_metadata": {
    "topic": "China's Indo-Pacific Posturing vs US Middle East Preoccupation",
    "period": "2023-2026",
    "last_updated": "2026-03-15"
  },
  "key_findings": [
    {
      "phase": "Initial Distraction (2024)",
      "me_event": "Israel-Hamas War & Red Sea Crisis",
      "china_action": "Joint Sword-2024A & Second Thomas Shoal violence",
      "pattern": "Testing red lines during carrier group diversion"
    },
    {
      "phase": "Deepening Preoccupation (2025)",
      "me_event": "Projected June 2025 Iran-Israel War",
      "china_action": "Justice Mission 2025 blockade & PLAN involvement in SCS",
      "pattern": "Normalization of PLAN presence in gray-zone encounters"
    },
    {
      "phase": "Strategic Window (2026)",
      "me_event": "U.S.-Israel campaign against Iran",
      "china_action": "Snap drills during THAAD/Patriot redeployments",
      "pattern": "Exploiting regional defense vacuum and diplomatic leverage"
    }
  ],
  "strategic_mechanisms": [
    "Cabbage Strategy: Layered coercion using fishing fleets, CCG, and PLAN.",
    "Cost Asymmetry: Forcing U.S. to spend high-value interceptors in ME while China uses low-cost gray-zone tactics.",
    "Normalized Escalation: Using global distractions to establish a new status quo without triggering a major war."
  ]
};

const countermeasuresData = {
  "strategic_objective": "Signal US resolve in Ukraine and Taiwan via multilateral alliances and economic deterrents without requiring a full military pivot from the Middle East.",
  "middle_east_economy_of_force": {
    "strategy": "Transition to a localized burden-sharing posture in the Middle East. By leveraging the Abraham Accords framework and empowering regional partners (e.g., Saudi Arabia, UAE, Israel) to take the lead on local maritime security and anti-drone defense networks, the US can free up critical strategic bandwidth and naval assets for the Indo-Pacific and Europe without creating a regional power vacuum."
  },
  "ukraine": [
    {
      "initiative": "Institutionalization of UDCG",
      "impact": "Transition the 'Ramstein format' into a formalized, treaty-backed Joint Defense Procurement Command."
    },
    {
      "initiative": "Cyber Shield integration",
      "impact": "Establish multilateral cyber defense and intelligence-sharing hubs in frontline Eastern European states."
    }
  ],
  "taiwan": [
    {
      "initiative": "AUKUS Pillar II Expansion",
      "impact": "Incorporate regional allies like Japan and South Korea into advanced asymmetric capabilities (AI, quantum, hypersonics)."
    },
    {
      "initiative": "Economic Article 5",
      "impact": "Pre-negotiated package of automatic capital controls and trade embargoes that trigger instantly upon a blockade."
    }
  ]
};

export default function GeopoliticalHub() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-(family-name:--font-inter) selection:bg-rose-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-24">
        {/* Navigation */}
        <nav className="mb-16">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-rose-400 transition-colors group">
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
            Back to Global Intelligence
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-20">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold tracking-widest uppercase mb-6">
            Geopolitical Diplomacy & Alliance Leverage
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Strategic Indo-Pacific <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-rose-500 to-amber-500">
              Posturing Analysis
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
            Examining the synchronization between U.S. Middle East preoccupations and Chinese tactical escalations 
            and the corresponding multilateral countermeasures.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="group relative p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-rose-500/50 transition-all duration-500 overflow-hidden shadow-2xl flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 blur-2xl -mr-16 -mt-16" />
                <div className="text-4xl mb-6">🇨🇳</div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-rose-400 transition-colors">
                  Chinese Strategic Posturing toward Taiwan
                </h3>
                <p className="text-sm text-slate-400 mb-8 grow">
                  Analysis of escalation patterns synchronized with U.S. involvement in Middle Eastern conflicts.
                </p>
                <Link 
                  href="/chinese_strategic_posturing_toward_taiwan.html" 
                  className="inline-flex items-center text-rose-400 font-bold hover:text-rose-300 transition-colors group/link"
                >
                  Read Report
                  <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

              {/* Card 2 */}
              <div className="group relative p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-amber-500/50 transition-all duration-500 overflow-hidden shadow-2xl flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-2xl -mr-16 -mt-16" />
                <div className="text-4xl mb-6">🏛️</div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">
                  Diplomatic Countermeasures & Stabilization
                </h3>
                <p className="text-sm text-slate-400 mb-8 grow">
                  Proposing specific multilateral alliances and economic deterrents to signal U.S. resolve.
                </p>
                <Link 
                  href="/diplomatic_countermeasures_and_stabilization.html" 
                  className="inline-flex items-center text-amber-400 font-bold hover:text-amber-300 transition-colors group/link"
                >
                  Read Report
                  <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

              {/* Card 3 */}
              <div className="group relative p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 transition-all duration-500 overflow-hidden shadow-2xl flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-2xl -mr-16 -mt-16" />
                <div className="text-4xl mb-6">🌐</div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                  Four Gateways Strategic Dossier
                </h3>
                <p className="text-sm text-slate-400 mb-8 grow">
                  A geopolitical model conceptualizing the international system as a 'global fortress' with critical gateways.
                </p>
                <Link 
                  href="/four-gateways.html" 
                  className="inline-flex items-center text-blue-400 font-bold hover:text-blue-300 transition-colors group/link"
                >
                  Read Dossier
                  <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

              {/* Card 4 */}
              <div className="group relative p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/50 transition-all duration-500 overflow-hidden shadow-2xl flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-2xl -mr-16 -mt-16" />
                <div className="text-4xl mb-6">🛡️</div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                  Diplomacy & Alliance Leverage
                </h3>
                <p className="text-sm text-slate-400 mb-8 grow">
                  Master report identifying systemic vulnerabilities and proposing a distributed &apos;Economy of Force&apos; strategy.
                </p>
                <Link 
                  href="/domain-report-2.html" 
                  className="inline-flex items-center text-emerald-400 font-bold hover:text-emerald-300 transition-colors group/link"
                >
                  Open Synthesis
                  <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>

            {/* Countermeasures Implementation Section */}
            <section className="p-8 md:p-12 rounded-[2.5rem] bg-linear-to-br from-slate-900 via-slate-900 to-rose-950/20 border border-slate-800 shadow-3xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-rose-500 via-amber-500 to-rose-500" />
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">Stabilization Framework</h3>
              
              <div className="space-y-10">
                {/* ME Strategy */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <h4 className="text-rose-400 text-xs font-bold uppercase tracking-widest mb-4">Middle East Economy of Force</h4>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    {countermeasuresData.middle_east_economy_of_force.strategy}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Ukraine */}
                  <div className="space-y-4">
                    <h4 className="text-rose-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                       Ukraine Focal Points
                    </h4>
                    {countermeasuresData.ukraine.map((item, i) => (
                      <div key={i} className="group p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 transition-colors">
                        <div className="text-white font-bold text-sm mb-1">{item.initiative}</div>
                        <div className="text-xs text-slate-400 leading-relaxed">{item.impact}</div>
                      </div>
                    ))}
                  </div>

                  {/* Taiwan */}
                  <div className="space-y-4">
                    <h4 className="text-amber-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                       Taiwan Deterrence
                    </h4>
                    {countermeasuresData.taiwan.map((item, j) => (
                      <div key={j} className="group p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 transition-colors">
                        <div className="text-white font-bold text-sm mb-1">{item.initiative}</div>
                        <div className="text-xs text-slate-400 leading-relaxed">{item.impact}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar / Timeline area */}
          <div className="lg:col-span-4">
            <div className="sticky top-12 p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white mb-8">Escalation Phases</h3>
              <div className="space-y-12">
                {geopoliticalData.key_findings.map((finding, idx) => (
                  <div key={idx} className="relative pl-8 border-l border-slate-800 pb-2 last:pb-0">
                    <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                    <div className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-2">{finding.phase}</div>
                    <div className="text-sm font-semibold text-white mb-2">{finding.me_event}</div>
                    <div className="text-xs text-slate-400 leading-relaxed bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                      <span className="text-rose-300 font-medium">China:</span> {finding.china_action}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 shadow-inner">
                <div className="flex items-center gap-3 text-amber-500 text-sm font-bold mb-3">
                  <span className="text-lg animate-pulse">⚠️</span> Strategic Alert
                </div>
                <p className="text-xs text-slate-400 leading-relaxed italic">
                  &ldquo;Historical data suggests high correlation between U.S. carrier strike group diversions to the Red Sea and PLAN naval exercises in the Taiwan Strait.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Decoration */}
      <footer className="mt-24 border-t border-slate-900 py-12 text-center">
        <p className="text-slate-600 text-sm font-mono uppercase tracking-widest">
          End of Strategic Directive 2026-B
        </p>
      </footer>
    </main>
  );
}


