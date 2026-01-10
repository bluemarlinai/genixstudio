import React, { useState } from 'react';
import { Template } from '../types';

interface TemplatePreviewProps {
  template: Template;
  onBack: () => void;
  onUse: (template: Template) => void;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ template, onBack, onUse }) => {
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'pc'>('mobile');

  return (
    <div className="fixed inset-0 bg-studio-bg z-[70] flex flex-col font-sans overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      {/* Top Header */}
      <header className="h-16 px-6 bg-white border-b border-studio-border flex items-center justify-between shadow-sm shrink-0 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold text-studio-sub hover:text-studio-dark transition-colors group"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
            返回库
          </button>
          <div className="w-px h-6 bg-studio-border"></div>
          <div className="flex flex-col">
            <h1 className="text-sm font-black text-studio-dark truncate max-w-xs uppercase tracking-widest leading-none">
              {template.title}
            </h1>
            <span className="text-[10px] text-primary font-bold mt-1 uppercase tracking-tighter">模板预览</span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-studio-bg p-1 rounded-2xl border border-studio-border">
          <button 
            onClick={() => setPreviewDevice('mobile')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-black transition-all ${previewDevice === 'mobile' ? 'bg-white text-primary shadow-sm' : 'text-studio-sub hover:text-studio-dark'}`}
          >
            <span className="material-symbols-outlined text-[18px]">smartphone</span>
            移动端
          </button>
          <button 
            onClick={() => setPreviewDevice('pc')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-black transition-all ${previewDevice === 'pc' ? 'bg-white text-primary shadow-sm' : 'text-studio-sub hover:text-studio-dark'}`}
          >
            <span className="material-symbols-outlined text-[18px]">laptop</span>
            桌面端
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => onUse(template)}
            className="px-8 py-2.5 bg-primary text-white text-sm font-black rounded-xl shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            立即使用
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Preview */}
        <main className="flex-1 overflow-y-auto p-12 flex justify-center bg-studio-bg relative scroll-smooth">
          <div className={`transition-all duration-700 ease-in-out ${previewDevice === 'mobile' ? 'w-[375px] h-[760px] rounded-[50px] border-[12px] border-studio-dark shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] bg-white overflow-hidden sticky top-0' : 'w-full max-w-4xl h-fit min-h-[600px] rounded-3xl border border-studio-border bg-white shadow-2xl overflow-hidden'}`}>
            
            <div className="h-full flex flex-col relative">
              {previewDevice === 'mobile' && (
                <div className="h-10 w-full bg-white flex justify-between items-center px-8 shrink-0">
                  <span className="text-[10px] font-bold">9:41</span>
                  <div className="flex gap-1.5 items-center">
                    <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
                    <span className="material-symbols-outlined text-[14px]">wifi</span>
                    <span className="material-symbols-outlined text-[14px]">battery_full</span>
                  </div>
                </div>
              )}
              
              <div className="flex-1 overflow-y-auto">
                <div className={`p-8 ${previewDevice === 'pc' ? 'max-w-2xl mx-auto' : ''}`}>
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded-md">
                    {template.category}
                  </span>
                  <h2 className="text-3xl font-black text-studio-dark mt-6 leading-tight tracking-tight">
                    {template.title}：在这里开启您的创作
                  </h2>
                  <div className="flex items-center gap-3 mt-6 pb-6 border-b border-studio-border">
                    <div className="w-10 h-10 rounded-full bg-gray-200" style={{backgroundImage: 'url("https://picsum.photos/seed/author/100/100")', backgroundSize: 'cover'}}></div>
                    <div>
                      <p className="text-xs font-bold text-studio-dark">您的名字</p>
                      <p className="text-[10px] text-studio-sub uppercase tracking-wider">今日 · 预计 5 分钟阅读</p>
                    </div>
                  </div>

                  <div className="prose prose-blue mt-8 max-w-none">
                    <p className="font-medium text-studio-dark/70">
                      这是一个占位符内容，用于展示 <strong>{template.title}</strong> 模板的排版样式。
                    </p>
                    <div className="my-8 rounded-2xl overflow-hidden aspect-video bg-gray-100 shadow-lg">
                       <img src={template.thumbnail} className="w-full h-full object-cover opacity-80" alt="Placeholder" />
                    </div>
                    <p>
                      在 Genix Studio 中，我们不仅提供精美的静态排版，还支持动态的 AI 内容补全。您可以直接在这个结构基础上进行写作，或者让 AI 帮您生成草稿。
                    </p>
                    <blockquote>
                      “好的设计是透明的，它让内容本身成为主角。”
                    </blockquote>
                    <p>
                      继续编写您的内容... 所有的排版细节都已经为您处理好了。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Info Sidebar */}
        <aside className="w-[360px] bg-white border-l border-studio-border flex flex-col p-8 space-y-8 shrink-0">
          <div className="space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">模板详情</h3>
            <div className="p-6 bg-studio-bg rounded-[32px] border border-studio-border space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">dashboard_customize</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-studio-dark">{template.title}</p>
                  <p className="text-[10px] text-studio-sub uppercase font-black">{template.category}</p>
                </div>
              </div>
              <p className="text-xs text-studio-sub leading-relaxed font-medium">
                {template.description}
              </p>
              <div className="flex items-center justify-between pt-2">
                 <span className="text-[10px] font-black text-gray-400 uppercase">作者: {template.author}</span>
                 <span className="text-[10px] font-black text-primary uppercase">使用过 {template.usageCount} 次</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">包含组件</h3>
            <div className="space-y-3">
              {[
                { name: '沉浸式页眉', icon: 'vertical_align_top' },
                { name: '响应式图库', icon: 'collections' },
                { name: '引用块设计', icon: 'format_quote' },
                { name: '智能目录 (自动)', icon: 'toc' },
              ].map((comp, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl border border-studio-border hover:bg-studio-bg transition-colors">
                  <span className="material-symbols-outlined text-[18px] text-primary">{comp.icon}</span>
                  <span className="text-xs font-bold text-studio-dark">{comp.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-8 border-t border-studio-border">
            <button 
              onClick={() => onUse(template)}
              className="w-full py-4 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">edit_square</span>
              使用此模板开始创作
            </button>
            <p className="text-center text-[10px] text-studio-sub font-bold uppercase tracking-widest mt-4 italic">
              所有模板均已针对全平台完成适配
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TemplatePreview;