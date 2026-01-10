
import React from 'react';

interface TopNavProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  onNotificationClick?: () => void;
  onHelpClick?: () => void;
  onStartCreation?: () => void;
  onTriggerAiCreation?: () => void;
  hasUnread?: boolean;
}

const TopNav: React.FC<TopNavProps> = ({ 
  title, 
  subtitle, 
  actions, 
  onNotificationClick, 
  onHelpClick, 
  onStartCreation,
  onTriggerAiCreation,
  hasUnread = true 
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-studio-border px-6 py-2 flex items-center justify-between h-[64px]">
      <div className="flex flex-col">
        <h2 className="text-sm font-black text-studio-dark tracking-tight">{title}</h2>
        {subtitle && <p className="text-[10px] text-studio-sub font-medium truncate max-w-[300px]">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* 核心行动按钮组 */}
        {onStartCreation && (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-500">
            <button 
              onClick={onTriggerAiCreation}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 text-[11px] font-black rounded-xl border border-indigo-100 hover:bg-indigo-100 transition-all group"
            >
              <span className="material-symbols-outlined text-[18px] animate-pulse group-hover:rotate-12 transition-transform">auto_awesome</span>
              AI 一键创作
            </button>
            <button 
              onClick={onStartCreation}
              className="flex items-center gap-2 px-5 py-2 bg-primary text-white text-[11px] font-black rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">edit_square</span>
              开始创作
            </button>
          </div>
        )}

        <div className="flex items-center gap-1 border-l border-studio-border pl-4 ml-1">
           {actions}
           <button 
            onClick={onNotificationClick}
            className="p-1.5 text-studio-sub hover:bg-primary/5 hover:text-primary rounded-full transition-all relative group"
           >
              <span className="material-symbols-outlined text-[20px] transition-transform group-active:scale-90">notifications</span>
              {hasUnread && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full border border-white animate-pulse"></span>
              )}
           </button>
           <button 
            onClick={onHelpClick}
            className="p-1.5 text-studio-sub hover:bg-gray-50 rounded-full transition-colors group"
           >
              <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">help</span>
           </button>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
