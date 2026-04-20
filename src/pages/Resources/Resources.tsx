import React from 'react';

const Resources: React.FC = () => {
  const resourceCategories = [
    {
      title: '基础教程',
      icon: '📚',
      color: 'from-blue-500 to-cyan-400',
      resources: [
        {
          title: 'Pandas官方文档 - 入门教程',
          description: '官方提供的入门级教程，适合零基础学习',
          link: 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html'
        },
        {
          title: 'Pandas官方文档 - 用户指南',
          description: '详细的用户指南，深入了解各种功能',
          link: 'https://pandas.pydata.org/docs/user_guide/index.html'
        },
        {
          title: 'Python Pandas Tutorial (YouTube)',
          description: '视频教程系列，边看边学',
          link: 'https://www.youtube.com/playlist?list=PL-osiE80TeTsWmV9i9c58mdDCSskIFdDS'
        }
      ]
    },
    {
      title: '进阶资源',
      icon: '🚀',
      color: 'from-purple-500 to-pink-400',
      resources: [
        {
          title: 'Python for Data Analysis (Book)',
          description: '经典数据分析书籍，由Pandas作者编写',
          link: 'https://www.oreilly.com/library/view/python-for-data/9781449323592/'
        },
        {
          title: 'Pandas高级用法',
          description: '探索Pandas的高级功能和技巧',
          link: 'https://pandas.pydata.org/pandas-docs/stable/user_guide/advanced.html'
        },
        {
          title: 'Data Science with Python (Coursera)',
          description: '完整的数据科学课程，包含Pandas',
          link: 'https://www.coursera.org/specializations/data-science-python'
        }
      ]
    },
    {
      title: '最佳实践',
      icon: '✨',
      color: 'from-emerald-500 to-green-400',
      resources: [
        {
          title: '使用向量化操作而非循环',
          description: '提高代码运行效率的重要技巧'
        },
        {
          title: '合理使用索引和列名',
          description: '让数据更具可读性和可维护性'
        },
        {
          title: '处理缺失值和异常值',
          description: '数据清洗的重要步骤'
        },
        {
          title: '使用合适的数据类型',
          description: '减少内存使用，提升性能'
        },
        {
          title: '定期使用数据检查',
          description: '确保数据质量'
        }
      ]
    },
    {
      title: '常见问题',
      icon: '❓',
      color: 'from-amber-500 to-orange-400',
      resources: [
        {
          title: '如何处理缺失值？',
          description: '使用df.fillna()或df.dropna()方法'
        },
        {
          title: '如何合并多个数据集？',
          description: '使用pd.merge()或df.join()方法'
        },
        {
          title: '如何提高pandas代码性能？',
          description: '使用向量化操作、避免链式赋值、合理使用索引'
        }
      ]
    },
    {
      title: '数据集资源',
      icon: '📊',
      color: 'from-indigo-500 to-blue-400',
      resources: [
        {
          title: 'Seaborn内置数据集',
          description: '经典数据集，适合练习',
          link: 'https://github.com/mwaskom/seaborn-data'
        },
        {
          title: 'UCI机器学习数据集',
          description: '大量机器学习数据集',
          link: 'https://archive.ics.uci.edu/ml/datasets.php'
        },
        {
          title: 'Kaggle数据集',
          description: '海量优质数据集',
          link: 'https://www.kaggle.com/datasets'
        }
      ]
    },
    {
      title: '相关工具和库',
      icon: '🔧',
      color: 'from-rose-500 to-red-400',
      resources: [
        {
          title: 'NumPy',
          description: '数值计算库，Pandas基础',
          link: 'https://numpy.org/'
        },
        {
          title: 'Matplotlib',
          description: '基础数据可视化库',
          link: 'https://matplotlib.org/'
        },
        {
          title: 'Seaborn',
          description: '统计数据可视化库',
          link: 'https://seaborn.pydata.org/'
        },
        {
          title: 'Plotly',
          description: '交互式数据可视化库',
          link: 'https://plotly.com/python/'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pb-16">
      <div className="container py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-primary-200 rounded-full px-6 py-2 mb-6 shadow-sm">
            <span className="text-2xl">📚</span>
            <span className="text-sm font-medium text-primary-700">学习资源</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
            <span className="text-gradient">Pandas</span> 学习资源
          </h1>
          <p className="text-xl text-dark-600 max-w-2xl mx-auto">
            从入门到精通的完整资源集合，帮助你掌握数据分析核心技能
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {resourceCategories.map((category, index) => (
            <div key={index} className="glass-effect rounded-2xl p-8 card-hover">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h2 className="text-2xl font-bold text-dark-800">{category.title}</h2>
              </div>

              <div className="space-y-4">
                {category.resources.map((resource, resourceIndex) => (
                  <div key={resourceIndex} className="bg-white/50 rounded-xl p-4 border border-slate-200/50 hover:border-primary-200 transition-colors duration-300">
                    {resource.link ? (
                      <a href={resource.link} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="flex items-start gap-3">
                          <svg className="w-6 h-6 text-primary-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <div>
                            <h3 className="font-semibold text-dark-800 hover:text-primary-600 transition-colors duration-300">
                              {resource.title}
                            </h3>
                            <p className="text-sm text-dark-600 mt-1">{resource.description}</p>
                          </div>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-accent-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <h3 className="font-semibold text-dark-800">{resource.title}</h3>
                          <p className="text-sm text-dark-600 mt-1">{resource.description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-3xl">💡</span>
            </div>
            <h3 className="text-xl font-bold text-dark-800 mb-3">开始你的学习之旅</h3>
            <p className="text-dark-600 mb-6">
              回到首页，选择一个项目开始实践吧！
            </p>
            <a href="/" className="inline-flex items-center gap-2 btn-primary">
              查看所有项目
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
