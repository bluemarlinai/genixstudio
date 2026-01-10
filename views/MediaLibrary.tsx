
import React, { useState, useEffect } from 'react';

interface UploadItem {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  type: 'IMAGE' | 'VIDEO';
}

const MediaLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'IMAGE' | 'VIDEO' | 'FAV' | 'UPLOADS'>('ALL');
  const [uploadQueue, setUploadQueue] = useState<UploadItem[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setUploadQueue(prev => 
        prev.map(item => {
          if (item.status === 'uploading' && item.progress < 100) {
            const nextProgress = item.progress + Math.floor(Math.random() * 20);
            return {
              ...item,
              progress: nextProgress >= 100 ? 100 : nextProgress,
              status: nextProgress >= 100 ? 'success' : 'uploading'
            };
          }
          return item;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSimulateUpload = () => {
    const newFiles: UploadItem[] = [
      {
        id: Math.random().toString(36).substr(2, 9),
        name: `Nature_Shot_${Math.floor(Math.random() * 100)}.jpg`,
        size: '2.5 MB',
        progress: 0,
        status: 'uploading',
        type: 'IMAGE'
      }
    ];
    setUploadQueue(prev => [...newFiles, ...prev]);
    setActiveTab('UPLOADS');
  };

  const removeUpload = (id: string) => {
    setUploadQueue(prev => prev.filter(item => item.id !== id));
  };

  const assets = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    type: i % 4 === 0 ? 'VIDEO' : 'IMAGE',
    url: `https://picsum.photos/seed/media${i}/600/400`,
    name: `Asset_${i+1}.jpg`,
    size: '1.2 MB'
  }));

  return (
    <div className="p-5 w-full space-y-5 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-black tracking-tight text-studio-dark">媒体素材库</h1>
          <p className="text-[11px] text-studio-sub mt-0.5">统一管理您的图片、视频及视觉资产。</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleSimulateUpload}
            className="px-4 py-2 bg-studio-dark text-white rounded-xl text-xs font-black shadow-lg hover:bg-black transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
            上传媒体
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-52 space-y-1 shrink-0">
          {[
            { id: 'ALL', label: '全部素材', icon: 'grid_view' },
            { id: 'IMAGE', label: '图片素材', icon: 'image' },
            { id: 'VIDEO', label: '视频文件', icon: 'movie' },
            { id: 'FAV', label: '我的收藏', icon: 'star' },
            { id: 'UPLOADS', label: '上传管理', icon: 'sync', badge: uploadQueue.filter(i => i.status === 'uploading').length },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === item.id ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-studio-sub hover:bg-white hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`material-symbols-outlined text-[20px] ${activeTab === item.id ? '' : 'text-gray-400'}`}>{item.icon}</span>
                {item.label}
              </div>
              {item.badge ? (
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${activeTab === item.id ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
                  {item.badge}
                </span>
              ) : null}
            </button>
          ))}
        </aside>

        <div className="flex-1 space-y-4">
          {activeTab === 'UPLOADS' ? (
            <div className="space-y-4 animate-in slide-in-from-right-2 duration-500">
              <div 
                className="group border-2 border-dashed border-studio-border rounded-2xl p-8 text-center bg-white hover:border-primary/40 hover:bg-primary/[0.01] transition-all cursor-pointer"
                onClick={handleSimulateUpload}
              >
                <div className="w-14 h-14 bg-studio-bg rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary/5 transition-all">
                  <span className="material-symbols-outlined text-3xl text-studio-sub group-hover:text-primary">upload_file</span>
                </div>
                <h3 className="text-base font-black text-studio-dark mb-1">拖拽文件到这里</h3>
                <p className="text-studio-sub text-[10px] max-w-[200px] mx-auto">
                  支持常用图片与视频格式。单个文件最大 2GB。
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-studio-border overflow-hidden shadow-sm">
                <div className="px-5 py-3 border-b border-studio-border flex justify-between items-center bg-gray-50/50">
                  <h4 className="text-[10px] font-black text-studio-sub uppercase tracking-[0.2em]">当前任务 ({uploadQueue.length})</h4>
                </div>
                <div className="divide-y divide-studio-border max-h-[400px] overflow-y-auto">
                  {uploadQueue.map(item => (
                    <div key={item.id} className="p-4 flex items-center gap-4 group hover:bg-gray-50 transition-colors">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.type === 'VIDEO' ? 'bg-indigo-50 text-indigo-500' : 'bg-emerald-50 text-emerald-500'}`}>
                        <span className="material-symbols-outlined text-[20px]">{item.type === 'VIDEO' ? 'movie' : 'image'}</span>
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <div className="flex justify-between items-start">
                          <p className="text-xs font-black text-studio-dark line-clamp-1">{item.name}</p>
                          <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-lg ${item.status === 'success' ? 'bg-green-50 text-green-600' : 'bg-primary/5 text-primary'}`}>
                            {item.status === 'success' ? '完成' : `${item.progress}%`}
                          </span>
                        </div>
                        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full transition-all duration-500 rounded-full ${item.status === 'success' ? 'bg-green-500' : 'bg-primary'}`} style={{ width: `${item.progress}%` }}></div>
                        </div>
                      </div>
                      <button onClick={() => removeUpload(item.id)} className="p-1.5 text-gray-300 hover:text-red-500"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-700">
              {assets.filter(a => activeTab === 'ALL' || a.type === activeTab).map((asset) => (
                <div key={asset.id} className="group bg-white rounded-2xl overflow-hidden border border-studio-border hover:shadow-lg transition-all relative">
                  <div className="aspect-[4/3] relative overflow-hidden bg-studio-bg">
                    <img src={asset.url} className="w-full h-full object-cover group-hover:scale-105" alt="Asset" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button className="p-1.5 bg-white rounded-lg text-studio-dark hover:text-primary"><span className="material-symbols-outlined text-[18px]">download</span></button>
                      <button className="p-1.5 bg-white rounded-lg text-red-500 hover:bg-red-50"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-[11px] font-black text-studio-dark truncate">{asset.name}</p>
                    <p className="text-[9px] text-studio-sub font-bold uppercase mt-0.5">{asset.size} · {asset.type}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaLibrary;
