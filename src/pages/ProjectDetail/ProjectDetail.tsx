import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CodeEditor from '../../components/CodeEditor/CodeEditor';
import ResultDisplay from '../../components/ResultDisplay/ResultDisplay';
import { pyodideRunner } from '../../utils/pyodide';
import projects from '../../data/projects';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || '1');
  const [project, setProject] = useState(projects.find(p => p.id === projectId));
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (project) {
      setCode(project.code);
      setSelectedAnswers({});
      setShowResults(false);
    }
  }, [project]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    if (!project?.quiz?.questions) return 0;
    let score = 0;
    project.quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        score++;
      }
    });
    return score;
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setError(null);

    try {
      const result = await pyodideRunner.runCode(code);
      if (!result.success) {
        setError(result.error || '执行错误');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsRunning(false);
    }
  };

  if (!project) {
    return (
      <div className="container py-16">
        <div className="glass-effect rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-dark-800 mb-4">项目不存在</h2>
          <Link to="/" className="text-primary-600 hover:text-primary-700 font-semibold">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen pb-16">
      <div className="container py-8">
        <div className="glass-effect rounded-3xl p-8 md:p-12 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <Link to="/" className="inline-flex items-center gap-2 text-dark-500 hover:text-primary-600 mb-4 transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回项目列表
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
                {project.title}
              </h1>
              <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold ${getDifficultyBg(project.difficulty)}`}>
                {project.difficulty}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-dark-800 mb-3">项目描述</h3>
              <p className="text-dark-600 leading-relaxed">
                {project.description}
              </p>
              
              {project.background && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-dark-800 mb-3">项目背景</h3>
                  <p className="text-dark-600 leading-relaxed">
                    {project.background}
                  </p>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-dark-800 mb-3">学习目标</h3>
              <ul className="space-y-2">
                {project.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2 text-dark-600">
                    <span className="text-accent-500 mt-1">✓</span>
                    {objective}
                  </li>
                ))}
              </ul>
              
              {project.steps && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-dark-800 mb-3">步骤</h3>
                  <ol className="list-decimal list-inside space-y-1 text-dark-600">
                    {project.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
          
          {project.codeExplanation && (
            <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-primary-800 mb-3">代码解释</h3>
              <div className="space-y-3">
                {Object.entries(project.codeExplanation as Record<string, string>).map(([key, value], index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-primary-600 font-medium min-w-24">{key}:</span>
                    <span className="text-primary-700">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.expectedOutput && (
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">预期输出</h3>
                <p className="text-blue-700 leading-relaxed">
                  {project.expectedOutput}
                </p>
              </div>
            )}
            
            {project.challenges && (
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-amber-800 mb-3">挑战</h3>
                <ul className="space-y-1 text-amber-700">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-amber-600">•</span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {project.extensions && (
            <div className="mt-8 bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-3">扩展任务</h3>
              <ul className="space-y-1 text-emerald-700">
                {project.extensions.map((extension, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-emerald-600">•</span>
                    {extension}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.quiz && (
            <div className="mt-8 bg-purple-50 border border-purple-100 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-purple-800">📝 项目测验</h3>
                {!showResults ? (
                  <button
                    onClick={handleSubmitQuiz}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    提交答案
                  </button>
                ) : (
                  <button
                    onClick={handleResetQuiz}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    重新测试
                  </button>
                )}
              </div>

              {showResults && (
                <div className="mb-6 p-4 bg-white rounded-xl border border-purple-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-700">
                      {calculateScore()} / {project.quiz.questions.length}
                    </div>
                    <div className="text-purple-600 mt-1">
                      {Math.round((calculateScore() / project.quiz.questions.length) * 100)}% 正确
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {project.quiz.questions.map((question, index) => {
                  const isSelected = selectedAnswers[index] !== undefined;
                  const isCorrect = showResults && selectedAnswers[index] === question.answer;
                  const isWrong = showResults && isSelected && selectedAnswers[index] !== question.answer;

                  return (
                    <div key={index} className="p-4 bg-white rounded-xl border border-purple-200">
                      <div className="font-medium text-purple-900 mb-3">
                        {index + 1}. {question.question}
                      </div>
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => {
                          let className = "p-3 rounded-lg border-2 cursor-pointer transition-all";
                          if (showResults) {
                            if (option === question.answer) {
                              className += " bg-emerald-100 border-emerald-400 text-emerald-800";
                            } else if (option === selectedAnswers[index] && option !== question.answer) {
                              className += " bg-rose-100 border-rose-400 text-rose-800";
                            } else {
                              className += " bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed";
                            }
                          } else {
                            if (selectedAnswers[index] === option) {
                              className += " bg-purple-100 border-purple-400 text-purple-800";
                            } else {
                              className += " bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100";
                            }
                          }

                          return (
                            <div
                              key={optIndex}
                              className={className}
                              onClick={() => !showResults && handleAnswerSelect(index, option)}
                            >
                              {option}
                            </div>
                          );
                        })}
                      </div>

                      {showResults && (
                        <div className={`mt-4 p-3 rounded-lg ${isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
                          <div className="font-medium mb-1">
                            {isCorrect ? '✓ 回答正确！' : '✗ 回答错误'}
                          </div>
                          <div className="text-sm">{question.explanation}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-[600px]">
            <CodeEditor
              initialCode={code}
              onCodeChange={handleCodeChange}
              onRun={handleRunCode}
              isRunning={isRunning}
            />
          </div>
          <div className="h-[600px]">
            <ResultDisplay isRunning={isRunning} error={error} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;