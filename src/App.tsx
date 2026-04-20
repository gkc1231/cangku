import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home/Home';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';
import Resources from './pages/Resources/Resources';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
        <footer className="bg-slate-900 text-white py-12">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
                    <span className="text-xl">🐼</span>
                  </div>
                  <span className="text-xl font-bold font-display">Pandas学习平台</span>
                </div>
                <p className="text-slate-400">
                  从入门到进阶的pandas数据分析实战项目
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                <a href="/" className="text-slate-400 hover:text-white transition-colors duration-300">
                  首页
                </a>
                <a href="/resources" className="text-slate-400 hover:text-white transition-colors duration-300">
                  学习资源
                </a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500">
              <p>&copy; 2026 Pandas学习平台. 保留所有权利.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
