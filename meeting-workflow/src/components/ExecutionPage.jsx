import React, { useState, useEffect } from 'react';
import { governanceResults } from '../data/mockData';

const ExecutionPage = ({ onRestart }) => {
  const [executedItems, setExecutedItems] = useState([]);
  const [isExecuting, setIsExecuting] = useState(true);

  useEffect(() => {
    // Simulate sequential execution of approved items
    const executeItems = async () => {
      for (let i = 0; i < governanceResults.autoApprovable.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setExecutedItems(prev => [...prev, governanceResults.autoApprovable[i]]);
      }
      setIsExecuting(false);
    };
    executeItems();
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <span className="text-sm font-semibold text-emerald-400">Execution Agent</span>
            </div>
            {!isExecuting && (
              <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/30">Complete</span>
            )}
            {isExecuting && (
              <span className="px-3 py-1.5 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full border border-blue-500/30 animate-pulse">Running...</span>
            )}
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Execution <span className="gradient-text">Results</span>
          </h1>
          <p className="text-lg text-slate-400">
            Downstream notifications triggered for approved actions only
          </p>
        </div>

        {/* Step Indicator - Complete */}
        <div className="flex items-center gap-4 mb-10 p-5 glass-card rounded-2xl border border-white/5">
          {[
            { num: 1, label: 'Input', done: true },
            { num: 2, label: 'Analysis', done: true },
            { num: 3, label: 'Governance', done: true },
            { num: 4, label: 'Execution', active: true, done: false }
          ].map((step, idx) => (
            <React.Fragment key={step.num}>
              <div className={`flex items-center gap-3 ${step.active || step.done ? '' : 'opacity-40'}`}>
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300
                  ${step.active ? 'bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-lg glow-green' : 
                    step.done ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                  {step.done && !step.active ? (
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

        {/* Execution Caption */}
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900/30 to-green-900/30 rounded-3xl p-6 mb-8 border border-emerald-500/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="relative flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-emerald-400 text-lg mb-2">Only approved actions trigger downstream notifications</h3>
              <p className="text-emerald-300/70 text-sm leading-relaxed">
                Items that failed governance validation remain blocked and will not generate any automated messages or task assignments.
              </p>
            </div>
          </div>
        </div>

        {/* Slack-style Notifications */}
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            Slack Notifications Sent
          </h2>

          {executedItems.map((item, index) => (
            <div key={item.id} className="fade-in">
              <SlackNotificationCard item={item} index={index} />
            </div>
          ))}

          {isExecuting && (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-4 text-slate-400">
                <div className="w-6 h-6 border-2 border-slate-600 border-t-purple-500 rounded-full animate-spin"></div>
                <span className="text-lg">Sending notifications...</span>
              </div>
            </div>
          )}
        </div>

        {/* Blocked Items Reminder */}
        {!isExecuting && (
          <div className="relative overflow-hidden bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-3xl p-6 mb-8 border border-amber-500/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
            <div className="relative flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-amber-400 text-lg mb-2">
                  {governanceResults.requiresReview.length} items still pending human review
                </h3>
                <p className="text-amber-300/70 text-sm mb-4">
                  These items require manual intervention before they can be executed.
                </p>
                <ul className="space-y-2">
                  {governanceResults.requiresReview.map(item => (
                    <li key={item.id} className="text-sm text-amber-400/80 flex items-center gap-3">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      {item.task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Workflow Complete */}
        {!isExecuting && (
          <div className="glass-card rounded-3xl p-10 text-center mb-8 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-emerald-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2"></div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-3xl mb-6 shadow-2xl glow-green">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Workflow Complete</h2>
              <p className="text-slate-400 mb-8 text-lg">
                The agentic workflow has processed your meeting transcript through all stages.
              </p>
              <div className="flex items-center justify-center gap-8 text-sm">
                <div className="text-center">
                  <p className="text-4xl font-bold gradient-text mb-1">7</p>
                  <p className="text-slate-400">Actions Identified</p>
                </div>
                <div className="w-px h-14 bg-white/10"></div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-emerald-400 mb-1">4</p>
                  <p className="text-slate-400">Auto-Executed</p>
                </div>
                <div className="w-px h-14 bg-white/10"></div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-amber-400 mb-1">3</p>
                  <p className="text-slate-400">Pending Review</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Restart Button */}
        {!isExecuting && (
          <div className="flex justify-center">
            <button
              onClick={onRestart}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-1"
            >
              <svg className="w-6 h-6 transition-transform group-hover:-rotate-180 duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Start New Demo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Slack-style Notification Card Component
const SlackNotificationCard = ({ item, index }) => {
  const colors = ['#a855f7', '#36C5F0', '#10b981', '#f59e0b'];
  const accentColor = colors[index % colors.length];

  return (
    <div className="glass-card rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-300">
      <div className="flex">
        {/* Slack accent bar */}
        <div className="w-1.5" style={{ backgroundColor: accentColor }}></div>
        
        <div className="flex-1 p-5">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#4A154B] rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">Meeting Bot</span>
                <span className="px-2 py-0.5 bg-slate-700 text-slate-400 text-xs rounded-md font-medium">APP</span>
              </div>
              <span className="text-xs text-slate-500">Just now</span>
            </div>
          </div>

          {/* Message Content */}
          <div className="pl-13 ml-13">
            <p className="text-sm text-slate-300 mb-3">
              📋 <strong className="text-white">New Action Item Assigned</strong>
            </p>
            <div className="bg-slate-800/50 rounded-xl p-4 border-l-4" style={{ borderLeftColor: accentColor }}>
              <p className="text-sm text-white font-medium mb-3">{item.task}</p>
              <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-700/50 rounded-lg">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {item.owner}
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-700/50 rounded-lg">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Due: {item.dueDate}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <button className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1.5 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Mark Complete
              </button>
              <button className="text-xs text-slate-400 hover:text-blue-400 flex items-center gap-1.5 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutionPage;
