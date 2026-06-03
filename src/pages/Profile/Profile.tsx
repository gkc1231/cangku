import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container">
        {/* Hero Profile Section */}
        <section className="mb-16">
          <div className="glass-effect rounded-3xl p-8 md:p-12 text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-2xl">
              <span className="text-6xl">👨‍💻</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-dark-900 mb-4">
              欢迎来到我的个人主页
            </h1>
            <p className="text-xl text-dark-600 max-w-2xl mx-auto">
              数据分析师 | 开发者 | 终身学习者
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a 
                href="#about" 
                className="btn-primary"
              >
                关于我
              </a>
              <a 
                href="#projects" 
                className="btn-secondary"
              >
                查看项目
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="glass-effect rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-dark-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">📋</span>
                关于我
              </h2>
              <div className="space-y-4 text-dark-700">
                <p className="text-lg leading-relaxed">
                  我是一名热爱数据分析的开发者，热衷于用数据洞察世界。通过Pandas等工具，
                  将杂乱无章的数据转化为有价值的洞察。
                </p>
                <p className="text-lg leading-relaxed">
                  我相信数据是21世纪的新石油，而数据分析的能力是将这一资源转化为财富的关键。
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: '🎯', label: '职业', value: '数据分析师' },
                  { icon: '📍', label: '位置', value: '中国' },
                  { icon: '💼', label: '经验', value: '多年实战' },
                  { icon: '🌟', label: '爱好', value: '学习新技术' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div className="text-sm text-dark-500">{item.label}</div>
                    <div className="font-semibold text-dark-800">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-dark-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">🛠️</span>
                技术栈
              </h2>
              <div className="space-y-6">
                {[
                  { category: '数据分析', skills: ['Python', 'Pandas', 'NumPy', 'SQL'] },
                  { category: '可视化', skills: ['Matplotlib', 'Plotly', 'Seaborn'] },
                  { category: '机器学习', skills: ['Scikit-learn', 'TensorFlow', 'PyTorch'] },
                  { category: 'Web开发', skills: ['React', 'TypeScript', 'Node.js'] }
                ].map((tech, idx) => (
                  <div key={idx}>
                    <h3 className="font-semibold text-dark-700 mb-3">{tech.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {tech.skills.map((skill, skillIdx) => (
                        <span 
                          key={skillIdx}
                          className="px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section id="projects" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-800 mb-4">
              我的项目
            </h2>
            <p className="text-lg text-dark-600 max-w-2xl mx-auto">
              精选的数据分析项目，展示我的学习成果
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-effect rounded-2xl p-8 card-hover border-l-4 border-primary-500">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-3xl">🐼</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-dark-800 mb-2">
                    Pandas数据分析实战项目
                  </h3>
                  <p className="text-dark-600 mb-4">
                    10个精选实战项目，从入门到进阶，完全在浏览器中运行代码，
                    包含数据读取、清洗、分析和可视化的完整流程。
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Pandas', 'Python', '数据可视化', '机器学习'].map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-slate-100 text-dark-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a href="/" className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors">
                    <span>查看项目</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-8 card-hover border-l-4 border-accent-500">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-3xl">🛒</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-dark-800 mb-2">
                    购物车关联规则挖掘
                  </h3>
                  <p className="text-dark-600 mb-4">
                    使用Apriori算法进行购物车关联规则挖掘，发现商品间的购买关联，
                    提供商业洞察和营销建议。
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['数据挖掘', '关联规则', 'Apriori', '商业分析'].map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-slate-100 text-dark-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-dark-500 text-sm">
                    📄 分析报告已准备好
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-16">
          <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              联系我
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              如果你对数据分析、项目合作或技术交流感兴趣，欢迎联系我！
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: '📧', label: '邮箱', value: 'hello@example.com' },
                { icon: '💻', label: 'GitHub', value: '@githubuser' },
                { icon: '💬', label: '微信', value: 'wechat_id' }
              ].map((contact, idx) => (
                <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-white">
                  <div className="text-3xl mb-2">{contact.icon}</div>
                  <div className="text-white/80 text-sm mb-1">{contact.label}</div>
                  <div className="font-semibold">{contact.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
