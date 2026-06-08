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
      
      // 只保留真正的Python错误信息
      let cleanError = errorMsg;
      
      // 查找最后的实际Python错误行（通常以Error或Exception结尾）
      const lines = errorMsg.split('\n');
      
      // 查找包含实际错误信息的行
      const errorLines = lines.filter(line => {
        const trimmed = line.trim();
        // 保留包含Python错误类型的行
        if (trimmed.match(/Error|Exception|SyntaxError|IndentationError|NameError|TypeError|ValueError|AttributeError|KeyError|IndexError/)) {
          return true;
        }
        // 保留显示文件和行号的行（Python Traceback格式）
        if (trimmed.startsWith('File ') || trimmed.match(/line \d+/)) {
          return true;
        }
        // 保留空行用于格式化
        if (trimmed === '') {
          return true;
        }
        // 过滤掉Pyodide内部行
        return !line.includes('pyodide') && 
               !line.includes('https://') && 
               !line.includes('CodeRunner') &&
               !line.includes('self.ast') &&
               !line.includes('compile(source') &&
               !line.match(/^await|^source|^optimize|^\^+$/) &&
               !line.includes('<5 lines>') &&
               !line.includes('next(self._gen)');
      });
      
      cleanError = errorLines.join('\n').trim();
      
      // 如果清理后还是很长，只保留最后几行（真正的错误信息）
      if (cleanError.length > 500) {
        const finalLines = cleanError.split('\n');
        const importantLines = finalLines.slice(Math.max(0, finalLines.length - 10));
        cleanError = importantLines.join('\n').trim();
      }
      
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
