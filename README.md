# Pandas数据分析实战项目

这是一个包含10个精选Pandas数据分析实战项目的静态网站，从入门到进阶，完全在浏览器中运行代码。

## 功能特点

- 📚 10个精选Pandas数据分析项目
- 🎯 从入门到进阶的难度梯度
- 💻 完全在浏览器中运行Python代码（使用Pyodide）
- 🎨 现代化、美观的UI设计
- 📱 响应式布局，支持移动端
- 📊 内置数据可视化（使用Plotly）
- ✏️ 代码编辑器（使用Monaco Editor）

## 技术栈

- React + TypeScript
- Pyodide（在浏览器中运行Python）
- Monaco Editor（代码编辑器）
- Plotly（数据可视化）
- Tailwind CSS（样式）
- Vite（构建工具）

## 部署到Cloudflare Pages

### 方法一：通过Cloudflare Pages仪表板部署

1. 登录到 [Cloudflare Pages](https://pages.cloudflare.com/)
2. 点击 "Create a project"
3. 选择你的代码仓库（如果是GitHub或GitLab）
4. 配置构建设置：
   - 构建命令：`npm run build`
   - 构建输出目录：`dist`
   - 环境变量：无需特殊环境变量
5. 点击 "Save and Deploy"

### 方法二：通过Wrangler CLI部署

1. 安装Wrangler CLI：
   ```bash
   npm install -g wrangler
   ```

2. 登录到Cloudflare：
   ```bash
   wrangler login
   ```

3. 部署项目：
   ```bash
   wrangler pages deploy dist
   ```

## 本地开发

1. 安装依赖：
   ```bash
   npm install
   ```

2. 启动开发服务器：
   ```bash
   npm run dev
   ```

3. 构建生产版本：
   ```bash
   npm run build
   ```

4. 预览生产构建：
   ```bash
   npm run preview
   ```

## 项目结构

- `src/data/projects.js` - 包含10个Pandas项目的详细信息
- `src/utils/pyodide.js` - Pyodide运行器，用于在浏览器中执行Python代码
- `src/pages/` - 页面组件
- `src/components/` - 通用组件
- `src/styles/` - 样式文件

## 项目列表

1. **数据导入与基础处理** - 入门级
2. **数据清洗与预处理** - 入门级
3. **数据筛选与查询** - 入门级
4. **数据分组与聚合** - 中级
5. **数据合并与连接** - 中级
6. **时间序列分析** - 中级
7. **数据可视化** - 中级
8. **高级数据转换** - 高级
9. **性能优化** - 高级
10. **综合项目实战** - 高级

## 注意事项

- 首次加载时会下载Pyodide运行时，可能需要一些时间
- 浏览器需要支持WebAssembly
- 大型数据集可能会受到浏览器内存限制
