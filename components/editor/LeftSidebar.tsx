
import React from 'react';
import { BackgroundPreset, DecorationPreset, BrandPreset, SnippetPreset, SidebarTab } from './EditorTypes';
import BackgroundLibrary from './libraries/BackgroundLibrary';
import DecorationLibrary from './libraries/DecorationLibrary';
import PresetLibrary from './libraries/PresetLibrary';
import BrandLibrary from './libraries/BrandLibrary';

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
    <aside className="w-[240px] bg-white border-r border-studio-border flex flex-col h-full z-30 shrink-0 overflow-hidden shadow-inner">
      {/* 顶部标签栏 */}
      <nav className="flex border-b border-studio-border shrink-0 bg-white sticky top-0 z-10">
        {(['BACKGROUND', 'DECORATION', 'PRESETS', 'BRAND'] as SidebarTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3.5 text-[9px] font-black uppercase tracking-[0.15em] transition-all relative ${
              activeTab === tab 
                ? 'text-primary' 
                : 'text-studio-sub hover:text-studio-dark hover:bg-studio-bg/50'
            }`}
          >
            {tab === 'BACKGROUND' ? '底纹' : tab === 'DECORATION' ? '组件' : tab === 'PRESETS' ? '预设' : '品牌'}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-1/4 right-1/4 h-[3px] bg-primary rounded-t-full animate-in fade-in zoom-in duration-300"></div>
            )}
          </button>
        ))}
      </nav>

      {/* 主内容区域 - 物理拆分后的组件集合 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-hide">
        {activeTab === 'BACKGROUND' && (
          <BackgroundLibrary items={bgPresets} activeId={activeBg.id} onSelect={setActiveBg} />
        )}

        {activeTab === 'DECORATION' && (
          <DecorationLibrary items={decorationPresets} onInsert={onInsertDecoration} />
        )}

        {activeTab === 'PRESETS' && (
          <PresetLibrary items={snippetPresets} onInsert={onInsertSnippet} />
        )}

        {activeTab === 'BRAND' && (
          <BrandLibrary items={brandPresets} activeId={activeBrand.id} onSelect={setActiveBrand} />
        )}
      </div>

      {/* 底部状态条 */}
      <div className="p-3 border-t border-studio-border bg-gray-50/50 shrink-0">
        <div className="p-2.5 bg-white/80 backdrop-blur rounded-[14px] border border-studio-border shadow-sm flex items-center justify-between group">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[9px] font-black uppercase text-studio-sub tracking-[0.1em] group-hover:text-studio-dark transition-colors">实时同步激活</span>
          </div>
          <span className="material-symbols-outlined text-[16px] text-gray-300 group-hover:text-primary transition-colors">cloud_done</span>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
