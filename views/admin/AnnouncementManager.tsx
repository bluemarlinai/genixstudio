
import React, { useState, useEffect } from 'react';
import { Announcement } from '../../types';
import { ApiService } from '../../api';

const AnnouncementManager: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Announcement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const data = await ApiService.fetchAnnouncements();
    setAnnouncements(data);
    setIsLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newItem: Announcement = {
      id: editingItem?.id || '',
      title: formData.get('title') as string,
      excerpt: formData.get('excerpt') as string,
      type: formData.get('type') as any,
      date: editingItem?.date || new Date().toISOString().split('T')[0],
      isNew: formData.get('isNew') === 'on'
    };

    await ApiService.saveAnnouncement(newItem);
    setIsModalOpen(false);
    setEditingItem(null);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('确定要删除此公告吗？')) {
      await ApiService.deleteAnnouncement(id);
      loadData();
    }
  };

  const openEdit = (item: Announcement) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'feature': return 'bg-blue-50 text-blue-600';
      case 'maintenance': return 'bg-amber-50 text-amber-600';
      case 'update': return 'bg-emerald-50 text-emerald-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="p-8 w-full space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">公告管理</h1>
          <p className="text-studio-sub mt-2">控制全局发布的消息、系统更新通知及活动预告。</p>
        </div>
        <button 
          onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-xl hover:bg-black transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          新建公告
        </button>
      </header>

      <div className="bg-white rounded-[40px] border border-studio-border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-studio-border">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">公告标题</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">类别</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">发布日期</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">状态</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">管理</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-studio-border">
            {isLoading ? (
              <tr><td colSpan={5} className="p-20 text-center text-studio-sub font-bold">加载中...</td></tr>
            ) : announcements.length === 0 ? (
              <tr><td colSpan={5} className="p-20 text-center text-studio-sub font-bold">暂无公告</td></tr>
            ) : announcements.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-900">{item.title}</span>
                    <span className="text-[11px] text-slate-400 line-clamp-1">{item.excerpt}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${getTypeStyle(item.type)}`}>
                    {item.type}
                  </span>
                </td>
                <td className="px-8 py-5 text-xs font-bold text-slate-500">{item.date}</td>
                <td className="px-8 py-5">
                  {item.isNew ? (
                    <span className="flex items-center gap-1.5 text-xs font-black text-primary uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                      最新
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-studio-sub uppercase tracking-widest">已过期</span>
                  )}
                </td>
                <td className="px-8 py-5 text-right">
                   <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(item)} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg transition-all">
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
          <form onSubmit={handleSave} className="relative bg-white w-full max-w-xl rounded-[40px] shadow-2xl p-10 space-y-6 animate-in zoom-in-95 duration-300">
            <h2 className="text-2xl font-black text-slate-900">{editingItem ? '编辑公告' : '新建公告'}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">公告标题</label>
                <input 
                  name="title" 
                  defaultValue={editingItem?.title} 
                  required
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 ring-slate-900/5 transition-all"
                  placeholder="请输入公告标题..."
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">公告类别</label>
                <select 
                  name="type" 
                  defaultValue={editingItem?.type || 'update'}
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 ring-slate-900/5 transition-all"
                >
                  <option value="feature">新功能 (Feature)</option>
                  <option value="update">版本更新 (Update)</option>
                  <option value="maintenance">系统维护 (Maintenance)</option>
                  <option value="news">活动消息 (News)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">内容详情</label>
                <textarea 
                  name="excerpt" 
                  defaultValue={editingItem?.excerpt} 
                  required
                  rows={4}
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 ring-slate-900/5 transition-all resize-none"
                  placeholder="描述公告的主要内容..."
                />
              </div>

              <div className="flex items-center gap-3 py-2">
                <input 
                  type="checkbox" 
                  name="isNew" 
                  id="isNew"
                  defaultChecked={editingItem?.isNew}
                  className="w-5 h-5 rounded-lg border-slate-200 text-slate-900 focus:ring-slate-900"
                />
                <label htmlFor="isNew" className="text-xs font-bold text-slate-700">设为最新公告 (显示徽章)</label>
              </div>
            </div>

            <div className="pt-6 flex gap-4">
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
              >
                取消
              </button>
              <button 
                type="submit"
                className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all"
              >
                保存公告
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AnnouncementManager;
