
import React from 'react';

const HelpPage: React.FC = () => {
  const categories = [
    { title: '快速入门', icon: 'rocket_launch', desc: '在 5 分钟内发布第一篇文章。', count: 12 },
    { title: '内容编辑', icon: 'edit_square', desc: '掌握排版组件及底纹样式。', count: 24 },
    { title: 'AI 辅助', icon: 'auto_awesome', desc: '高效使用 AI 润色及生成。', count: 18 },
    { title: '多端发布', icon: 'share', desc: '配置全平台同步发布策略。', count: 9 },
    { title: '数据看板', icon: 'analytics', desc: '解读数据，优化影响力。', count: 15 },
    { title: '账户计费', icon: 'payments', desc: '订阅方案与 API 额度说明。', count: 7 },
  ];

  return (
    <div className="p-8 md:px-12 lg:px-16 space-y-12 pb-20 animate-in fade-in duration-500">
      <section className="bg-slate-900 rounded-[48px] p-16 text-center text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/10 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
          <h1 className="text-4xl font-black tracking-tight leading-tight">我们能帮您解决什么？</h1>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input className="w-full bg-white/10 border-white/20 rounded-[28px] py-5 pl-14 pr-8 text-sm font-medium placeholder-slate-400 focus:bg-white focus:text-slate-900 focus:ring-0 transition-all outline-none shadow-2xl" placeholder="搜索文档、教程、常见问题或功能指南..." />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
             <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-1">热门关键词:</span>
             <button className="text-[10px] font-black bg-white/10 hover:bg-white hover:text-slate-900 px-3 py-1 rounded-full transition-all uppercase tracking-tighter">微信公众号配置</button>
             <button className="text-[10px] font-black bg-white/10 hover:bg-white hover:text-slate-900 px-3 py-1 rounded-full transition-all uppercase tracking-tighter">PRO 权益详情</button>
             <button className="text-[10px] font-black bg-white/10 hover:bg-white hover:text-slate-900 px-3 py-1 rounded-full transition-all uppercase tracking-tighter">视频生成额度</button>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-[11px] font-black text-studio-dark uppercase tracking-[0.2em] border-b border-studio-border pb-4 flex items-center justify-between">
          知识库分类
          <span className="material-symbols-outlined text-[18px]">library_books</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white p-8 rounded-[36px] border border-studio-border hover:border-primary/30 hover:shadow-2xl transition-all cursor-pointer group flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                    <span className="material-symbols-outlined text-[28px]">{cat.icon}</span>
                  </div>
                  <span className="text-[10px] font-black text-studio-sub uppercase tracking-tighter bg-studio-bg px-2.5 py-1 rounded-lg">{cat.count} 篇文章</span>
                </div>
                <h3 className="text-base font-black text-studio-dark group-hover:text-primary transition-colors mb-2">{cat.title}</h3>
                <p className="text-xs text-studio-sub leading-relaxed font-medium">{cat.desc}</p>
              </div>
              <div className="pt-6 flex items-center gap-2 text-[10px] font-black text-primary uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                立即阅读
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-[11px] font-black text-studio-dark uppercase tracking-[0.2em]">常见问题 (FAQ)</h2>
          <div className="space-y-4">
            {[
              { q: '如何开启 AI 实时内容润色功能？', a: '在编辑器右侧边栏点击“AI 辅助”卡片中的“润色”按钮。' },
              { q: 'Pro 版本支持导出 HTML 和 PDF 源码吗？', a: '是的，Pro 用户可以在“发布”页面的预览区直接导出多端兼容的源代码。' },
              { q: '同步到微信公众号后样式会乱吗？', a: 'Genix 拥有专利的渲染适配引擎，能够确保在公众号后台维持 99% 的视觉一致性。' }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-[24px] border border-studio-border overflow-hidden hover:border-primary/20 transition-all shadow-sm">
                <div className="px-8 py-5 font-black text-sm text-studio-dark flex justify-between items-center bg-gray-50/50 cursor-pointer group">
                  {faq.q}
                  <span className="material-symbols-outlined text-gray-300 text-[24px] group-hover:text-primary transition-colors">expand_more</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden group flex flex-col justify-between min-h-[350px]">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform duration-700">
            <span className="material-symbols-outlined text-9xl">support_agent</span>
          </div>
          <div>
            <h3 className="text-2xl font-black mb-4 leading-tight">需要一对一专家帮助？</h3>
            <p className="text-sm text-white/80 leading-relaxed font-medium">我们的技术支持专家随时准备为您解答复杂的创作难题或定制化需求。</p>
          </div>
          <div className="space-y-4">
             <button className="w-full py-4 bg-white text-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-studio-bg hover:shadow-xl transition-all active:scale-95">
              联系专属顾问
             </button>
             <p className="text-center text-[9px] font-black uppercase tracking-[0.3em] opacity-60">响应时间：15 分钟内</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
