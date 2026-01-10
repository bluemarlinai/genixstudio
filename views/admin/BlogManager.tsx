import React, { useState, useEffect } from 'react';
import { BlogPost } from '../../types';
import { ApiService } from '../../api';

const BlogManager: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const data = await ApiService.fetchBlogPosts();
    setPosts(data);
    setIsLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newItem: BlogPost = {
      id: editingItem?.id || '',
      title: formData.get('title') as string,
      excerpt: formData.get('excerpt') as string,
      content: formData.get('content') as string,
      author: formData.get('author') as string,
      category: formData.get('category') as string,
      coverImage: (formData.get('coverImage') as string) || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
      status: formData.get('status') as any,
      date: editingItem?.date || new Date().toISOString().split('T')[0],
    };

    await ApiService.saveBlogPost(newItem);
    setIsModalOpen(false);
    setEditingItem(null);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('确定要彻底删除这篇文章吗？')) {
      await ApiService.deleteBlogPost(id);
      loadData();
    }
  };

  return (
    <div className="p-8 w-full space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">官方博客管理</h1>
          <p className="text-studio-sub mt-2">发布并管理平台文章、行业报告及创作者案例。</p>
        </div>
        <button 
          onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-xl hover:bg-black transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          撰写博文
        </button>
      </header>

      <div className="bg-white rounded-[40px] border border-studio-border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-studio-border">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">文章详情</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">作者</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">分类</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">状态</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">管理</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-studio-border">
            {isLoading ? (
              <tr><td colSpan={5} className="p-20 text-center text-studio-sub font-bold">加载中...</td></tr>
            ) : posts.length === 0 ? (
              <tr><td colSpan={5} className="p-20 text-center text-studio-sub font-bold">暂无博客内容</td></tr>
            ) : posts.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-10 rounded-lg overflow-hidden shrink-0 border border-studio-border">
                      <img src={item.coverImage} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-slate-900 line-clamp-1">{item.title}</span>
                      <span className="text-[10px] text-slate-400">{item.date}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-xs font-bold text-slate-500">{item.author}</td>
                <td className="px-8 py-5">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-slate-100 rounded-md">
                    {item.category}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                    item.status === 'published' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {item.status === 'published' ? '已发布' : '草稿'}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                   <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => { setEditingItem(item); setIsModalOpen(true); }}
                        className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg transition-all"
                      >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <form onSubmit={handleSave} className="relative bg-white w-full max-w-2xl rounded-[48px] shadow-2xl p-12 space-y-6 animate-in zoom-in-95 duration-300 overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-black text-slate-900">{editingItem ? '编辑博文' : '撰写新博文'}</h2>
            
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">文章标题</label>
                  <input name="title" defaultValue={editingItem?.title} required className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 ring-slate-900/5 transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">作者姓名</label>
                  <input name="author" defaultValue={editingItem?.author || 'Studio Team'} className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 ring-slate-900/5 transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">文章分类</label>
                  <input name="category" defaultValue={editingItem?.category || '行业'} className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 ring-slate-900/5 transition-all" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">封面图片 URL</label>
                <input name="coverImage" defaultValue={editingItem?.coverImage} placeholder="https://..." className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 ring-slate-900/5 transition-all" />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">摘要 (Excerpt)</label>
                <textarea name="excerpt" defaultValue={editingItem?.excerpt} rows={3} className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 ring-slate-900/5 transition-all resize-none" />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">正文内容</label>
                <textarea name="content" defaultValue={editingItem?.content} rows={6} className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 ring-slate-900/5 transition-all resize-none" />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">发布状态</label>
                <select name="status" defaultValue={editingItem?.status || 'published'} className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 ring-slate-900/5 transition-all">
                  <option value="published">立即发布</option>
                  <option value="draft">保存为草稿</option>
                </select>
              </div>
            </div>

            <div className="pt-8 flex gap-4">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
                取消
              </button>
              <button type="submit" className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all">
                保存文章
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BlogManager;