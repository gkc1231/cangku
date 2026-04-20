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
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
      });

      // 加载必要的包
      await this.pyodide.loadPackage(["pandas", "numpy", "plotly"]);
      
      // 配置plotly以在浏览器中显示
      this.pyodide.runPython(`
        import plotly
        import plotly.express as px
        import plotly.graph_objects as go
        from plotly.subplots import make_subplots
        
        # 配置plotly在浏览器中显示
        def show(fig):
            import json
            from js import document, Plotly
            
            # 创建一个临时div元素
            div = document.createElement('div')
            div.id = 'plotly-plot-' + str(id(fig))
            div.style.width = '100%'
            div.style.height = '400px'
            document.getElementById('results').appendChild(div)
            
            # 将图表转换为JSON
            fig_json = fig.to_json()
            
            # 使用Plotly.js显示图表
            Plotly.newPlot(div.id, JSON.parse(fig_json)['data'], JSON.parse(fig_json)['layout'])
        
        # 替换plotly的show方法
        px.scatter.show = show
        px.bar.show = show
        px.line.show = show
        px.box.show = show
        px.violin.show = show
        px.pie.show = show
        px.imshow.show = show
        px.scatter_matrix.show = show
        go.Figure.show = show
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

      // 重定向print输出到控制台
      this.pyodide.runPython(`
        import sys
        from js import console
        
        class ConsoleWriter:
            def write(self, text):
                console.log(text)
        
        sys.stdout = ConsoleWriter()
        sys.stderr = ConsoleWriter()
      `);

      // 执行用户代码
      const result = await this.pyodide.runPythonAsync(code);
      return { success: true, result };
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
      // 使用Pyodide的fetch能力加载CSV
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

// 导出单例实例
export const pyodideRunner = new PyodideRunner();
export default PyodideRunner;