
import React from 'react';
import { BrandPreset } from '../EditorTypes';

interface BrandLibraryProps {
  items: BrandPreset[];
  activeId: string;
  onSelect: (brand: BrandPreset) => void;
}

const BrandLibrary: React.FC<BrandLibraryProps> = ({ items, activeId, onSelect }) => (
  <div className="space-y-4 animate-in fade-in slide-in-from-left-2 duration-300">
    <h4 className="text-[8px] font-black text-gray-400 uppercase tracking-widest px-1">品牌水印预设</h4>
    <div className="grid grid-cols-2 gap-3">
      {items.map((brand) => (
        <button
          key={brand.id}
          onClick={() => onSelect(brand)}
          className={`w-full flex flex-col items-center gap-2.5 p-3 rounded-[20px] border transition-all duration-300 ${
            activeId === brand.id 
              ? 'border-primary bg-primary/5 shadow-md shadow-primary/10' 
              : 'border-studio-border hover:border-primary/30 hover:bg-studio-bg'
          }`}
        >
          <div className="w-full aspect-square rounded-[14px] overflow-hidden shrink-0 shadow-sm flex items-center justify-center bg-white border border-studio-border/50">
            <span className={`material-symbols-outlined text-[28px] ${activeId === brand.id ? 'text-primary' : 'text-primary/20'}`}>
              {brand.icon}
            </span>
          </div>
          <span className={`text-[9px] font-black truncate w-full text-center tracking-tighter ${activeId === brand.id ? 'text-primary' : 'text-studio-dark'}`}>
            {brand.name}
          </span>
        </button>
      ))}
    </div>
  </div>
);

export default BrandLibrary;
