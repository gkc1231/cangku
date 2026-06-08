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
      console.log('Loading Pyodide...');
      this.pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
        stdout: (text) => console.log(text),
        stderr: (text) => console.error(text),
      });

      console.log('Loading packages...');
      await this.pyodide.loadPackage(["pandas", "numpy"]);
      
      console.log('Configuring environment...');
      this.pyodide.runPython(`
        import pandas as pd
        import numpy as np
        
        # 创建一个全局变量用于存储输出
        output_buffer = []
        
        # 自定义print函数
        def custom_print(*args, sep=' ', end='\\n'):
            output = sep.join(str(arg) for arg in args) + end
            output_buffer.append(output)
            # 也输出到浏览器控制台
            from js import console
            console.log(output)
        
        # 替换内置print
        import builtins
        builtins.print = custom_print
      `);

      this.isInitialized = true;
      console.log('Pyodide initialized successfully');
    } catch (error) {
      console.error('Error initializing Pyodide:', error);
      throw error;
    }
  }

  async runCode(code) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      // 清空之前的结果
      const resultsDiv = document.getElementById('results');
      if (resultsDiv) {
        resultsDiv.innerHTML = '';
      }

      // 清空输出缓冲区
      this.pyodide.runPython(`
        output_buffer.clear()
      `);

      // 执行用户代码
      await this.pyodide.runPythonAsync(code);
      
      // 获取输出
      const output = await this.pyodide.runPythonAsync(`
        ''.join(output_buffer)
      `);
      
      return { success: true, result: output };
    } catch (error) {
      console.error('Error running code:', error);
      return { success: false, error: error.message };
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
        df
      `);
      return result;
    } catch (error) {
      console.error('Error loading CSV:', error);
      throw error;
    }
  }
}

export const pyodideRunner = new PyodideRunner();
export default PyodideRunner;