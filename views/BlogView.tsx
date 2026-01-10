import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { ApiService } from '../api';

interface BlogViewProps {
  onBack: () => void;
}

const BlogView: React.FC<BlogViewProps> = ({ onBack }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const data = await ApiService.fetchBlogPosts();
    setPosts(data.filter(p => p.status === 'published'));
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-primary/20">
      {/* Blog Specific Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-studio-bg shadow-sm">
              <img src="/logo.png" alt="Genix Studio Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-lg font-black tracking-tight text-studio-dark">Genix Studio</span>
          </div>
          <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-studio-sub hidden md:block">Journal</span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="text-sm font-bold text-studio-sub hover:text-primary transition-colors"
          >
            返回首页
          </button>
          <button className="px-5 py-2 bg-slate-900 text-white text-xs font-black rounded-full uppercase tracking-widest hover:bg-black transition-all">
            订阅更新
          </button>
        </div>
      </nav>

      {/* Main Blog Body */}
      <div className="max-w-[80rem] mx-auto px-8 py-20 space-y-20 animate-in fade-in duration-700">
        {!selectedPost ? (
          <>
            <header className="max-w-3xl space-y-6">
              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
                创作者见闻录 <br />
                <span className="text-primary italic">Inside Genix</span>
              </h1>
              <p className="text-lg text-studio-sub leading-relaxed font-medium">
                在这里，我们探讨产品背后的思考、创作者的成长路径，以及人工智能如何优雅地融入我们的表达。
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
              {posts.map((post) => (
                <div 
                  key={post.id} 
                  onClick={() => setSelectedPost(post)}
                  className="group cursor-pointer space-y-6"
                >
                  <div className="aspect-[16/10] rounded-[48px] overflow-hidden border border-studio-border bg-studio-bg shadow-sm group-hover:shadow-2xl transition-all duration-700">
                    <img 
                      src={post.coverImage} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      alt={post.title} 
                    />
                  </div>
                  <div className="space-y-4 px-2">
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg border border-primary/10">
                        {post.category}
                      </span>
                      <span className="text-xs font-bold text-studio-sub uppercase tracking-widest">{post.date}</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-studio-sub text-sm leading-relaxed font-medium line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 pt-4">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                        <img src={`https://picsum.photos/seed/${post.author}/50/50`} alt={post.author} />
                      </div>
                      <span className="text-xs font-black text-slate-900">{post.author}</span>
                      <span className="text-xs text-studio-sub">· 5 min read</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <button 
              onClick={() => setSelectedPost(null)}
              className="flex items-center gap-2 text-sm font-black text-primary uppercase tracking-widest hover:underline"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              返回列表
            </button>

            <header className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg">
                  {selectedPost.category}
                </span>
                <span className="text-xs font-bold text-studio-sub uppercase tracking-widest">{selectedPost.date}</span>
              </div>
              <h2 className="text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">{selectedPost.title}</h2>
              <div className="flex items-center gap-3 py-6 border-y border-studio-border">
                <div className="w-12 h-12 rounded-full bg-studio-bg overflow-hidden border border-studio-border">
                  <img src={`https://picsum.photos/seed/${selectedPost.author}/100/100`} alt={selectedPost.author} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">{selectedPost.author}</p>
                  <p className="text-[10px] text-studio-sub uppercase tracking-widest font-black">Official Contributor @ Genix</p>
                </div>
              </div>
            </header>

            <div className="aspect-[21/9] rounded-[56px] overflow-hidden border border-studio-border shadow-xl">
               <img src={selectedPost.coverImage} className="w-full h-full object-cover" alt="Post Hero" />
            </div>

            <article className="prose prose-xl prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium">
              <p className="text-2xl font-bold text-slate-900/80 leading-relaxed italic mb-12">
                {selectedPost.excerpt}
              </p>
              <p>{selectedPost.content}</p>
              <p>
                在数字经济日益成熟的今天，内容的分发与消费模式正在经历前所未有的变革。我们不仅仅在构建一个写作工具，更是在重新定义个体与世界的连接方式。
              </p>
              <p>
                Genix Studio 的核心愿景始终是：赋能。让每一个有趣的灵魂，都能无障碍地通过文字与视频发声。
              </p>
            </article>

            <footer className="pt-20 border-t border-studio-border text-center space-y-6">
               <h4 className="text-lg font-black text-slate-900">对本文有何看法？</h4>
               <div className="flex justify-center gap-4">
                 <button className="flex items-center gap-2 px-6 py-3 border border-studio-border rounded-2xl hover:bg-studio-bg transition-all font-bold text-sm">
                   <span className="material-symbols-outlined text-[20px]">thumb_up</span>
                   赞同
                 </button>
                 <button className="flex items-center gap-2 px-6 py-3 border border-studio-border rounded-2xl hover:bg-studio-bg transition-all font-bold text-sm">
                   <span className="material-symbols-outlined text-[20px]">share</span>
                   转发
                 </button>
               </div>
            </footer>
          </div>
        )}
      </div>

      {/* Blog Footer */}
      <footer className="bg-slate-50 border-t border-gray-100 py-20 mt-20">
        <div className="max-w-[80rem] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md overflow-hidden flex items-center justify-center bg-studio-bg">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-sm font-black tracking-tight text-slate-900">Genix Studio</span>
          </div>
          <p className="text-xs font-bold text-studio-sub uppercase tracking-widest">© 2024 Genix Studio (genixstudio.ai). All rights reserved.</p>
          <div className="flex gap-8">
            <button onClick={onBack} className="text-xs font-black text-studio-sub uppercase tracking-widest hover:text-primary">Home</button>
            <button className="text-xs font-black text-studio-sub uppercase tracking-widest hover:text-primary">About</button>
            <button className="text-xs font-black text-studio-sub uppercase tracking-widest hover:text-primary">Subscribe</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogView;