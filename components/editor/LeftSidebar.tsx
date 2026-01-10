
import React from 'react';
import { BackgroundPreset, DecorationPreset, BrandPreset, SnippetPreset, SidebarTab } from './EditorTypes';

// 扩展 SidebarTab 类型包含 AI
type ExtendedSidebarTab = SidebarTab | 'AI';

interface LeftSidebarProps {
  activeTab: SidebarTab;
  setActiveTab: (tab: SidebarTab) => void;
  bgPresets: BackgroundPreset[];
  activeBg: BackgroundPreset;
  setActiveBg: (bg: BackgroundPreset) => void;
  decorationPresets: DecorationPreset[];
  onInsertDecoration: (preset: DecorationPreset) => void;
  brandPresets: BrandPreset[];
  activeBrand: BrandPreset;
  setActiveBrand: (brand: BrandPreset) => void;
  snippetPresets: SnippetPreset[];
  onInsertSnippet: (snippet: SnippetPreset) => void;
}

const ThumbnailRenderer = ({ value }: { value: string }) => {
  const isUrl = value.startsWith('http') || value.startsWith('data:');
  return (
    <div className="w-full h-full relative bg-gray-50 flex items-center justify-center overflow-hidden">
      {isUrl ? (
        <img src={value} className="w-full h-full object-cover" alt="thumbnail" />
      ) : (
        <span className="material-symbols-outlined text-primary/30 text-[20px]">{value}</span>
      )}
    </div>
  );
};

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  activeTab,
  setActiveTab,
  bgPresets,
  activeBg,
  setActiveBg,
  decorationPresets,
  onInsertDecoration,
  brandPresets,
  activeBrand,
  setActiveBrand,
  snippetPresets,
  onInsertSnippet,
}) => {
  return (
    <aside className="w-[240px] bg-white border-r border-studio-border flex flex-col h-full z-30 shrink-0 overflow-hidden">
      <nav className="flex border-b border-studio-border shrink-0 bg-white">
        {(['BACKGROUND', 'DECORATION', 'PRESETS', 'BRAND'] as SidebarTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-[9px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab 
                ? 'text-primary bg-primary/5 border-b-2 border-primary' 
                : 'text-studio-sub hover:bg-studio-bg'
            }`}
          >
            {tab === 'BACKGROUND' ? '底纹' : tab === 'DECORATION' ? '组件' : tab === 'PRESETS' ? '预设' : '品牌'}
          </button>
        ))}
      </nav>

      <div className="flex-1 overflow-y-auto p-3 space-y-6 scrollbar-thin scrollbar-thumb-gray-200">
        {activeTab === 'BACKGROUND' && (
          <div className="space-y-4">
            <h4 className="text-[8px] font-black text-gray-400 uppercase tracking-widest px-1">全景底纹库 ({bgPresets.length})</h4>
            <div className="grid grid-cols-2 gap-2">
              {bgPresets.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setActiveBg(bg)}
                  className={`group flex flex-col items-center gap-2 p-1.5 rounded-xl border transition-all ${
                    activeBg.id === bg.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-studio-border hover:bg-studio-bg'
                  }`}
                >
                  <div className="w-full aspect-[3/2] rounded-lg overflow-hidden shrink-0 shadow-sm border border-studio-border/50">
                    <ThumbnailRenderer value={bg.thumbnail} />
                  </div>
                  <span className="text-[9px] font-black text-studio-dark truncate w-full text-center tracking-tighter px-1">{bg.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'DECORATION' && (
          <div className="space-y-4">
            <h4 className="text-[8px] font-black text-gray-400 uppercase tracking-widest px-1">排版组件库 ({decorationPresets.length})</h4>
            <div className="grid grid-cols-1 gap-2">
              {decorationPresets.map((dec) => (
                <button
                  key={dec.id}
                  onClick={() => onInsertDecoration(dec)}
                  className="group relative flex items-center justify-between p-2.5 rounded-xl border border-studio-border hover:border-primary hover:bg-primary/5 transition-all text-left bg-white overflow-hidden shadow-sm hover:shadow-md active:scale-95"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary/40">{dec.icon}</span>
                    <span className="text-[9px] font-black uppercase">{dec.name}</span>
                  </div>
                  {dec.isVip && <span className="ml-2 text-orange-500 text-[7px] font-black border border-orange-200 px-1 rounded bg-orange-50 shrink-0">PRO</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'PRESETS' && (
          <div className="space-y-6">
             <div className="space-y-3">
                <h4 className="text-[8px] font-black text-gray-400 uppercase tracking-widest px-1">Header 眉标 / 导语</h4>
                <div className="space-y-2">
                  {snippetPresets.filter(s => s.type === 'HEADER').map(s => (
                    <button key={s.id} onClick={() => onInsertSnippet(s)} className="w-full p-3 rounded-xl border border-studio-border bg-white hover:border-primary hover:bg-primary/[0.02] transition-all text-left group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-50 border border-studio-border flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-primary/30">{s.icon}</span>
                        </div>
                        <div className="flex-1 truncate"><p className="text-[10px] font-black text-studio-dark">{s.name}</p><p className="text-[8px] text-studio-sub font-bold uppercase tracking-tighter">顶部追加</p></div>
                      </div>
                    </button>
                  ))}
                </div>
             </div>
          </div>
        )}

        {activeTab === 'BRAND' && (
          <div className="space-y-4">
            <h4 className="text-[8px] font-black text-gray-400 uppercase tracking-widest px-1">品牌水印预设</h4>
            <div className="grid grid-cols-2 gap-2">
              {brandPresets.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => setActiveBrand(brand)}
                  className={`w-full flex flex-col items-center gap-2 p-2 rounded-xl border transition-all ${
                    activeBrand.id === brand.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-studio-border hover:bg-studio-bg'
                  }`}
                >
                  <div className="w-full aspect-square rounded-lg overflow-hidden shrink-0 shadow-sm flex items-center justify-center bg-gray-50 border border-studio-border/50">
                    <span className="material-symbols-outlined text-primary/30 text-[24px]">{brand.icon}</span>
                  </div>
                  <span className="text-[9px] font-black text-studio-dark truncate w-full text-center tracking-tighter px-1">{brand.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-studio-border bg-gray-50/50 shrink-0">
         <div className="p-2.5 bg-white rounded-xl border border-studio-border shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
               <span className="text-[9px] font-black uppercase text-studio-sub tracking-widest">LIVE SYNCING</span>
            </div>
            <span className="material-symbols-outlined text-[14px] text-gray-300">cloud_done</span>
         </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
