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
      
      // 提取错误信息
      let errorMsg = '';
      if (error.message) {
        errorMsg = error.message;
      } else if (typeof error === 'string') {
        errorMsg = error;
      } else {
        errorMsg = String(error);
      }
      
      // 简单处理：只保留最后包含Error/Exception的行
      const lines = errorMsg.split('\n');
      let finalError = '';
      
      // 从后往前找，找到第一个包含Error或Exception的行
      for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i].trim();
        if (line.match(/Error|Exception/)) {
          finalError = line;
          break;
        }
      }
      
      // 如果没找到，找包含File "<exec>"的行
      if (!finalError) {
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line.startsWith('File "<exec>"')) {
            finalError = line;
            // 同时保留后面的代码行和错误行
            for (let j = i + 1; j < lines.length && j < i + 3; j++) {
              const nextLine = lines[j].trim();
              if (nextLine && !nextLine.includes('lib/python') && !nextLine.includes('pyodide')) {
                finalError += '\n' + nextLine;
              }
            }
            break;
          }
        }
      }
      
      return { success: false, error: finalError || '代码执行出错，请检查语法' };
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
