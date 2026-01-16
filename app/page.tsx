import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans selection:bg-cyan-900 selection:text-cyan-50">

      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center p-6 border-b border-gray-900 overflow-hidden">
        {/* Abstract Background Grid */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 self-center lg:self-start px-3 py-1 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
              <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#00f0ff]">System Operational</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[1.1]">
              DriveNet <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Intelligence</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              AI-driven vehicle classification with physical constraint validation.
              DriveNet analyzes geometry to enforce real-world feasibility.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/analysis"
                className="px-8 py-4 bg-[#00f0ff] hover:bg-cyan-300 text-black font-bold tracking-widest uppercase text-sm rounded transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
              >
                Start Vehicle Analysis
              </Link>
            </div>
          </div>

          {/* Abstract Visual - Right Side */}
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="w-[400px] h-[400px] border border-gray-800 rounded-full flex items-center justify-center relative animate-[spin_60s_linear_infinite]">
              <div className="absolute inset-0 border border-gray-800 rounded-full scale-125 border-dashed opacity-30"></div>
              <div className="w-[300px] h-[300px] bg-gradient-to-tr from-cyan-900/20 to-transparent rounded-full backdrop-blur-xl border border-gray-700/50 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-1 opacity-50">
                  <div className="w-2 h-2 bg-[#00f0ff]"></div>
                  <div className="w-2 h-2 bg-gray-700"></div>
                  <div className="w-2 h-2 bg-gray-700"></div>
                  <div className="w-2 h-2 bg-[#00f0ff]"></div>
                </div>
              </div>
            </div>
            {/* Floating Labels */}
            <div className="absolute top-1/4 right-0 bg-gray-900/80 backdrop-blur border border-gray-700 px-3 py-1 text-xs font-mono text-cyan-400 rounded">
              CONFIDENCE: 98.2%
            </div>
            <div className="absolute bottom-1/4 left-0 bg-gray-900/80 backdrop-blur border border-gray-700 px-3 py-1 text-xs font-mono text-gray-400 rounded">
              LATENCY: 45ms
            </div>
          </div>
        </div>
      </section>

      {/* 2. How It Works */}
      <section className="py-24 border-b border-gray-900 bg-[#0c0c0c]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Operational Workflow</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Standardized inference pipeline for consistent classification results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Visual Input", desc: "Provide a clear image of the vehicle for initial CNN-based feature extraction." },
              { step: "02", title: "Physical Metadata", desc: "Specify observed attributes like ground clearance and stance for validation." },
              { step: "03", title: "Intelligent Decision", desc: "Neural prediction is refined using physical feasibility constraints." },
            ].map((item, i) => (
              <div key={i} className="group p-8 border border-gray-800 bg-[#0a0a0a] hover:border-gray-600 transition-colors relative">
                <div className="text-6xl font-black text-gray-900 absolute -top-6 -right-4 select-none group-hover:text-gray-800 transition-colors">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. System Philosophy */}
      <section className="py-24 border-b border-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Physically Aware AI</h2>
          <p className="text-xl leading-relaxed text-gray-400">
            "Unlike pure vision-based models, <span className="text-[#00f0ff]">DriveNet</span> combines probabilistic inference with rule-based physical validation to enforce real-world feasibility and reduce false classification."
          </p>
        </div>
      </section>

      {/* 4. Output Preview (Static Mock) */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center">
          <div className="mb-12 text-center">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#00f0ff] mb-2">System Output Preview</h2>
            <h3 className="text-2xl font-bold text-white">Engineering-Grade Reporting</h3>
          </div>

          {/* Mock Report Card */}
          <div className="w-full max-w-2xl border border-gray-700 bg-[#0f0f0f] rounded-lg p-8 font-mono relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-50"></div>

            <div className="flex justify-between items-start mb-8 border-b border-gray-800 pb-4">
              <div>
                <div className="text-xs text-gray-500 uppercase">Analysis ID</div>
                <div className="text-white">DN-8842-XJ</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 uppercase">Timestamp</div>
                <div className="text-white">2026-01-16T14:00:00Z</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <div className="text-xs text-gray-500 uppercase mb-1">Predicted Class</div>
                <div className="text-2xl font-bold text-white">SUV</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase mb-1">Confidence</div>
                <div className="text-2xl font-bold text-[#00f0ff]">94.8%</div>
              </div>
            </div>

            <div className="bg-gray-900/50 p-4 border border-gray-800 rounded mb-6">
              <div className="text-xs text-gray-500 uppercase mb-2">Reasoning Summary</div>
              <p className="text-sm text-gray-300">
                Vision model initially predicted <span className="text-yellow-500">Hatchback</span> (58%), but physical constraint logic (High Ground Clearance + Tall Stance) forced re-evaluation to <span className="text-[#00f0ff]">SUV</span>.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-bold text-green-500 uppercase">Decision: AUTO_APPROVE</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="py-24 border-t border-gray-900 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-bold text-white mb-8">Ready to analyze a vehicle?</h2>
        <Link
          href="/analysis"
          className="px-10 py-4 bg-white hover:bg-gray-200 text-black font-bold tracking-widest uppercase text-sm rounded transition-colors"
        >
          Launch DriveNet Intelligence
        </Link>
        <p className="mt-8 text-xs text-gray-600 font-mono">v1.0.4-stable • No Authentication Required</p>
      </section>

    </main>
  );
}
