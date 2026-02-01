import React, { useState, useEffect } from 'react';
import { sampleTranscript } from '../data/mockData';

const TranscriptInput = ({ onAnalyze }) => {
  const [transcript, setTranscript] = useState(sampleTranscript);
  const [isLoading, setIsLoading] = useState(false);

  // Switch to Meeting Analysis Agent on mount
  useEffect(() => {
    if (window.switchAgent) {
      window.switchAgent('meetingAnalysis');
    }
  }, []);

  const handleAnalyze = () => {
    setIsLoading(true);
    // Simulate agent processing time
    setTimeout(() => {
      onAnalyze(transcript);
    }, 2500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 fade-in">
        <div className="text-center">
          <div className="mb-8 relative">
            <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-3xl shadow-2xl glow-purple">
              <svg className="w-14 h-14 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            {/* Orbiting dots */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s', animationDelay: '1s' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-3">
            <span className="gradient-text">Meeting Analysis Agent</span>
            <span className="text-slate-400 loading-dots"></span>
          </h2>
          <p className="text-slate-400 text-lg">
            Extracting action items and identifying owners
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            {[0, 1, 2].map((i) => (
              <div 
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce shadow-lg shadow-purple-500/30" 
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
              <span className="text-sm font-semibold text-red-400">Google Meet</span>
            </div>
            <span className="text-slate-600">•</span>
            <span className="text-sm text-slate-400 font-medium">Post-Meeting Transcript</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Input Meeting <span className="gradient-text">Transcript</span>
          </h1>
          <p className="text-lg text-slate-400">
            Paste or edit the meeting transcript below for AI-powered analysis
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-4 mb-10 p-5 glass-card rounded-2xl border border-white/5">
          {[
            { num: 1, label: 'Input', active: true, done: false },
            { num: 2, label: 'Analysis', active: false, done: false },
            { num: 3, label: 'Governance', active: false, done: false },
            { num: 4, label: 'Execution', active: false, done: false }
          ].map((step, idx) => (
            <React.Fragment key={step.num}>
              <div className={`flex items-center gap-3 ${step.active ? '' : 'opacity-40'}`}>
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300
                  ${step.active ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg glow-purple' : 
                    step.done ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                  {step.done ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : step.num}
                </span>
                <span className={`text-sm font-medium ${step.active ? 'text-white' : 'text-slate-500'}`}>
                  {step.label}
                </span>
              </div>
              {idx < 3 && (
                <div className={`flex-1 h-1 rounded-full ${step.done ? 'bg-emerald-500' : 'bg-slate-800'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Transcript Textarea */}
        <div className="glass-card rounded-3xl overflow-hidden mb-8 border border-white/5">
          <div className="px-6 py-4 bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="font-semibold text-slate-200">Meeting Transcript</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg border border-white/5">
              <span className="text-xs font-medium text-slate-400">{transcript.length.toLocaleString()} characters</span>
            </div>
          </div>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            className="w-full h-96 p-6 text-sm text-slate-300 font-mono leading-relaxed resize-none focus:outline-none bg-slate-900/50 placeholder-slate-600"
            placeholder="Paste your meeting transcript here..."
          />
        </div>

        {/* IBM Watson - Meeting Analysis Agent */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-2xl mb-8 glow-purple">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-white/10">
                <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Zm0 26a12 12 0 1 1 12-12 12 12 0 0 1-12 12Z"/>
                  <path d="M16 8a8 8 0 1 0 8 8 8 8 0 0 0-8-8Zm0 14a6 6 0 1 1 6-6 6 6 0 0 1-6 6Z"/>
                  <circle cx="16" cy="16" r="2"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Meeting Analysis Agent</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Powered by IBM watsonx Orchestrate to analyze transcripts and extract actionable insights with confidence scoring.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-xl whitespace-nowrap border border-white/10">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
              Ready
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={!transcript.trim()}
            className="group inline-flex items-center gap-3 px-8 py-4 btn-primary text-white rounded-2xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Analyze Meeting
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TranscriptInput;
