import React from 'react';
import { meetingAnalysis } from '../data/mockData';

const MeetingAnalysis = ({ onValidate }) => {
  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
    if (confidence >= 75) return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
    return 'text-red-400 bg-red-500/20 border-red-500/30';
  };

  return (
    <div className="min-h-screen py-12 px-4 fade-in">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <span className="text-sm font-semibold text-blue-400">Meeting Analysis Agent</span>
            </div>
            <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/30">Complete</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Analysis <span className="gradient-text">Results</span>
          </h1>
          <p className="text-lg text-slate-400">
            AI-extracted insights and action items from the meeting transcript
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-4 mb-10 p-5 glass-card rounded-2xl border border-white/5">
          {[
            { num: 1, label: 'Input', active: false, done: true },
            { num: 2, label: 'Analysis', active: true, done: false },
            { num: 3, label: 'Governance', active: false, done: false },
            { num: 4, label: 'Execution', active: false, done: false }
          ].map((step, idx) => (
            <React.Fragment key={step.num}>
              <div className={`flex items-center gap-3 ${step.active || step.done ? '' : 'opacity-40'}`}>
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300
                  ${step.active ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg glow-purple' : 
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

        {/* Meeting Summary */}
        <div className="glass-card rounded-3xl border border-white/5 mb-6 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
            <h2 className="text-lg font-bold text-white flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              Meeting Summary
            </h2>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {meetingAnalysis.summary.map((point, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2.5 flex-shrink-0 shadow-lg shadow-purple-500/30"></span>
                  <span className="text-slate-300 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Items Table */}
        <div className="glass-card rounded-3xl border border-white/5 mb-6 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
            <h2 className="text-lg font-bold text-white flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              Extracted Action Items
              <span className="ml-2 px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded-full border border-purple-500/30">
                {meetingAnalysis.actionItems.length} items
              </span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Task</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {meetingAnalysis.actionItems.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-200">{item.task}</td>
                    <td className="px-6 py-4 text-sm">
                      {item.owner ? (
                        <span className="text-slate-300 px-2 py-1 bg-slate-800 rounded-lg">{item.owner}</span>
                      ) : (
                        <span className="text-red-400 italic px-2 py-1 bg-red-500/10 rounded-lg border border-red-500/20">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {item.dueDate ? (
                        <span className="text-slate-300">{item.dueDate}</span>
                      ) : (
                        <span className="text-amber-400 italic">Not specified</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getConfidenceColor(item.confidence)}`}>
                        {item.confidence}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 mb-8">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-blue-300 font-semibold">Next: Action Governance</p>
              <p className="text-sm text-blue-400/80 mt-1">
                The governance agent will validate each action item and determine which can be auto-approved vs. which require human review.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={onValidate}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-semibold text-lg hover:shadow-xl hover:shadow-amber-500/25 transition-all duration-300 hover:-translate-y-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Validate Actions
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingAnalysis;
