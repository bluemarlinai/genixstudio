
import React from 'react';
import { ViewState } from '../types';

interface LandingPageProps {
  onStart: (view: ViewState) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const latestPosts = [
    {
      id: 'b1',
      title: '如何利用 Genix Studio 打造个人品牌',
      excerpt: '在数字时代，个人品牌是每一位创作者的核心资产。我们将探讨如何利用 AI 工具集完成品牌跃迁...',
      category: '指南',
      image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'b2',
      title: '2024 内容创作趋势报告',
      excerpt: '多模态 AI 与短视频的结合正在重塑我们的消费习惯，创作者应如何应对？',
      category: '行业',
      image: 'https://images.unsplash.com/photo-1551288049-bbdac8a28a80?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'b3',
      title: '从 0 到 1：新手创作者的效率手册',
      excerpt: '跳过繁琐的排版，直达内容的本质。这本手册将带你快速上手全栈创作流。',
      category: '教程',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const testimonials = [
    {
      name: '陈静仪',
      role: '资深科技博主',
      avatar: 'https://picsum.photos/seed/user1/100/100',
      content: 'Genix Studio 彻底改变了我的写作流。以前排版 and 分发要花掉我半天时间，现在 AI 帮我处理了一切，我只需要专注于我的思考。',
      platform: '微信公众号'
    },
    {
      name: 'Liam Zhang',
      role: '独立摄影师 / Vlogger',
      avatar: 'https://picsum.photos/seed/user2/100/100',
      content: '多模态素材融合功能非常惊艳。它能根据我的文字意境生成配图或短视频。这让我的文章看起来像专业杂志一样精美。',
      platform: 'Medium'
    },
    {
      name: '王小野',
      role: '知识博主',
      avatar: 'https://picsum.photos/seed/user3/100/100',
      content: '全平台一键发布解决了我最大的痛点。数据看板也非常直观，我能清晰地看到自己的品牌影响力在稳步攀升。',
      platform: '知乎'
    }
  ];

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-primary/30 scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-gray-100">
        <div className="w-full px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-lg shadow-primary/10">
              <img src="/logo.png" alt="Genix Studio Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-black tracking-tight text-studio-dark">Genix Studio</span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-sm font-semibold text-studio-sub hover:text-primary transition-colors">核心功能</a>
            <a href="#testimonials" className="text-sm font-semibold text-studio-sub hover:text-primary transition-colors">创作者评价</a>
            <button 
              onClick={() => onStart('BLOG')}
              className="text-sm font-semibold text-studio-sub hover:text-primary transition-colors"
            >
              官方博客
            </button>
            <button 
              onClick={() => onStart('LOGIN')}
              className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-full shadow-lg shadow-primary/25 hover:scale-105 active:scale-95 transition-all"
            >
              免费开始创作
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-bold text-primary tracking-wider uppercase">个人博主首选工作台</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-studio-dark leading-[1.1] mb-8 tracking-tight">
            赋能个体表达，<br />
            重定义<span className="text-primary italic">内容生产力</span>
          </h1>
          <p className="text-xl text-studio-sub max-w-2xl mx-auto mb-12 leading-relaxed">
            专为独立创作者打造的智能工作室。集成了最新的 Gemini 极致算力，助你完成从灵感挖掘到多端分发的全部效率闭环。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => onStart('LOGIN')}
              className="w-full sm:w-auto px-10 py-4 bg-primary text-white text-lg font-bold rounded-2xl shadow-xl shadow-primary/30 hover:-translate-y-1 transition-all"
            >
              免费加入
            </button>
            <button 
              onClick={() => onStart('DEMO_VIEW')}
              className="w-full sm:w-auto px-10 py-4 bg-white border border-studio-border text-lg font-bold rounded-2xl hover:bg-studio-bg transition-all"
            >
              观看演示
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-studio-bg/50">
        <div className="w-full px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4">专注个人创作效率</h2>
            <p className="text-studio-sub">剔除复杂流程，只为你的创作加速</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: 'bolt', title: '极速编辑器', desc: '秒开体验，支持 AI 实时润色与结构建议，彻底告别灵感枯竭。' },
              { icon: 'share_reviews', title: '全能分发', desc: '针对个人账号优化的同步策略，一键发布至你的所有数字主场。' },
              { icon: 'analytics', title: '个人洞察', desc: '直观的数据反馈，帮你理解读者喜好，优化个人品牌影响力。' },
            ].map((f, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-white border border-transparent hover:border-primary/20 hover:shadow-xl transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[32px]">{f.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p className="text-studio-sub leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white overflow-hidden">
        <div className="w-full px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="text-4xl font-black tracking-tight text-studio-dark mb-6 leading-tight">
                来自<span className="text-primary underline decoration-primary/20 underline-offset-8">顶尖创作者</span>的认可
              </h2>
              <p className="text-lg text-studio-sub leading-relaxed font-medium">
                成千上万的独立博主、作家和教育者正在使用 Genix Studio 构建他们的数字帝国。
              </p>
            </div>
            <div className="flex -space-x-4">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="w-14 h-14 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-sm transition-transform hover:-translate-y-2 cursor-pointer">
                    <img src={`https://picsum.photos/seed/face${i}/100/100`} alt="user" />
                 </div>
               ))}
               <div className="w-14 h-14 rounded-full border-4 border-white bg-primary flex items-center justify-center text-white text-xs font-black shadow-lg">
                  +2k
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-studio-bg/30 p-8 rounded-[40px] border border-studio-border hover:bg-white hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between">
                <div className="space-y-6">
                  <span className="material-symbols-outlined text-primary/30 text-5xl font-black">format_quote</span>
                  <p className="text-base text-studio-dark leading-relaxed font-medium">
                    "{t.content}"
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-10">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-studio-dark">{t.name}</h4>
                    <p className="text-[10px] text-studio-sub font-bold uppercase tracking-widest mt-0.5">{t.role} · {t.platform}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-32 bg-studio-bg/50 overflow-hidden">
        <div className="w-full px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
            <div className="space-y-8">
              <h2 className="text-4xl font-black leading-tight">重新定义<br />独立创作者的工作流</h2>
              <p className="text-lg text-studio-sub leading-relaxed">
                我们相信，伟大的内容不应该受困于繁杂的排版与分发流程。Genix Studio 将 AI 的智慧注入每一个像素，让你可以专注于讲述故事，剩下的交给我们。
              </p>
              <div className="flex gap-10">
                <div>
                  <p className="text-3xl font-black text-primary">10x</p>
                  <p className="text-xs font-bold text-studio-sub uppercase tracking-widest mt-2">效率提升</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-primary">100%</p>
                  <p className="text-xs font-bold text-studio-sub uppercase tracking-widest mt-2">多端适配</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white rounded-[60px] relative overflow-hidden shadow-2xl border border-studio-border">
                 <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Vision" />
                 <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm"></div>
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 p-6 bg-white rounded-3xl shadow-2xl border border-studio-border animate-bounce-slow">
                 <div className="flex items-center gap-3 mb-4">
                   <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                     <span className="material-symbols-outlined text-[18px]">verified</span>
                   </div>
                   <span className="text-xs font-bold">内容已安全发布</span>
                 </div>
                 <div className="h-2 w-full bg-studio-bg rounded-full overflow-hidden">
                   <div className="h-full bg-green-500 w-full"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24 bg-white">
        <div className="w-full px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-studio-dark">官方博客：见证灵感的生长</h2>
              <p className="text-studio-sub mt-2">分享产品路线图、深度案例分析与创作者访谈。</p>
            </div>
            <button 
              onClick={() => onStart('BLOG')}
              className="text-sm font-black text-primary hover:underline flex items-center gap-2 uppercase tracking-widest"
            >
              浏览全部文章
              <span className="material-symbols-outlined">arrow_right_alt</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <div 
                key={post.id} 
                onClick={() => onStart('BLOG')}
                className="group cursor-pointer bg-white rounded-[40px] overflow-hidden border border-studio-border hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
                </div>
                <div className="p-8 space-y-4">
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-black text-studio-dark leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-studio-sub leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-studio-dark text-white pt-20 pb-10">
        <div className="w-full px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="space-y-6 max-w-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-white/5">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-lg font-black tracking-tight">Genix Studio</span>
              </div>
              <p className="text-studio-sub text-sm leading-relaxed">
                重新定义个人创作者的工作方式。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-16">
              <div>
                <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary">资源</h4>
                <ul className="space-y-4 text-sm text-studio-sub">
                  <li><button onClick={() => onStart('HELP')} className="hover:text-white transition-colors">帮助中心</button></li>
                  <li><button onClick={() => onStart('BLOG')} className="hover:text-white transition-colors">官方博客</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary">法律</h4>
                <ul className="space-y-4 text-sm text-studio-sub">
                  <li><button onClick={() => onStart('TERMS')} className="hover:text-white transition-colors">服务条款</button></li>
                  <li><button onClick={() => onStart('PRIVACY')} className="hover:text-white transition-colors">隐私政策</button></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center">
            <p className="text-xs text-studio-sub">© 2024 Genix Studio (genixstudio.ai). 为独立创作者而生。</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
