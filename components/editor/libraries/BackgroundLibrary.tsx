
import React from 'react';
import { BackgroundPreset } from '../EditorTypes';

interface BackgroundLibraryProps {
  items: BackgroundPreset[];
  activeId: string;
  onSelect: (bg: BackgroundPreset) => void;
}

// 内部扩展：清爽与淡雅渐变系列底纹
const FRESH_PRESETS: BackgroundPreset[] = [
  {
    id: 'w-fresh-leaves',
    name: '尤加利叶',
    thumbnail: '',
    style: {
      backgroundColor: '#f9fafb',
      backgroundImage: 'url("https://images.unsplash.com/photo-1533038590840-1cde6e668a97?auto=format&fit=crop&q=80&w=800")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% auto',
      backgroundPosition: 'top center',
    }
  },
  {
    id: 'w-fresh-sky',
    name: '晴空',
    thumbnail: '',
    style: {
      backgroundColor: '#f0f9ff',
      backgroundImage: 'radial-gradient(#bae6fd 1px, transparent 1px)',
      backgroundSize: '24px 24px',
    }
  },
  {
    id: 'w-fresh-mint',
    name: '薄荷渐变',
    thumbnail: '',
    style: {
      background: 'linear-gradient(180deg, #ecfdf5 0%, #ffffff 40%)',
    }
  },
  {
    id: 'w-fresh-lemon',
    name: '柠檬海盐',
    thumbnail: '',
    style: {
      background: 'linear-gradient(135deg, #fff7ed 0%, #fff 100%)',
      borderTop: '8px solid #fed7aa'
    }
  },
  {
    id: 'w-grad-violet',
    name: '莫奈紫',
    thumbnail: '',
    style: {
      background: 'linear-gradient(135deg, #f5f3ff 0%, #ffffff 100%)',
    }
  },
  {
    id: 'w-grad-rose',
    name: '烟粉',
    thumbnail: '',
    style: {
      background: 'linear-gradient(to top, #fff1f2 0%, #fff 100%)',
    }
  },
  {
    id: 'w-grad-blue',
    name: '冰川蓝',
    thumbnail: '',
    style: {
      background: 'linear-gradient(120deg, #f0f9ff 0%, #e0f2fe 100%)',
    }
  },
  {
    id: 'w-grad-silk',
    name: '流光金',
    thumbnail: '',
    style: {
       background: 'linear-gradient(to bottom right, #fffbeb 0%, #fff 60%)',
       borderBottom: '12px solid #fffbeb'
    }
  }
];

const BackgroundPreview = ({ preset }: { preset: BackgroundPreset }) => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-white">
      {/* Pattern Layer */}
      <div 
        className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${preset.class || ''}`}
        style={{
          // Default styles
          backgroundPosition: 'center',
          backgroundSize: preset.style?.backgroundImage && !preset.style?.backgroundImage.includes('gradient') ? 'cover' : undefined,
          // Preset overrides
          ...preset.style,
          // Layout force
          height: '100%',
          width: '100%'
        }}
      />
      
      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

const BackgroundLibrary: React.FC<BackgroundLibraryProps> = ({ items, activeId, onSelect }) => {
  // 合并原有预设和新增的清爽系列
  const allItems = [...items, ...FRESH_PRESETS];

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-left-2 duration-300 pb-10">
      <div className="flex items-center justify-between px-1">
        <h4 className="text-[8px] font-black text-gray-400 uppercase tracking-widest">全景底纹库</h4>
        <span className="text-[8px] font-bold text-primary bg-primary/5 px-1.5 py-0.5 rounded">{allItems.length} 预设</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {allItems.map((bg) => (
          <button
            key={bg.id}
            onClick={() => onSelect(bg)}
            className={`group relative flex flex-col items-center gap-2 p-1.5 rounded-[16px] border transition-all duration-300 ${
              activeId === bg.id 
                ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10 scale-[1.02]' 
                : 'border-studio-border hover:border-primary/40 hover:bg-studio-bg'
            }`}
          >
            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden shrink-0 shadow-sm border border-studio-border/30 bg-white relative">
              <BackgroundPreview preset={bg} />
              
              {/* Active Overlay Indicator */}
              {activeId === bg.id && (
                 <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/10 backdrop-blur-[1px] animate-in fade-in duration-200">
                   <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow-lg animate-in zoom-in duration-200">
                     <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                   </div>
                 </div>
              )}
            </div>
            
            <span className={`text-[9px] font-black truncate w-full text-center tracking-tight px-1 transition-colors ${activeId === bg.id ? 'text-primary' : 'text-studio-dark group-hover:text-studio-dark'}`}>
              {bg.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BackgroundLibrary;
