
import React from 'react';
import { Template } from '../types';

export const templates: Template[] = [
  { id: '1', title: '极简产品发布', category: '产品更新', thumbnail: 'https://picsum.photos/seed/t1/600/400', usageCount: '1.2k', description: '干净利落的文字排版，配合大尺寸的产品图。', author: 'Genix Elite' },
  { id: '2', title: '深度技术周报', category: '技术博客', thumbnail: 'https://picsum.photos/seed/t2/600/400', usageCount: '850', description: '专业的代码高亮提示与多级标题设计。', author: 'Code Master' },
  { id: '3', title: '视觉系旅游指南', category: '生活方式', thumbnail: 'https://picsum.photos/seed/t3/600/400', usageCount: '2.4k', description: '沉浸式的图片流布局。', author: 'Voyager' },
  { id: '4', title: '现代商业分析', category: '行业研报', thumbnail: 'https://picsum.photos/seed/t4/600/400', usageCount: '540', description: '数据图表与重点结论的完美结合。', author: 'Insight Lab' },
  { id: '5', title: 'AI 趋势简报', category: 'AI资讯', thumbnail: 'https://picsum.photos/seed/t5/600/400', usageCount: '3.1k', description: '快节奏的新闻式排版。', author: 'Genix Studio' },
  { id: '6', title: '个人复盘总结', category: '效率', thumbnail: 'https://picsum.photos/seed/t6/600/400', usageCount: '920', description: '网格化的复盘结构。', author: 'Alex Chen' },
];

interface TemplateLibraryProps {
  onPreview: (template: Template) => void;
}

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onPreview }) => {
  return (
    <div className="p-5 w-full space-y-5 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-black tracking-tight text-studio-dark">灵感模板库</h1>
          <p className="text-[11px] text-studio-sub mt-0.5 font-medium">从精心设计的专业模板开始，跳过空白页的创作烦恼。</p>
        </div>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-studio-sub text-[18px]">search</span>
          <input className="pl-9 pr-4 py-1.5 bg-white border border-studio-border rounded-xl text-[11px] w-56 focus:ring-primary focus:border-primary transition-all shadow-sm" placeholder="搜索模版..." />
        </div>
      </div>

      <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
        {['全部模板', '最热门', '极简主义', '极客博客', '专业资讯', '产品动态'].map((cat, i) => (
          <button key={i} className={`px-4 py-1.5 rounded-full text-[10px] font-black whitespace-nowrap transition-all border ${i === 0 ? 'bg-primary text-white border-primary shadow-lg shadow-primary/10' : 'bg-white border-studio-border text-studio-sub hover:border-primary/40 hover:text-primary shadow-sm'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {templates.map((tpl) => (
          <div key={tpl.id} className="group bg-white rounded-[24px] overflow-hidden border border-studio-border shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="aspect-[4/3] overflow-hidden relative bg-studio-bg">
              <img src={tpl.thumbnail} alt={tpl.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                <button 
                  onClick={() => onPreview(tpl)} 
                  className="px-5 py-2 bg-white text-studio-dark font-black rounded-full text-[10px] hover:bg-primary hover:text-white transition-all transform hover:scale-105 shadow-xl uppercase tracking-widest"
                >
                  预览详情
                </button>
              </div>
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-lg shadow-lg">
                <span className="text-[8px] font-black text-primary uppercase tracking-widest">{tpl.category}</span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-black text-[13px] text-studio-dark line-clamp-1">{tpl.title}</h3>
                <div className="flex items-center gap-1 text-primary">
                  <span className="material-symbols-outlined text-[14px] font-black">trending_up</span>
                  <span className="text-[9px] font-black tracking-tighter">{tpl.usageCount}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gray-100 border border-white shadow-sm overflow-hidden">
                    <img src={`https://picsum.photos/seed/${tpl.id}/40/40`} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[9px] text-studio-sub font-black uppercase tracking-tight">{tpl.author}</span>
                </div>
                <button className="text-studio-sub hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[16px]">favorite</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateLibrary;
