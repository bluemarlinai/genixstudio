
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
    <aside className="w-[260px] bg-white border-l border-studio-border flex flex-col z-30 shrink-0 h-full overflow-hidden">
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
                className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 disabled:opacity-50 transition-all flex items-center gap-1 group/ai"
                title="AI 生成封面"
              >
                {isGeneratingCover 
                  ? <div className="w-3 h-3 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div> 
                  : <><span className="material-symbols-outlined text-[14px]">auto_awesome</span><span className="text-[8px] font-black">AI 生成</span></>
                }
              </button>
              <button className="p-1.5 bg-studio-bg text-studio-sub rounded-lg hover:bg-gray-200 transition-colors">
                <span className="material-symbols-outlined text-[14px]">upload</span>
              </button>
            </div>
          </div>
          
          <div className="relative group rounded-xl overflow-hidden border border-studio-border bg-studio-bg aspect-[16/9] shadow-sm transition-all">
            <img src={coverImage} className={`w-full h-full object-cover transition-all duration-700 ${isGeneratingCover ? 'blur-sm grayscale opacity-50' : 'group-hover:scale-105'}`} alt="Cover" />
            
            {isGeneratingCover && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-900/10 backdrop-blur-[2px]">
                <div className="w-6 h-6 border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin mb-2"></div>
                <span className="text-[7px] font-black text-indigo-700 uppercase tracking-[0.2em] animate-pulse">正在构思意境...</span>
              </div>
            )}

            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
              <span className="text-white text-[8px] font-black uppercase tracking-widest border border-white/20 px-2 py-0.5 rounded cursor-pointer">更换图片</span>
            </div>
          </div>
          <p className="text-[7px] text-studio-sub font-medium leading-tight">建议尺寸 16:9，AI 将基于内容创作独特意象。</p>
        </div>

        {/* AI SUMMARY */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-[7.5px] font-black text-gray-400 uppercase tracking-widest block">AI 摘要</label>
            <button 
              onClick={onGenerateSummary} 
              disabled={isGeneratingSummary} 
              className="flex items-center gap-1 px-2 py-1 bg-indigo-600 text-white text-[7.5px] font-black rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all uppercase tracking-widest shadow-lg shadow-indigo-200"
            >
              {isGeneratingSummary ? <div className="w-2 h-2 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <span className="material-symbols-outlined text-[11px]">magic_button</span>} 自动提取
            </button>
          </div>
          <textarea 
            value={summary} 
            onChange={(e) => setSummary(e.target.value)} 
            placeholder="内容摘要..."
            className="w-full rounded-xl border border-studio-border bg-studio-bg text-[10px] p-3 h-28 focus:ring-2 ring-primary/10 transition-all resize-none font-medium leading-relaxed border-none" 
          />
        </div>

        {/* COMPLIANCE CHECK */}
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-emerald-500 text-[18px]">verified</span>
            <span className="text-[8px] font-black text-emerald-900 uppercase tracking-widest">合规性扫描: 安全</span>
          </div>
          <p className="text-[7px] text-emerald-700/70 font-medium">文章内容符合发布规范，无敏感词。您可以放心分发至各平台。</p>
        </div>
      </div>

      <div className="p-3.5 border-t border-studio-border bg-gray-50/50">
        <button className="w-full py-2.5 bg-white border border-studio-border rounded-xl text-[8px] font-black text-studio-sub uppercase tracking-widest hover:text-primary hover:border-primary/30 transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98]">
           <span className="material-symbols-outlined text-[16px]">visibility</span>
           全平台实时预览
        </button>
      </div>
    </aside>
  );
};

export default RightSidebar;
