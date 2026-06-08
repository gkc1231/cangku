import { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Copy, CheckCircle2, Terminal, Loader2 } from 'lucide-react';

interface CodeEditorProps {
  initialCode: string;
}

declare global {
  interface Window {
    loadPyodide: any;
    pyodide: any;
  }
}

export default function CodeEditor({ initialCode }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initPyodide = async () => {
      try {
        setIsPyodideLoading(true);
        if (!window.pyodide) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';
          script.onload = async () => {
            try {
              window.pyodide = await window.loadPyodide({
                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/'
              });
              await window.pyodide.loadPackage(['pandas', 'numpy']);
              setPyodideReady(true);
              setIsPyodideLoading(false);
            } catch (err) {
              console.error('Failed to load pyodide:', err);
              setOutput('⚠️ Pyodide 加载失败，将使用模拟输出\n\n');
              setIsPyodideLoading(false);
            }
          };
          document.body.appendChild(script);
        } else {
          setPyodideReady(true);
          setIsPyodideLoading(false);
        }
      } catch (err) {
        console.error('Init error:', err);
        setIsPyodideLoading(false);
      }
    };

    initPyodide();
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('');

    try {
      if (window.pyodide && pyodideReady) {
        window.pyodide.runPython(`
          import sys
          from io import StringIO
          sys.stdout = StringIO()
        `);

        await window.pyodide.runPythonAsync(code);

        const result = window.pyodide.runPython('sys.stdout.getvalue()');
        setOutput(result || '(无输出)');
      } else {
        setOutput('⚠️ Pyodide 加载中，正在使用模拟模式...\n\n' + 
                 '代码已准备好！在完整环境中运行将看到真实输出。\n\n' +
                 '提示：请刷新页面等待Pyodide加载完成以获得完整体验。');
      }
    } catch (err: any) {
      setOutput(`❌ 错误:\n${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between bg-gray-900 px-4 py-2 rounded-t-xl">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-2 text-xs text-gray-400 font-medium">
            main.py
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
            title="复制代码"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? '已复制' : '复制'}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
            title="重置代码"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            重置
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning || isPyodideLoading}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed rounded-md transition-colors"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                运行中...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                运行
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row min-h-[500px]">
        <div className="flex-1 min-w-0">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full bg-gray-950 text-gray-100 p-4 font-mono text-sm resize-none focus:outline-none border-0"
            spellCheck={false}
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col border-l border-gray-800 bg-gray-950">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-b border-gray-800">
            <Terminal className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-400 font-medium">
              输出控制台
              {isPyodideLoading && (
                <span className="ml-2 text-yellow-500 flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Pyodide加载中...
                </span>
              )}
            </span>
          </div>
          <div
            ref={outputRef}
            className="flex-1 p-4 overflow-auto font-mono text-sm text-gray-100 bg-gray-950"
          >
            {output || (
              <span className="text-gray-500">
                点击"运行"按钮执行代码...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
