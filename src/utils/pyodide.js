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
      
      const lines = errorMsg.split('\n');
      const errorLines = [];
      
      // 收集有用的错误信息
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // 跳过空行、pyodide内部信息、以及只包含^或~的行
        if (!line || 
            line.includes('pyodide') || 
            line.includes('lib/python') ||
            line.match(/^[\^~]+$/)) {
          continue;
        }
        
        // 保留用户代码位置和错误类型
        if (line.startsWith('File "<exec>"') || 
            line.match(/Error|Exception/)) {
          errorLines.push(line);
          continue;
        }
        
        // 保留紧接在File "<exec>"后面的代码行
        if (i > 0 && lines[i-1].trim().startsWith('File "<exec>"')) {
          errorLines.push(line);
        }
      }
      
      let finalError = errorLines.join('\n').trim();
      
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
