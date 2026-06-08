import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { BookOpen, Code, TrendingUp, Award } from 'lucide-react';

const Home = () => {
  const stats = [
    { icon: BookOpen, label: '精选项目', value: '10' },
    { icon: TrendingUp, label: '难度等级', value: '3' },
    { icon: Code, label: '浏览器运行', value: '∞' },
    { icon: Award, label: '学习收益', value: '100%' },
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 个人介绍区域 */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-medium mb-4">
                👋 欢迎来到学习平台
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              你好，我是郭楷纯
            </h1>
            
            <p className="text-2xl mb-4 opacity-90">
              广东科学技术职业学院 · 商学院
            </p>
            
            <p className="text-xl text-blue-100 mb-8">
              商务数据分析与应用专业 · 学生
            </p>
            
            <div className="w-24 h-1 bg-white/50 mx-auto mb-12 rounded-full"></div>
            
            <p className="text-lg leading-relaxed max-w-3xl mx-auto mb-12">
              这是我创建的数据分析学习平台，包含10个精选Pandas实战项目。
              从零开始，通过浏览器直接运行代码，帮助你掌握数据分析核心技能。
              无需配置环境，随时随地开始学习之旅！
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#projects"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                开始学习 →
              </a>
              <a
                href="#about"
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-colors border border-white/30"
              >
                了解更多
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 统计信息 */}
      <section className="py-16 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 项目列表 */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              🐼 Pandas 精选实战项目
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              从基础的数据读取到高级的机器学习数据预处理，循序渐进地学习 pandas 数据分析
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-5xl font-bold text-gray-200 group-hover:text-blue-200 transition-colors">
                      {project.id}
                    </span>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${getDifficultyColor(
                        project.difficulty
                      )}`}
                    >
                      {project.difficulty}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {(project.concepts || project.objectives || []).slice(0, 3).map((concept, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <span className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                      开始学习 →
                    </span>
                    <span className="text-gray-400 text-sm">
                      {(project.concepts || project.objectives || []).length} 个知识点
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 为什么选择我们 */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">✨ 为什么选择我们</h2>
            <p className="text-xl text-gray-300">
              现代化的学习体验，让数据分析学习变得简单有趣
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
                <span className="text-4xl">💻</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">浏览器中运行</h3>
              <p className="text-gray-300">
                无需安装 Python 环境，直接在浏览器中运行和修改代码
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl mb-6">
                <span className="text-4xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">交互式可视化</h3>
              <p className="text-gray-300">
                使用 Plotly 创建交互式图表，直观展示数据分析结果
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-6">
                <span className="text-4xl">📈</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">从入门到进阶</h3>
              <p className="text-gray-300">
                多个精心设计的项目，覆盖从基础到高级的数据分析技能
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">准备好开始学习了吗？</h2>
          <p className="text-xl text-blue-100 mb-8">
            立即开始你的 pandas 数据分析学习之旅
          </p>
          <a
            href="#projects"
            className="inline-block bg-white text-blue-600 px-12 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            浏览项目 →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2026 郭楷纯 - 广东科学技术职业学院 · 商学院</p>
          <p className="text-gray-400 text-sm">商务数据分析与应用专业</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
