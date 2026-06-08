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
      let stderrOutput = '';
      
      // 设置stdout和stderr
      this.pyodide.setStdout({
        batched: (text) => {
          output += text;
        }
      });
      
      this.pyodide.setStderr({
        batched: (text) => {
          stderrOutput += text;
        }
      });

      // 执行代码
      await this.pyodide.runPythonAsync(code);
      
      return { success: true, result: output || '代码执行完成，无输出' };
    } catch (error) {
      console.error('执行错误:', error);
      console.error('stderr输出:', stderrOutput);
      
      // 使用stderr输出作为主要错误信息
      let errorMsg = stderrOutput;
      
      // 如果stderr为空，使用error对象
      if (!errorMsg || errorMsg.trim() === '') {
        if (error.message) {
          errorMsg = error.message;
        } else if (typeof error === 'string') {
          errorMsg = error;
        } else {
          errorMsg = String(error);
        }
      }
      
      // 只保留真正的Python错误信息
      const lines = errorMsg.split('\n');
      
      const errorLines = [];
      let inTraceback = false;
      
      for (const line of lines) {
        const trimmed = line.trim();
        
        // 跳过空行
        if (!trimmed) continue;
        
        // 跳过Traceback开头
        if (trimmed === 'Traceback (most recent call last):') {
          inTraceback = true;
          continue;
        }
        
        // 只保留用户代码相关的错误信息
        // 1. Error/Exception 类型 - 优先保留
        if (trimmed.match(/Error|Exception/)) {
          errorLines.push(trimmed);
          continue;
        }
        
        // 2. 用户代码的文件位置（File "<exec>", line ...）
        if (trimmed.startsWith('File "<exec>"')) {
          errorLines.push(trimmed);
          inTraceback = true;
          continue;
        }
        
        // 3. 如果在追踪中，保留用户代码的具体行（非pyodide内部）
        if (inTraceback) {
          // 跳过pyodide内部文件
          if (line.includes('lib/python') || line.includes('_pyodide') || line.includes('pyodide')) {
            continue;
          }
          
          // 保留用户代码的内容行和^指向的行
          if (trimmed && !trimmed.startsWith('File ')) {
            errorLines.push(line);
          }
        }
      }
      
      // 如果没有提取到错误，尝试更简单的方法
      if (errorLines.length === 0) {
        // 直接找包含Error或Exception的行
        for (const line of lines) {
          if (line.match(/Error|Exception/)) {
            errorLines.push(line.trim());
            break;
          }
        }
      }
      
      let cleanError = errorLines.join('\n').trim();
      
      return { success: false, error: cleanError || '代码执行出错，请检查语法' };
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
