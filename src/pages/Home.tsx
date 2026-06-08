import { BookOpen, GraduationCap, ChevronRight, TrendingUp, Code2, Database } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, #dbeafe 2%, transparent 0%), radial-gradient(circle at 75px 75px, #e9d5ff 2%, transparent 0%)',
          backgroundSize: '100px 100px'
        }} />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">
                  <BookOpen className="h-4 w-4" />
                  pandas 数据分析实战
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                  从零开始学习
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {' '}pandas 数据分析
                  </span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  10个精选实战项目，从入门到进阶，让你在浏览器中就能掌握数据分析的核心技能。
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="#projects" className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-gray-900/20 hover:bg-gray-800 transition-colors">
                  开始学习
                  <ChevronRight className="h-4 w-4" />
                </a>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-purple-400" />
                    ))}
                  </div>
                  <span>完全在浏览器中运行</span>
                </div>
              </div>
            </div>

            {/* Profile Card */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl opacity-20 blur-xl" />
              <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex flex-col items-center text-center">
                  <div className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-5xl font-bold text-white shadow-lg mb-6">
                    郭
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">郭楷纯</h2>
                  <p className="text-gray-600 mb-6">广东科学技术职业学院</p>

                  <div className="grid grid-cols-3 gap-4 w-full mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">10</div>
                      <div className="text-xs text-gray-600">实战项目</div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">3</div>
                      <div className="text-xs text-gray-600">难度等级</div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">∞</div>
                      <div className="text-xs text-gray-600">随时学习</div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600 text-left w-full">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="h-5 w-5 text-blue-500 mt-0.5" />
                      <span>系统化学习路径，从入门到高级</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Code2 className="h-5 w-5 text-purple-500 mt-0.5" />
                      <span>实战驱动，每个项目都可直接运行</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Database className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>真实业务场景，涵盖常见数据分析需求</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">10个精选项目</div>
                <div className="text-sm text-gray-600">涵盖数据分析核心技能</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">从入门到精通</div>
                <div className="text-sm text-gray-600">循序渐进的学习曲线</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <Code2 className="h-6 w-6" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">浏览器中运行</div>
                <div className="text-sm text-gray-600">无需配置环境，开箱即用</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              实战项目列表
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              从基础的数据读取操作，到高级的用户行为分析，一步步带你掌握 pandas 数据分析
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="text-center">
            <p className="text-gray-600">
              pandas 数据分析实战课程 · 郭楷纯 · 广东科学技术职业学院
            </p>
            <p className="text-sm text-gray-500 mt-2">
              © 2024 All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
