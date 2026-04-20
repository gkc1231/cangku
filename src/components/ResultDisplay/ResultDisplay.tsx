import React from 'react';

interface ResultDisplayProps {
  isRunning: boolean;
  error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ isRunning, error }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4 bg-slate-900 rounded-t-xl px-6 py-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
        </div>
        <span className="text-sm text-slate-400 font-medium">执行结果</span>
      </div>
      <div className="flex-1 bg-slate-900 border-x border-b border-slate-800 rounded-b-xl p-6 overflow-auto">
        {isRunning ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="relative">
              <svg className="animate-spin w-16 h-16 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
            <p className="mt-6 text-lg text-slate-300 font-medium">正在执行代码...</p>
            <p className="text-sm text-slate-500 mt-2">请稍候，这可能需要几秒钟</p>
          </div>
        ) : error ? (
          <div className="bg-rose-900/30 border border-rose-800/50 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h4 className="text-rose-400 font-bold text-lg mb-2">执行错误</h4>
                <pre className="text-sm text-rose-300 whitespace-pre-wrap font-mono bg-rose-950/30 rounded-lg p-4">
                  {error}
                </pre>
              </div>
            </div>
          </div>
        ) : (
          <div id="results" className="space-y-4">
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <p className="text-slate-400 text-lg">点击「运行代码」查看结果</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;
