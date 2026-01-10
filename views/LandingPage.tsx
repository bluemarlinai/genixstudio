
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
    <div className="bg-white min-h-screen font-sans selection:bg-primary/30 scroll-smooth overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100/50">
        <div className="w-full px-6 md:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-black tracking-tighter text-studio-dark uppercase">Genix<span className="text-primary italic">Studio</span></span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-[11px] font-black uppercase tracking-widest text-studio-sub hover:text-primary transition-colors">核心功能</a>
            <a href="#testimonials" className="text-[11px] font-black uppercase tracking-widest text-studio-sub hover:text-primary transition-colors">创作者评价</a>
            <button onClick={() => onStart('BLOG')} className="text-[11px] font-black uppercase tracking-widest text-studio-sub hover:text-primary transition-colors">官方博客</button>
            <button 
              onClick={() => onStart('LOGIN')}
              className="px-8 py-3 bg-studio-dark text-white text-[11px] font-black rounded-full shadow-2xl hover:bg-black active:scale-95 transition-all uppercase tracking-widest"
            >
              免费开始创作
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Enhanced Visuals */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        {/* Animated Background Decor */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full animate-pulse"></div>
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full"></div>
           <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(#137fec10 1.5px, transparent 1.5px)', backgroundSize: '40px 40px'}}></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-studio-bg border border-studio-border mb-10 animate-in slide-in-from-top-4 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-ping"></span>
            <span className="text-[10px] font-black text-studio-dark tracking-[0.2em] uppercase">Gemini 3 Pro 已深度集成</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-studio-dark leading-[0.95] mb-10 tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-1000">
            赋能个体表达<br />
            重塑<span className="text-primary italic underline decoration-primary/10 underline-offset-[12px]">生产力美学</span>
          </h1>
          <p className="text-lg md:text-xl text-studio-sub max-w-3xl mx-auto mb-16 leading-relaxed font-medium opacity-80 animate-in fade-in duration-1000 delay-300">
            专为独立创作者打造的智能内容工坊。集成了最极致的算力与最优雅的排版引擎，助你完成从灵感挖掘到全网分发的闭环。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in zoom-in-95 duration-1000 delay-500">
            <button 
              onClick={() => onStart('LOGIN')}
              className="w-full sm:w-auto px-12 py-5 bg-primary text-white text-sm font-black rounded-[24px] shadow-[0_20px_40px_-10px_rgba(19,127,236,0.4)] hover:-translate-y-1 hover:shadow-[0_25px_50px_-12px_rgba(19,127,236,0.5)] active:scale-95 transition-all uppercase tracking-widest"
            >
              开启创作中心
            </button>
            <button 
              onClick={() => onStart('DEMO_VIEW')}
              className="w-full sm:w-auto px-12 py-5 bg-white border border-studio-border text-sm font-black text-studio-dark rounded-[24px] hover:bg-studio-bg transition-all uppercase tracking-widest flex items-center gap-3"
            >
              <span className="material-symbols-outlined text-[20px]">play_circle</span>
              观看演示
            </button>
          </div>
        </div>

        {/* Featured App Preview Mockup */}
        <div className="mt-24 max-w-6xl mx-auto relative animate-in slide-in-from-bottom-20 duration-1000 delay-700">
           <div className="relative rounded-[40px] border-[12px] border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden aspect-[16/10] bg-studio-bg ring-1 ring-studio-border/50">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover" 
                alt="App Interface Preview" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-studio-dark/20 to-transparent"></div>
              {/* Floating UI Badges */}
              <div className="absolute top-10 left-10 p-4 bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-white/50 animate-bounce-slow">
                 <div className="flex items-center gap-2 mb-2">
                   <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                   <span className="text-[10px] font-black uppercase tracking-widest">AI 自动排版中</span>
                 </div>
                 <div className="h-1 w-24 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-2/3"></div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-20 border-y border-studio-border/50 bg-studio-bg/30">
        <div className="w-full px-6 flex flex-col items-center">
          <p className="text-[9px] font-black text-studio-sub uppercase tracking-[0.4em] mb-12">Trusted by Creators from</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
            {['WeChat', 'Zhihu', 'Medium', 'Substack', 'Bilibili'].map(name => (
              <span key={name} className="text-xl font-black italic tracking-tighter text-studio-dark">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Skew Cards */}
      <section id="features" className="py-32 bg-white relative">
        <div className="w-full px-6 md:px-12">
          <div className="text-center mb-24 max-w-2xl mx-auto">
            <h2 className="text-4xl font-black mb-6 tracking-tight text-studio-dark">专为个体创作者设计的工具链</h2>
            <p className="text-studio-sub font-medium">我们剔除了企业级软件的冗余，保留了内容创作最核心的快感。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'bolt', title: '极速排版引擎', desc: '基于 Tiptap 深度定制，秒开体验，支持 100+ 专业设计模板一键套用。', color: 'bg-primary' },
              { icon: 'share_reviews', title: '全能分发矩阵', desc: '针对微信、知乎、Medium 等主流平台优化的同步策略，预览即所得。', color: 'bg-indigo-600' },
              { icon: 'analytics', title: '深度数据洞察', desc: '直观的可视化仪表盘，实时追踪品牌影响力的每一刻增长。', color: 'bg-rose-500' },
            ].map((f, i) => (
              <div key={i} className="group p-10 rounded-[40px] bg-studio-bg/50 border border-transparent hover:border-primary/10 hover:bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className={`w-16 h-16 rounded-[22px] ${f.color} text-white flex items-center justify-center mb-8 shadow-lg group-hover:rotate-6 transition-transform`}>
                  <span className="material-symbols-outlined text-[32px]">{f.icon}</span>
                </div>
                <h3 className="text-2xl font-black mb-4 text-studio-dark">{f.title}</h3>
                <p className="text-studio-sub leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with Large Text */}
      <section id="testimonials" className="py-32 bg-studio-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        <div className="w-full px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-20">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-8">
                被<span className="text-primary italic">两千位</span>顶尖创作者认可。
              </h2>
              <p className="text-xl text-slate-400 font-medium">
                从独立写作者到千万粉丝博主，Genix 正在成为他们的创意指挥中心。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/5 p-10 rounded-[48px] border border-white/10 flex flex-col justify-between group hover:bg-white/10 transition-colors">
                <div className="space-y-8">
                  <span className="material-symbols-outlined text-primary text-5xl font-black opacity-30">format_quote</span>
                  <p className="text-xl text-slate-200 leading-relaxed font-bold">
                    "{t.content}"
                  </p>
                </div>
                <div className="flex items-center gap-5 mt-16">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">{t.name}</h4>
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1">{t.role} · {t.platform}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Big Bold Design */}
      <section className="py-40 bg-white">
        <div className="w-full px-6 md:px-12">
          <div className="bg-primary rounded-[60px] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(19,127,236,0.3)]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10 space-y-10">
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-none">
                准备好迎接<br />属于你的创作时代了吗？
              </h2>
              <p className="text-xl text-white/80 font-bold max-w-2xl mx-auto">
                加入我们，与两千位志同道合的创作者一起，用最极致的方式讲述你的故事。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button 
                  onClick={() => onStart('LOGIN')}
                  className="w-full sm:w-auto px-16 py-6 bg-white text-primary text-sm font-black rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
                >
                  免费加入 Genix
                </button>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">No credit card required · Instant access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-studio-bg/50 border-t border-studio-border pt-32 pb-16">
        <div className="w-full px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-2 space-y-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-studio-dark">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-2xl font-black tracking-tighter uppercase text-studio-dark">Genix<span className="text-primary italic">Studio</span></span>
              </div>
              <p className="text-lg text-studio-sub max-w-sm leading-relaxed font-medium">
                重新定义个体创作者的工作流，让每一份灵感都能被世界高保真地看见。
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-black mb-8 uppercase tracking-widest text-primary">资源中心</h4>
              <ul className="space-y-4 text-sm font-bold text-studio-sub">
                <li><button onClick={() => onStart('HELP')} className="hover:text-primary transition-colors">使用指南</button></li>
                <li><button onClick={() => onStart('BLOG')} className="hover:text-primary transition-colors">官方博客</button></li>
                <li><button className="hover:text-primary transition-colors cursor-not-allowed opacity-50">API 文档</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black mb-8 uppercase tracking-widest text-primary">法律条款</h4>
              <ul className="space-y-4 text-sm font-bold text-studio-sub">
                <li><button onClick={() => onStart('TERMS')} className="hover:text-primary transition-colors">服务条款</button></li>
                <li><button onClick={() => onStart('PRIVACY')} className="hover:text-primary transition-colors">隐私政策</button></li>
                <li><button className="hover:text-primary transition-colors cursor-not-allowed opacity-50">合规扫描说明</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-studio-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black text-studio-sub uppercase tracking-widest">© 2024 Genix Studio · High Fidelity Creative Platform</p>
            <div className="flex gap-8">
               <span className="material-symbols-outlined text-studio-sub hover:text-primary cursor-pointer transition-colors">alternate_email</span>
               <span className="material-symbols-outlined text-studio-sub hover:text-primary cursor-pointer transition-colors">chat_bubble</span>
               <span className="material-symbols-outlined text-studio-sub hover:text-primary cursor-pointer transition-colors">rss_feed</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
