
import React, { useState } from 'react';

const AssetManager: React.FC = () => {
  const [activeType, setActiveType] = useState<'BG' | 'DEC'>('BG');

  return (
    <div className="p-8 w-full space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight">基础物料管理</h1>
          <p className="text-studio-sub mt-2">管理全局编辑器中的底纹、边框及排版组件库。</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-sm font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all">
          <span className="material-symbols-outlined">add</span>
          上传新物料
        </button>
      </header>

      <div className="flex gap-4 p-1.5 bg-gray-100 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveType('BG')}
          className={`px-8 py-2 rounded-xl text-xs font-black transition-all ${activeType === 'BG' ? 'bg-white shadow-sm text-primary' : 'text-studio-sub'}`}
        >
          底纹 (Backgrounds)
        </button>
        <button 
          onClick={() => setActiveType('DEC')}
          className={`px-8 py-2 rounded-xl text-xs font-black transition-all ${activeType === 'DEC' ? 'bg-white shadow-sm text-primary' : 'text-studio-sub'}`}
        >
          排版组件 (Decorations)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="group bg-white rounded-3xl overflow-hidden border border-studio-border hover:shadow-xl transition-all relative">
            <div className="aspect-square bg-studio-bg overflow-hidden relative">
              <img src={`https://picsum.photos/seed/asset${item}/400/400`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all group-hover:scale-105" alt="Asset" />
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-white/90 backdrop-blur rounded-xl text-studio-dark shadow-sm hover:text-primary">
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button className="p-2 bg-white/90 backdrop-blur rounded-xl text-red-500 shadow-sm hover:bg-red-50">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
            <div className="p-5">
              <h5 className="text-sm font-black text-studio-dark">
                {activeType === 'BG' ? `冬季底纹系列 0${item}` : `高级标题模板 0${item}`}
              </h5>
              <p className="text-[10px] text-studio-sub font-bold uppercase tracking-widest mt-1">
                {activeType === 'BG' ? '2048 x 2048 · PNG' : 'Tiptap HTML Component'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetManager;
