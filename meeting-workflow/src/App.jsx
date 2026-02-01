import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import TranscriptInput from './components/TranscriptInput';
import MeetingAnalysis from './components/MeetingAnalysis';
import ActionGovernance from './components/ActionGovernance';
import ExecutionPage from './components/ExecutionPage';

const STEPS = {
  LANDING: 'landing',
  TRANSCRIPT: 'transcript',
  ANALYSIS: 'analysis',
  GOVERNANCE: 'governance',
  EXECUTION: 'execution'
};

function App() {
  const [currentStep, setCurrentStep] = useState(STEPS.LANDING);
  const [transcript, setTranscript] = useState('');

  const handleStart = () => {
    setCurrentStep(STEPS.TRANSCRIPT);
  };

  const handleAnalyze = (transcriptText) => {
    setTranscript(transcriptText);
    setCurrentStep(STEPS.ANALYSIS);
  };

  const handleValidate = () => {
    setCurrentStep(STEPS.GOVERNANCE);
  };

  const handleExecute = () => {
    setCurrentStep(STEPS.EXECUTION);
  };

  const handleRestart = () => {
    setTranscript('');
    setCurrentStep(STEPS.LANDING);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] mesh-bg">
      {/* Header */}
      {currentStep !== STEPS.LANDING && (
        <header className="glass sticky top-0 z-50 border-b border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg glow-purple">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <span className="font-bold text-lg gradient-text">Meeting → Governed Execution</span>
            </div>
            <button
              onClick={handleRestart}
              className="group text-sm text-slate-400 hover:text-purple-400 flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/5 transition-all duration-300"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-rotate-180 duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Restart Demo
            </button>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main>
        {currentStep === STEPS.LANDING && (
          <LandingPage onStart={handleStart} />
        )}
        {currentStep === STEPS.TRANSCRIPT && (
          <TranscriptInput onAnalyze={handleAnalyze} />
        )}
        {currentStep === STEPS.ANALYSIS && (
          <MeetingAnalysis onValidate={handleValidate} />
        )}
        {currentStep === STEPS.GOVERNANCE && (
          <ActionGovernance onExecute={handleExecute} />
        )}
        {currentStep === STEPS.EXECUTION && (
          <ExecutionPage onRestart={handleRestart} />
        )}
      </main>

      {/* Footer */}
      {currentStep !== STEPS.LANDING && (
        <footer className="py-8 text-center border-t border-white/5 mt-12">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <span className="w-2 h-2 rounded-full bg-gradient-primary"></span>
            <span>Agentic AI Workflow Demo</span>
            <span className="mx-2 text-slate-700">•</span>
            <span>Analysis → Governance → Execution</span>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
