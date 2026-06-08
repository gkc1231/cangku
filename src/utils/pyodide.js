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
      
      // 设置stdout
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

      // 直接执行代码
      await this.pyodide.runPythonAsync(code);
      
      return { success: true, result: output };
    } catch (error) {
      console.error('执行错误:', error);
      let errorMsg = error.message;
      // 如果是完整的错误堆栈，取前几行
      if (error.stack) {
        errorMsg = error.stack;
      }
      return { success: false, error: errorMsg };
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
