import React, { useState, useEffect } from 'react';
import { governanceResults } from '../data/mockData';

const ActionGovernance = ({ onExecute }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Switch to Governance Agent and simulate processing
  useEffect(() => {
    // Switch to Action Governance Agent
    if (window.switchAgent) {
      window.switchAgent('actionGovernance');
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 fade-in">
        <div className="text-center">
          <div className="mb-8 relative">
            <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-3xl shadow-2xl glow-amber">
              <svg className="w-14 h-14 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"></div>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-3">
            <span className="gradient-text-warm">Action Governance Agent</span>
            <span className="text-slate-400 loading-dots"></span>
          </h2>
          <p className="text-slate-400 text-lg">
            Validating actions against governance policies
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            {[0, 1, 2].map((i) => (
              <div 
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-bounce shadow-lg shadow-orange-500/30" 
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <span className="text-sm font-semibold text-amber-400">Action Governance Agent</span>
            </div>
            <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/30">Complete</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Governance <span className="gradient-text-warm">Results</span>
          </h1>
          <p className="text-lg text-slate-400">
            Actions validated against governance policies and readiness criteria
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-4 mb-10 p-5 glass-card rounded-2xl border border-white/5">
          {[
            { num: 1, label: 'Input', active: false, done: true },
            { num: 2, label: 'Analysis', active: false, done: true },
            { num: 3, label: 'Governance', active: true, done: false },
            { num: 4, label: 'Execution', active: false, done: false }
          ].map((step, idx) => (
            <React.Fragment key={step.num}>
              <div className={`flex items-center gap-3 ${step.active || step.done ? '' : 'opacity-40'}`}>
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300
                  ${step.active ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg glow-amber' : 
                    step.done ? 'bg-emerald-500 text-white glow-green' : 'bg-slate-800 text-slate-500'}`}>
                  {step.done ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : step.num}
                </span>
                <span className={`text-sm font-medium ${step.active ? 'text-white' : step.done ? 'text-slate-300' : 'text-slate-500'}`}>
                  {step.label}
                </span>
              </div>
              {idx < 3 && (
                <div className={`flex-1 h-1 rounded-full ${step.done ? 'bg-emerald-500' : 'bg-slate-800'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Explanation Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-800 via-slate-800 to-slate-900 rounded-3xl p-6 mb-8 border border-white/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="relative flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-2">Governance Policy Applied</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Items with missing owner, deadline, or confidence below 80% are blocked for human review. 
                Only fully validated actions can proceed to automated execution.
              </p>
            </div>
          </div>
        </div>

        {/* Split Layout */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Auto-Approvable */}
          <div className="glass-card rounded-3xl border-2 border-emerald-500/30 overflow-hidden glow-green">
            <div className="px-6 py-5 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-b border-emerald-500/20">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-emerald-400 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Auto-Approvable
                </h2>
                <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-sm font-semibold rounded-full border border-emerald-500/30">
                  {governanceResults.autoApprovable.length}
                </span>
              </div>
              <p className="text-sm text-emerald-400/70 mt-2 ml-13">Ready for automated execution</p>
            </div>
            <div className="divide-y divide-white/5">
              {governanceResults.autoApprovable.map((item) => (
                <div key={item.id} className="p-5 hover:bg-white/5 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white mb-2">{item.task}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg border border-white/5">
                          {item.owner}
                        </span>
                        <span className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg border border-white/5">
                          Due: {item.dueDate}
                        </span>
                        <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">
                          {item.confidence}%
                        </span>
                      </div>
                      <p className="text-xs text-emerald-400/70 mt-3 flex items-center gap-2">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {item.reason}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Requires Human Review */}
          <div className="glass-card rounded-3xl border-2 border-amber-500/30 overflow-hidden glow-amber">
            <div className="px-6 py-5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-b border-amber-500/20">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-amber-400 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  Requires Review
                </h2>
                <span className="px-3 py-1.5 bg-amber-500/20 text-amber-400 text-sm font-semibold rounded-full border border-amber-500/30">
                  {governanceResults.requiresReview.length}
                </span>
              </div>
              <p className="text-sm text-amber-400/70 mt-2 ml-13">Blocked pending manual approval</p>
            </div>
            <div className="divide-y divide-white/5">
              {governanceResults.requiresReview.map((item) => (
                <div key={item.id} className="p-5 hover:bg-white/5 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white mb-2">{item.task}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className={`px-2.5 py-1 rounded-lg border ${item.owner ? 'bg-slate-800 text-slate-300 border-white/5' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                          {item.owner || 'No owner'}
                        </span>
                        <span className={`px-2.5 py-1 rounded-lg border ${item.dueDate ? 'bg-slate-800 text-slate-300 border-white/5' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                          {item.dueDate ? `Due: ${item.dueDate}` : 'No deadline'}
                        </span>
                        <span className={`px-2.5 py-1 rounded-lg border ${item.confidence >= 80 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'}`}>
                          {item.confidence}%
                        </span>
                      </div>
                      <p className="text-xs text-red-400 mt-3 flex items-center gap-2 font-medium">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                        {item.blockReason}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass-card rounded-2xl p-5 text-center border border-white/5">
            <p className="text-4xl font-bold text-white mb-1">{governanceResults.autoApprovable.length + governanceResults.requiresReview.length}</p>
            <p className="text-sm text-slate-400">Total Actions</p>
          </div>
          <div className="glass-card rounded-2xl p-5 text-center border border-emerald-500/20 bg-emerald-500/5">
            <p className="text-4xl font-bold text-emerald-400 mb-1">{governanceResults.autoApprovable.length}</p>
            <p className="text-sm text-emerald-400/70">Auto-Approved</p>
          </div>
          <div className="glass-card rounded-2xl p-5 text-center border border-amber-500/20 bg-amber-500/5">
            <p className="text-4xl font-bold text-amber-400 mb-1">{governanceResults.requiresReview.length}</p>
            <p className="text-sm text-amber-400/70">Pending Review</p>
          </div>
        </div>

        {/* IBM Watson - Action Governance Agent */}
        <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-3xl p-6 text-white shadow-2xl mb-8 glow-amber">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
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
                <h3 className="font-bold text-xl mb-2">Action Governance Agent</h3>
                <p className="text-orange-100 text-sm leading-relaxed">
                  Chat with IBM watsonx Orchestrate to review policies, request approvals, or ask about validation rules.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-xl whitespace-nowrap border border-white/10">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
              Chat available
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={onExecute}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl font-semibold text-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Execute Approved Actions
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionGovernance;
