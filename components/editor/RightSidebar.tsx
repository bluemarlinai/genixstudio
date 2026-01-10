
import React from 'react';

interface RightSidebarProps {
  coverImage: string;
  isGeneratingCover: boolean;
  onGenerateCover: () => void;
  summary: string;
  setSummary: (val: string) => void;
  isGeneratingSummary: boolean;
  onGenerateSummary: () => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  coverImage,
  isGeneratingCover,
  onGenerateCover,
  summary,
  setSummary,
  isGeneratingSummary,
  onGenerateSummary,
}) => {
  return (
    <aside className="w-[260px] bg-white border-l border-studio-border flex flex-col z-30 shrink-0">
      <div className="h-[52px] px-3.5 border-b border-studio-border flex items-center justify-between shrink-0">
        <h3 className="text-[9px] font-black text-studio-dark uppercase tracking-widest flex items-center gap-1.5">
           <span className="material-symbols-outlined text-primary text-[17px]">auto_fix_high</span>
           智能助手
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-3.5 space-y-6">
        {/* COVER SETTINGS */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-[7.5px] font-black text-gray-400 uppercase tracking-widest block">文章封面</label>
            <div className="flex gap-1">
              <button 
                onClick={onGenerateCover} 
                disabled={isGeneratingCover} 
                className="p-1 bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 disabled:opacity-50 transition-all"
                title="AI 生成"
              >
                {isGeneratingCover 
                  ? <div className="w-2.5 h-2.5 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div> 
                  : <span className="material-symbols-outlined text-[13px]">auto_awesome</span>
                }
              </button>
              <button className="p-1 bg-studio-bg text-studio-sub rounded hover:bg-gray-200">
                <span className="material-symbols-outlined text-[13px]">upload</span>
              </button>
            </div>
          </div>
          
          <div className="relative group rounded-xl overflow-hidden border border-studio-border bg-studio-bg aspect-[3/1] shadow-sm transition-all">
            <img src={coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
              <span className="text-white text-[8px] font-black uppercase tracking-widest border border-white/20 px-2 py-0.5 rounded">修改</span>
            </div>
          </div>
        </div>

        {/* AI SUMMARY */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-[7.5px] font-black text-gray-400 uppercase tracking-widest block">AI 摘要</label>
            <button 
              onClick={onGenerateSummary} 
              disabled={isGeneratingSummary} 
              className="flex items-center gap-1 px-2 py-0.5 bg-indigo-600 text-white text-[7.5px] font-black rounded hover:bg-indigo-700 disabled:opacity-50 transition-all uppercase tracking-widest"
            >
              <span className="material-symbols-outlined text-[11px]">magic_button</span> 自动提取
            </button>
          </div>
          <textarea 
            value={summary} 
            onChange={(e) => setSummary(e.target.value)} 
            placeholder="内容摘要..."
            className="w-full rounded-lg border border-studio-border bg-studio-bg text-[10px] p-2.5 h-24 focus:ring-1 ring-primary/20 transition-all resize-none font-medium leading-relaxed border-none" 
          />
        </div>

        {/* COMPLIANCE CHECK */}
        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 space-y-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-emerald-500 text-[16px]">verified</span>
            <span className="text-[8px] font-black text-emerald-900 uppercase tracking-widest">安全校验已通过</span>
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-studio-border bg-gray-50/50">
        <button className="w-full py-2 bg-white border border-studio-border rounded-lg text-[8px] font-black text-studio-sub uppercase tracking-widest hover:text-primary transition-all flex items-center justify-center gap-1.5">
           <span className="material-symbols-outlined text-[15px]">visibility</span>
           多端预览
        </button>
      </div>
    </aside>
  );
};

export default RightSidebar;
