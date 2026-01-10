
import React from 'react';

interface TopNavProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  onNotificationClick?: () => void;
  onHelpClick?: () => void;
  hasUnread?: boolean;
}

const TopNav: React.FC<TopNavProps> = ({ title, subtitle, actions, onNotificationClick, onHelpClick, hasUnread = true }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-studio-border px-6 py-2 flex items-center justify-between h-[52px]">
      <div className="flex flex-col">
        <h2 className="text-sm font-black text-studio-dark tracking-tight">{title}</h2>
        {subtitle && <p className="text-[10px] text-studio-sub font-medium truncate max-w-[400px]">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {actions}
        <div className="flex items-center gap-1 border-l border-studio-border pl-3 ml-1">
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
