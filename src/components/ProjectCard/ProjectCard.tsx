import React from 'react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  id: number;
  title: string;
  difficulty: string;
  description: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, difficulty, description }) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case '入门':
        return 'bg-gradient-to-r from-emerald-500 to-green-500';
      case '中级':
        return 'bg-gradient-to-r from-amber-500 to-orange-500';
      case '高级':
        return 'bg-gradient-to-r from-rose-500 to-red-500';
      default:
        return 'bg-gradient-to-r from-slate-500 to-gray-500';
    }
  };

  const getDifficultyBg = (level: string) => {
    switch (level) {
      case '入门':
        return 'bg-emerald-100 text-emerald-700';
      case '中级':
        return 'bg-amber-100 text-amber-700';
      case '高级':
        return 'bg-rose-100 text-rose-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getGradient = (id: number) => {
    const gradients = [
      'from-blue-500 to-cyan-400',
      'from-emerald-500 to-teal-400',
      'from-purple-500 to-pink-400',
      'from-amber-500 to-orange-400',
      'from-rose-500 to-red-400',
      'from-indigo-500 to-blue-400',
      'from-green-500 to-lime-400',
      'from-violet-500 to-fuchsia-400',
      'from-orange-500 to-amber-400',
      'from-cyan-500 to-blue-400',
    ];
    return gradients[(id - 1) % gradients.length];
  };

  return (
    <Link to={`/project/${id}`} className="block">
      <div className="glass-effect rounded-2xl p-8 card-hover border-l-4 border-primary-400 relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getGradient(id)} opacity-10 rounded-bl-full`}></div>
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getGradient(id)} mb-6 flex items-center justify-center shadow-lg`}>
          <span className="text-2xl font-bold text-white">{id}</span>
        </div>
        
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-dark-800 leading-snug flex-1">
            {title}
          </h3>
        </div>
        
        <div className="mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyBg(difficulty)}`}>
            {difficulty}
          </span>
        </div>
        
        <p className="text-dark-600 mb-6 line-clamp-3 leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors duration-300">
            <span>开始学习</span>
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
