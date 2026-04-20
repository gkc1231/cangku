import React from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import projects from '../../data/projects';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="hero-shape-1 animate-pulse-slow"></div>
        <div className="hero-shape-2 animate-pulse-slow animate-delay-2"></div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary-200 rounded-full px-6 py-2 mb-8 shadow-sm animate-float">
              <span className="text-2xl">🐼</span>
              <span className="text-sm font-medium text-primary-700">Pandas 数据分析实战平台</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark-900 mb-6 leading-tight">
              <span className="text-gradient">从零开始</span>
              <br />
              <span className="text-dark-800">掌握数据分析核心技能</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-dark-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              10个精选实战项目，从入门到进阶<br />
              <span className="font-medium text-primary-600">完全在浏览器中运行代码</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#projects" 
                className="btn-primary text-lg flex items-center gap-2"
              >
                <span>开始学习</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a 
                href="/resources" 
                className="btn-secondary text-lg"
              >
                学习资源
              </a>
            </div>
            
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              {[
                { number: '10', label: '精选项目' },
                { number: '3', label: '难度等级' },
                { number: '∞', label: '浏览器运行' }
              ].map((item, index) => (
                <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-4xl md:text-5xl font-bold text-gradient">
                    {item.number}
                  </div>
                  <div className="text-dark-600 mt-1 font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-800 mb-4">
              精选实战项目
            </h2>
            <p className="text-lg text-dark-600 max-w-2xl mx-auto">
              从基础的数据读取到高级的机器学习数据预处理，循序渐进地学习 pandas 数据分析
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-800 mb-4">
              为什么选择我们
            </h2>
            <p className="text-lg text-dark-600">
              现代化的学习体验，让数据分析学习变得简单有趣
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '💻',
                title: '浏览器中运行',
                description: '无需安装 Python 环境，直接在浏览器中运行和修改代码',
                color: 'from-blue-500 to-cyan-400'
              },
              {
                icon: '📊',
                title: '交互式可视化',
                description: '使用 Plotly 创建交互式图表，直观展示数据分析结果',
                color: 'from-emerald-500 to-green-400'
              },
              {
                icon: '📈',
                title: '从入门到进阶',
                description: '10个精心设计的项目，覆盖从基础到高级的数据分析技能',
                color: 'from-purple-500 to-pink-400'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="glass-effect rounded-2xl p-8 card-hover border-t-4 border-primary-400"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-dark-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-dark-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container">
          <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 rounded-3xl p-12 md:p-16 text-center shadow-2xl">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                准备好开始学习了吗？
              </h2>
              <p className="text-lg text-white/90 mb-8">
                立即开始你的 pandas 数据分析学习之旅
              </p>
              <a 
                href="#projects"
                className="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              >
                <span>浏览项目</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
