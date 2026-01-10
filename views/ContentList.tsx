
import React, { useEffect, useState } from 'react';
import { Article } from '../types';
import { ApiService } from '../api';

interface ContentListProps {
  onEdit: (id: string) => void;
  onCreate: () => void;
}

const ContentList: React.FC<ContentListProps> = ({ onEdit, onCreate }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setIsLoading(true);
    try {
      const data = await ApiService.fetchArticles();
      setArticles(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('确认删除这篇文章吗？')) {
      await ApiService.deleteArticle(id);
      loadArticles();
    }
  };

  return (
    <div className="p-5 w-full space-y-5 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-black tracking-tight text-studio-dark">内容管理</h1>
          <p className="text-[11px] text-studio-sub mt-0.5">管理您所有的文章、草稿及已发布的内容。</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-studio-sub text-[18px]">search</span>
            <input 
              className="pl-9 pr-4 py-1.5 bg-white border border-studio-border rounded-xl text-[11px] w-56 focus:ring-primary focus:border-primary transition-all shadow-sm" 
              placeholder="搜索文章标题..."
            />
          </div>
        </div>
      </div>

      <div className="flex gap-6 border-b border-studio-border pb-px overflow-x-auto scrollbar-hide">
        {['全部文章', '已发布', '草稿箱', '定时发布', '回收站'].map((tab, i) => (
          <button 
            key={i} 
            className={`px-1 py-3 text-[11px] font-black whitespace-nowrap transition-all border-b-2 -mb-[2px] ${
              i === 0 ? 'border-primary text-primary' : 'border-transparent text-studio-sub hover:text-studio-dark'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-[24px] border border-studio-border p-5 h-32 animate-pulse flex gap-5">
              <div className="w-40 h-full bg-gray-50 rounded-xl"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-50 rounded w-1/4"></div>
                <div className="h-2 bg-gray-50 rounded w-full"></div>
                <div className="h-2 bg-gray-50 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-studio-border">
          <div className="w-16 h-16 bg-studio-bg rounded-2xl flex items-center justify-center mx-auto mb-5">
            <span className="material-symbols-outlined text-gray-300 text-3xl">folder_open</span>
          </div>
          <p className="text-xs text-studio-sub font-black uppercase tracking-widest">暂无内容，开启第一篇作品吧</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {articles.map((article) => (
            <div 
              key={article.id} 
              className="group bg-white rounded-[24px] border border-studio-border p-4 flex flex-col md:flex-row items-center gap-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-full md:w-40 h-24 rounded-xl overflow-hidden shrink-0 border border-studio-border bg-studio-bg">
                <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              
              <div className="flex-1 space-y-1.5 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                  <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                    article.status === 'published' ? 'bg-green-50 text-green-600' :
                    article.status === 'draft' ? 'bg-gray-50 text-gray-500' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {article.status === 'published' ? '已发布' : article.status === 'draft' ? '草稿' : '定时'}
                  </span>
                  <span className="text-[9px] text-studio-sub font-black uppercase tracking-tighter">最后编辑: {article.lastEdited}</span>
                </div>
                <h3 className="text-base font-black text-studio-dark group-hover:text-primary transition-colors line-clamp-1">{article.title}</h3>
                <p className="text-[11px] text-studio-sub line-clamp-1 leading-relaxed font-medium">{article.description}</p>
                
                <div className="flex items-center justify-center md:justify-start gap-4 pt-1">
                  <div className="flex items-center gap-1.5 text-[9px] font-black text-studio-sub uppercase tracking-tighter">
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    {article.views} 阅读
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-black text-studio-sub uppercase tracking-tighter">
                    <span className="material-symbols-outlined text-[16px]">share</span>
                    {article.platforms.length} 个平台
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-2 shrink-0">
                <button 
                  onClick={() => onEdit(article.id)}
                  className="p-2.5 bg-studio-bg hover:bg-primary/10 hover:text-primary rounded-xl transition-all group/btn"
                >
                  <span className="material-symbols-outlined text-[20px] group-active/btn:scale-90">edit</span>
                </button>
                <button 
                  onClick={() => handleDelete(article.id)}
                  className="p-2.5 bg-studio-bg hover:bg-red-50 hover:text-red-500 rounded-xl transition-all" 
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentList;
