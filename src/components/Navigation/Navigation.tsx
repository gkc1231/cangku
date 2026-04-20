import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
      <div className="container py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
              <span className="text-xl">🐼</span>
            </div>
            <span className="text-xl font-bold text-gradient font-display">
              Pandas学习
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-dark-600 hover:bg-slate-100 hover:text-dark-800'
              }`}
            >
              首页
            </Link>
            <Link 
              to="/resources" 
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                isActive('/resources') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-dark-600 hover:bg-slate-100 hover:text-dark-800'
              }`}
            >
              学习资源
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
