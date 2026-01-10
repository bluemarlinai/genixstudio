
import React, { useState, useEffect } from 'react';
import { Announcement } from '../types';
import { ApiService } from '../api';

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    const data = await ApiService.fetchAnnouncements();
    setAnnouncements(data);
  };

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'feature': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'maintenance': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'update': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'feature': return '新功能';
      case 'maintenance': return '系统维护';
      case 'update': return '版本更新';
      default: return '公告消息';
    }
  };

  return (
    <div className="p-5 w-full space-y-5 animate-in fade-in duration-500">
      <header>
        <h1 className="text-xl font-black tracking-tight text-studio-dark">公告中心</h1>
        <p className="text-[11px] text-studio-sub mt-0.5">获取产品的最新动态、功能发布及系统通知。</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {announcements.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedAnnouncement(item)}
            className="group bg-white p-5 rounded-2xl border border-studio-border hover:border-primary/20 hover:shadow-lg transition-all cursor-pointer relative"
          >
            {item.isNew && (
              <span className="absolute top-5 right-5 flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </span>
            )}
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getTypeStyle(item.type)}`}>
                {getTypeLabel(item.type)}
              </span>
              <span className="text-[10px] font-bold text-studio-sub uppercase tracking-widest">{item.date}</span>
            </div>
            <h3 className="text-base font-black text-studio-dark group-hover:text-primary transition-colors mb-2 leading-tight">
              {item.title}
            </h3>
            <p className="text-[11px] text-studio-sub leading-relaxed line-clamp-2">
              {item.excerpt}
            </p>
          </div>
        ))}
      </div>

      {selectedAnnouncement && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedAnnouncement(null)}></div>
          <div className="relative bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 p-8">
            <button 
              onClick={() => setSelectedAnnouncement(null)}
              className="absolute top-6 right-6 p-1.5 hover:bg-studio-bg rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-studio-sub text-[20px]">close</span>
            </button>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getTypeStyle(selectedAnnouncement.type)}`}>
                  {getTypeLabel(selectedAnnouncement.type)}
                </span>
                <span className="text-[10px] font-bold text-studio-sub uppercase tracking-widest">{selectedAnnouncement.date}</span>
              </div>
              <h2 className="text-xl font-black text-studio-dark leading-tight">{selectedAnnouncement.title}</h2>
              <div className="prose prose-sm prose-blue max-w-none text-studio-sub leading-relaxed font-medium">
                <p>{selectedAnnouncement.excerpt}</p>
                <div className="bg-studio-bg p-4 rounded-xl mt-4">
                  <p className="text-[10px] italic">
                    Genix Studio 团队致力于为您提供最专业的内容生产工具。感谢您的支持。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
