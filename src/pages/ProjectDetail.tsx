import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Target, BookOpen, ChevronRight, ChevronLeft } from 'lucide-react';
import * as Icons from 'lucide-react';
import { projects } from '../data/projects';
import CodeEditor from '../components/CodeEditor';

const difficultyConfig = {
  beginner: { label: '入门', color: 'text-green-600', bg: 'bg-green-100' },
  intermediate: { label: '进阶', color: 'text-blue-600', bg: 'bg-blue-100' },
  advanced: { label: '高级', color: 'text-purple-600', bg: 'bg-purple-100' },
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectId = parseInt(id || '1');
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">项目未找到</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = projects.findIndex(p => p.id === projectId);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  const Icon = Icons[project.icon as keyof typeof Icons] || Icons.BookOpen;
  const config = difficultyConfig[project.difficulty];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              返回首页
            </Link>
            <div className="flex items-center gap-4">
              {prevProject && (
                <button
                  onClick={() => navigate(`/project/${prevProject.id}`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  上一个
                </button>
              )}
              {nextProject && (
                <button
                  onClick={() => navigate(`/project/${nextProject.id}`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  下一个
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Project Info */}
        <div className="mb-8">
          <div className="flex items-start gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
              <Icon className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${config.bg} ${config.color}`}>
                  {config.label}
                </span>
                <span className="text-sm text-gray-500">
                  项目 {project.id} / {projects.length}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {project.title}
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl">
                {project.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Content */}
          <div className="lg:col-span-1 space-y-6">
            {/* Objectives */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Target className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">学习目标</h2>
              </div>
              <ul className="space-y-3">
                {project.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Explanation */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">项目说明</h2>
              </div>
              <div className="text-gray-700 leading-relaxed">
                {project.explanation}
              </div>
            </div>
          </div>

          {/* Right - Code Editor */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <CodeEditor initialCode={project.code} />
            </div>
          </div>
        </div>

        {/* Navigation Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between">
            {prevProject && (
              <button
                onClick={() => navigate(`/project/${prevProject.id}`)}
                className="group flex items-center gap-3 text-left"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-600 group-hover:bg-gray-200 transition-colors">
                  <ChevronLeft className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">上一个项目</div>
                  <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {prevProject.title}
                  </div>
                </div>
              </button>
            )}
            <div className="flex-1" />
            {nextProject && (
              <button
                onClick={() => navigate(`/project/${nextProject.id}`)}
                className="group flex items-center gap-3 text-right"
              >
                <div>
                  <div className="text-sm text-gray-500">下一个项目</div>
                  <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {nextProject.title}
                  </div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-white group-hover:bg-gray-800 transition-colors">
                  <ChevronRight className="h-5 w-5" />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
