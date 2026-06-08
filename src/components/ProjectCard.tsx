import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const difficultyConfig = {
  beginner: { label: '入门', color: 'bg-green-100 text-green-700', bg: 'from-green-50 to-emerald-50' },
  intermediate: { label: '进阶', color: 'bg-blue-100 text-blue-700', bg: 'from-blue-50 to-indigo-50' },
  advanced: { label: '高级', color: 'bg-purple-100 text-purple-700', bg: 'from-purple-50 to-pink-50' },
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = Icons[project.icon as keyof typeof Icons] || Icons.BookOpen;
  const config = difficultyConfig[project.difficulty];

  return (
    <Link
      to={`/project/${project.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative block overflow-hidden rounded-2xl border bg-gradient-to-br ${config.bg} p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="flex items-start justify-between">
        <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="h-7 w-7 text-gray-700" />
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${config.color}`}>
          {config.label}
        </span>
      </div>
      
      <div className="mt-5">
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {project.description}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.objectives.slice(0, 3).map((objective, i) => (
          <span
            key={i}
            className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/70 text-xs text-gray-700"
          >
            <Icons.CheckCircle className="mr-1 h-3 w-3 text-green-500" />
            {objective}
          </span>
        ))}
        {project.objectives.length > 3 && (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/70 text-xs text-gray-500">
            +{project.objectives.length - 3} 更多
          </span>
        )}
      </div>

      <div className="mt-6 flex items-center text-sm font-medium text-gray-700">
        开始学习
        <Icons.ArrowRight
          className={`ml-2 h-4 w-4 transition-transform duration-300 ${
            isHovered ? 'translate-x-1' : ''
          }`}
        />
      </div>
    </Link>
  );
}
