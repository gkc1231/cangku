import { loadPyodide } from 'pyodide';

class PyodideRunner {
  constructor() {
    this.pyodide = null;
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) {
      return;
    }

    try {
      this.pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.29.3/full/"
      });

      await this.pyodide.loadPackage(["pandas", "numpy"]);

      this.isInitialized = true;
      console.log('Python环境初始化完成');
    } catch (error) {
      console.error('初始化错误:', error);
      throw error;
    }
  }

  async runCode(code) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      let output = '';
      
      // 设置stdout和stderr
      this.pyodide.setStdout({
        batched: (text) => {
          output += text;
        }
      });
      
      this.pyodide.setStderr({
        batched: (text) => {
          output += text;
        }
      });

      // 执行代码
      await this.pyodide.runPythonAsync(code);
      
      return { success: true, result: output || '代码执行完成，无输出' };
    } catch (error) {
      console.error('执行错误:', error);
      
      // 提取有用的错误信息
      let errorMsg = '';
      if (error.message) {
        errorMsg = error.message;
      } else if (typeof error === 'string') {
        errorMsg = error;
      } else {
        errorMsg = String(error);
      }
      
      // 如果错误信息包含Traceback，只保留Python的错误部分
      if (errorMsg.includes('Traceback')) {
        const tracebackLines = errorMsg.split('\n');
        const pythonError = tracebackLines.filter(line => 
          !line.includes('pyodide') && 
          !line.includes('https://') &&
          line.trim() !== ''
        ).join('\n');
        if (pythonError) {
          errorMsg = pythonError;
        }
      }
      
      return { success: false, error: errorMsg || '执行错误' };
    }
  }

  async loadCSV(url) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const result = await this.pyodide.runPythonAsync(`
        import pandas as pd
        df = pd.read_csv('${url}')
        print(df)
      `);
      return result;
    } catch (error) {
      console.error('加载CSV错误:', error);
      throw error;
    }
  }
}

export const pyodideRunner = new PyodideRunner();
export default PyodideRunner;
