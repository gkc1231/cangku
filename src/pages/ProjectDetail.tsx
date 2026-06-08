import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { ArrowLeft, Play, BookOpen, Lightbulb, CheckCircle2, XCircle, HelpCircle, Terminal } from 'lucide-react';
import { pyodideRunner } from '../utils/pyodide';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [showOutput, setShowOutput] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [output, setOutput] = useState<string>('');
  const resultsRef = useRef<HTMLDivElement>(null);
  
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

  const handleRunCode = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setShowOutput(true);
    setOutput('正在初始化Python环境...\n（首次加载可能需要10-20秒）\n\n');
    
    try {
      await pyodideRunner.initialize();
      setOutput('Python环境加载成功！正在执行代码...\n\n');
      
      const result = await pyodideRunner.runCode(project.code);
      
      if (result.success) {
        setOutput(result.result || '执行完成！');
      } else {
        setOutput('执行错误: ' + result.error);
      }
    } catch (error) {
      setOutput('错误: ' + (error as Error).message);
    } finally {
      setIsRunning(false);
    }
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

  const handleOptionSelect = (option: string) => {
    if (answered) return;
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || !project?.quiz) return;
    setAnswered(true);
    if (selectedOption === project.quiz.questions[currentQuestion].answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(prev => prev + 1);
    setSelectedOption(null);
    setAnswered(false);
  };

  const handleResetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setAnswered(false);
    setScore(0);
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
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-gray-600" />
                  输出结果
                </h3>
              </div>
              
              <div className="p-6">
                {showOutput ? (
                  <div>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto max-h-80 overflow-y-auto">
                      <pre className="text-green-400 font-mono text-sm leading-relaxed whitespace-pre">
                        {output || '执行中...'}
                      </pre>
                    </div>
                    <div 
                      ref={resultsRef} 
                      id="results" 
                      className="mt-4 space-y-4"
                    ></div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>点击"运行代码"查看输出结果</p>
                    <p className="text-sm mt-2 text-gray-500">首次运行需要加载Python环境，可能需要稍等片刻</p>
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

        {/* 题目测试 */}
        {project.quiz && (
          <div className="mt-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-blue-600" />
                  项目测试
                </h3>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-medium text-gray-700">
                    得分: {score}/{project.quiz.questions.length}
                  </span>
                  <button
                    onClick={handleResetQuiz}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    重新开始
                  </button>
                </div>
              </div>

              {currentQuestion < project.quiz.questions.length ? (
                <div className="space-y-6">
                  {/* 进度条 */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / project.quiz.questions.length) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-500 text-right">
                    第 {currentQuestion + 1} 题 / 共 {project.quiz.questions.length} 题
                  </div>

                  {/* 题目 */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-6">
                      {project.quiz.questions[currentQuestion].question}
                    </h4>

                    {/* 选项 */}
                    <div className="space-y-3">
                      {project.quiz.questions[currentQuestion].options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(option)}
                          disabled={answered}
                          className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 ${
                            selectedOption === option
                              ? answered
                                ? option === project.quiz.questions[currentQuestion].answer
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-red-500 bg-red-50'
                                : 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          } ${answered ? 'cursor-default' : 'cursor-pointer'}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{option}</span>
                            {answered && (
                              option === project.quiz.questions[currentQuestion].answer ? (
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                              ) : selectedOption === option ? (
                                <XCircle className="w-6 h-6 text-red-500" />
                              ) : null
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* 答案反馈 */}
                    {answered && (
                      <div className={`mt-6 p-4 rounded-xl ${
                        selectedOption === project.quiz.questions[currentQuestion].answer
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-red-50 border border-red-200'
                      }`}>
                        <div className="flex items-start gap-3">
                          {selectedOption === project.quiz.questions[currentQuestion].answer ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className={`font-semibold mb-2 ${
                              selectedOption === project.quiz.questions[currentQuestion].answer
                                ? 'text-green-800'
                                : 'text-red-800'
                            }`}>
                              {selectedOption === project.quiz.questions[currentQuestion].answer
                                ? '回答正确！'
                                : '回答错误'}
                            </p>
                            <p className="text-gray-700">
                              {project.quiz.questions[currentQuestion].explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 操作按钮 */}
                    <div className="mt-6 flex justify-end gap-4">
                      {!answered ? (
                        <button
                          onClick={handleSubmitAnswer}
                          disabled={!selectedOption}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          提交答案
                        </button>
                      ) : (
                        <button
                          onClick={handleNextQuestion}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                        >
                          {currentQuestion < project.quiz.questions.length - 1 ? '下一题' : '完成'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* 完成界面 */
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-8">
                    <CheckCircle2 className="w-12 h-12 text-white" />
                  </div>
                  <h4 className="text-3xl font-bold text-gray-900 mb-4">
                    测试完成！
                  </h4>
                  <p className="text-xl text-gray-600 mb-8">
                    你答对了 <span className="font-bold text-blue-600">{score}</span> 题 / 共 {project.quiz.questions.length} 题
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleResetQuiz}
                      className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                    >
                      重新测试
                    </button>
                    <Link
                      to="/"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                    >
                      返回首页
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

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
