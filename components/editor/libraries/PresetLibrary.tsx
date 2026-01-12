
import React from 'react';
import { SnippetPreset } from '../EditorTypes';

interface PresetLibraryProps {
  items: SnippetPreset[];
  onInsert: (snippet: SnippetPreset) => void;
}

const PresetLibrary: React.FC<PresetLibraryProps> = ({ items, onInsert }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-left-2 duration-300">
    <div className="space-y-3">
      <h4 className="text-[8px] font-black text-gray-400 uppercase tracking-widest px-1">Header 眉标 / 导语</h4>
      <div className="space-y-2.5">
        {items.filter(s => s.type === 'HEADER').map(s => (
          <button 
            key={s.id} 
            onClick={() => onInsert(s)} 
            className="w-full p-3 rounded-[18px] border border-studio-border bg-white hover:border-primary hover:bg-primary/[0.01] transition-all text-left group shadow-sm active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors">{s.icon}</span>
              </div>
              <div className="flex-1 truncate">
                <p className="text-[10px] font-black text-studio-dark group-hover:text-primary transition-colors">{s.name}</p>
                <p className="text-[8px] text-studio-sub font-bold uppercase tracking-widest mt-0.5 opacity-60">一键追加至顶部</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default PresetLibrary;
