import React from 'react';

const LandingPage = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 fade-in mesh-bg relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl float" style={{ animationDelay: '1s' }}></div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="max-w-3xl text-center relative z-10">
        {/* Animated Logo */}
        <div className="mb-10 scale-in">
          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 rounded-3xl shadow-2xl pulse-glow">
            <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
        </div>

        {/* Title with gradient */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight slide-up">
          <span className="gradient-text">Meeting</span>
          <span className="text-slate-600 mx-4">→</span>
          <span className="gradient-text-warm">Execution</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-slate-400 mb-16 leading-relaxed max-w-2xl mx-auto slide-up" style={{ animationDelay: '0.1s' }}>
          Transform meeting transcripts into validated action items through an 
          <span className="font-semibold text-purple-400"> intelligent AI workflow</span>
        </p>

        {/* Workflow Steps Preview */}
        <div className="flex items-center justify-center gap-4 mb-16 slide-up" style={{ animationDelay: '0.2s' }}>
          {[
            { num: 1, label: 'Analyze', gradient: 'from-blue-500 to-cyan-400', glow: 'glow-blue' },
            { num: 2, label: 'Validate', gradient: 'from-amber-500 to-orange-400', glow: 'glow-amber' },
            { num: 3, label: 'Execute', gradient: 'from-emerald-500 to-green-400', glow: 'glow-green' }
          ].map((step, idx) => (
            <React.Fragment key={step.num}>
              <div className="flex items-center gap-3 px-6 py-4 glass-card rounded-2xl card-hover border border-white/5">
                <span className={`w-12 h-12 bg-gradient-to-br ${step.gradient} text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-lg ${step.glow}`}>
                  {step.num}
                </span>
                <span className="font-semibold text-slate-200">{step.label}</span>
              </div>
              {idx < 2 && (
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* CTA Button */}
        <div className="slide-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={onStart}
            className="group inline-flex items-center gap-3 px-12 py-5 btn-primary text-white rounded-2xl font-semibold text-xl shadow-2xl"
          >
            <span>Try Demo</span>
            <svg className="w-6 h-6 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-14 flex items-center justify-center gap-8 text-sm text-slate-500 slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl">
            <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Secure & Private</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl">
            <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span>Demo Mode</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl">
            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <span>AI Powered</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
