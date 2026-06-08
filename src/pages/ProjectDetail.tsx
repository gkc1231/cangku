import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { ArrowLeft, Play, BookOpen, Lightbulb } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [showOutput, setShowOutput] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  
  const project = projects.find(p => p.id === parseInt(id || '1'));

  useEffect(() => {
    if (project) {
      window.scrollTo(0, 0);
    }
  }, [id, project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">项目未找到</h2>
          <Link to="/" className="text-blue-600 hover:underline">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setShowOutput(true);
    }, 1500);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '入门':
        return 'bg-green-100 text-green-800';
      case '中级':
        return 'bg-yellow-100 text-yellow-800';
      case '高级':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回项目列表
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-6xl font-bold opacity-20">#{project.id}</span>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${getDifficultyColor(
                    project.difficulty
                  )}`}
                >
                  {project.difficulty}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
              <p className="text-xl text-blue-100">{project.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 代码编辑器 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gray-900 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-400 text-sm">Python</span>
            </div>
            
            <div className="bg-gray-800 p-6 overflow-x-auto">
              <pre className="text-gray-100 font-mono text-sm leading-relaxed whitespace-pre">
                {project.code}
              </pre>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
              <div className="flex items-center gap-2 text-gray-600">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">{project.code.split('\n').length} 行代码</span>
              </div>
              
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isRunning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    运行中...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    运行代码
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 输出结果 */}
          <div className="space-y-6">
            {/* 学习要点 */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
                学习要点
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {(project.concepts || project.objectives || []).map((concept, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg px-4 py-3 text-gray-700 font-medium shadow-sm"
                  >
                    {concept}
                  </div>
                ))}
              </div>
            </div>

            {/* 输出结果 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gray-100 px-6 py-4 border-b">
                <h3 className="font-bold text-gray-900">输出结果</h3>
              </div>
              
              <div className="p-6">
                {showOutput ? (
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 font-mono text-sm leading-relaxed whitespace-pre">
                      {project.sampleOutput}
                    </pre>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>点击"运行代码"查看输出结果</p>
                  </div>
                )}
              </div>
            </div>

            {/* 项目说明 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">项目说明</h3>
              <p className="text-gray-600 leading-relaxed">{project.explanation}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between">
          {project.id > 1 && (
            <Link
              to={`/project/${project.id - 1}`}
              className="bg-white rounded-lg shadow-md px-6 py-3 hover:shadow-lg transition-shadow flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              上一个项目
            </Link>
          )}
          
          {project.id < projects.length && (
            <Link
              to={`/project/${project.id + 1}`}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md px-6 py-3 hover:shadow-lg transition-shadow ml-auto flex items-center gap-2"
            >
              下一个项目
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
