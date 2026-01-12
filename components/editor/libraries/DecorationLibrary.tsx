
import React from 'react';
import { DecorationPreset } from '../EditorTypes';

interface DecorationLibraryProps {
  items: DecorationPreset[];
  onInsert: (preset: DecorationPreset) => void;
}

// 内部预定义更多高保真排版组件
const extraDecorations: DecorationPreset[] = [
  {
    id: 'dec-rainbow-wave-1',
    name: '彩虹波浪标题',
    isVip: true,
    icon: 'air',
    template: `
      <div class="decoration-block" style="margin: 30px 0;">
        <h2 style="margin: 0 0 10px; font-size: 24px; font-weight: 900; color: #1e293b; letter-spacing: -0.5px;">在此输入精彩标题</h2>
        <div style="height: 6px; width: 80px; background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899); -webkit-mask: url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%226%22 viewBox=%220 0 12 6%22%3E%3Cpath d=%22M0 3 Q 3 0 6 3 T 12 3%22 stroke=%22black%22 stroke-width=%222%22 fill=%22none%22/%3E%3C/svg%3E') repeat-x; mask: url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%226%22 viewBox=%220 0 12 6%22%3E%3Cpath d=%22M0 3 Q 3 0 6 3 T 12 3%22 stroke=%22black%22 stroke-width=%222%22 fill=%22none%22/%3E%3C/svg%3E') repeat-x; -webkit-mask-size: 12px 6px; mask-size: 12px 6px;"></div>
      </div>`
  },
  {
    id: 'dec-geo-layer-1',
    name: '几何叠层标题',
    isVip: true,
    icon: 'layers',
    // 使用 contenteditable="false" 锁定装饰部分
    template: `
      <div class="decoration-block dec-tight-reset" style="margin: 40px 0; display: flex; justify-content: center; line-height: 0;">
        <div style="display: block; line-height: 0;">
          <div contenteditable="false" style="width: 46px; box-sizing: border-box; margin: 0; padding: 0; line-height: 0; font-size: 0; user-select: none;">
            <img src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 79.57 44.93%22%3E%3Cpath d%3D%22M0%2C25.36%2C72.79%2C0h0l6.78%2C19.57h0L6.79%2C44.93h0L0%2C25.36Z%22 fill%3D%22%23d8220f%22 fill-rule%3D%22evenodd%22 opacity%3D%220.4%22%2F%3E%3C%2Fsvg%3E" style="display: block; width: 100%; height: auto; pointer-events: none; margin: 0;" alt="decoration" />
          </div>
          <div contenteditable="false" style="background-color: #ffc45d; padding: 3px; border-radius: 5px; margin-left: 10px; margin-top: -22px; box-sizing: border-box; position: relative; line-height: 0; user-select: none;">
            <div style="background-color: #fffaed; padding: 3px 8px; border-radius: 4px; box-sizing: border-box; line-height: 1;">
              <div contenteditable="true" style="outline: none;">
                <p style="margin: 0; font-size: 16px; color: #d8220f; font-weight: 900; letter-spacing: 1px; white-space: nowrap; line-height: 1.2; user-select: text;">面向未来的私人定制</p>
              </div>
            </div>
          </div>
        </div>
      </div>`
  },
  {
    id: 'dec-number-heading-1',
    name: '巨型序号标题',
    icon: 'format_list_numbered',
    // 锁定外部容器，提供上下两个独立的编辑入口，优化间距使其更紧凑
    template: `
      <div class="decoration-block dec-tight-reset" style="margin: 50px 0; text-align: center;">
        <div contenteditable="false" style="user-select: none;">
          <!-- Editable Number Area -->
          <div style="display: flex; justify-content: center; line-height: 1;">
             <div contenteditable="true" style="outline: none; min-width: 10px;">
               <p style="margin: 0; font-size: 64px; line-height: 0.8; font-weight: 900; font-style: italic; color: #94a3b8; letter-spacing: -2px; font-family: ui-sans-serif, system-ui, sans-serif; user-select: text;">03<span style="color: #137fec">.</span></p>
             </div>
          </div>
          
          <!-- Editable Title Area -->
          <div style="margin-top: 8px; display: flex; justify-content: center;">
             <div contenteditable="true" style="outline: none; max-width: 90%;">
               <h3 style="margin: 0; font-size: 20px; font-weight: 800; color: #1e293b; letter-spacing: -0.5px; line-height: 1.3; user-select: text;">从“概念机”到全球可售的成熟产品</h3>
             </div>
          </div>
        </div>
      </div>`
  },
  {
    id: 'dec-title-border-1',
    name: '渐变框标题',
    isVip: true,
    icon: 'tab_unselected',
    template: `
      <div class="decoration-block" style="margin: 40px 0; padding: 20px; border: 2px solid; border-image: linear-gradient(135deg, #137fec, #10b981) 1; background: rgba(19, 127, 236, 0.02);">
        <h2 style="margin: 0; font-size: 24px; font-weight: 900; color: #1a1a1a; letter-spacing: -0.5px;">此处输入核心议题</h2>
        <p style="margin: 8px 0 0; font-size: 13px; color: #64748b; font-weight: 500;">SUBTITLE CAPTION / 副标题描述文字</p>
      </div>`
  },
  {
    id: 'dec-title-icon-1',
    name: '图标前缀标题',
    icon: 'label_important',
    template: `
      <div class="decoration-block" style="margin: 40px 0; display: flex; align-items: center; gap: 12px;">
        <div style="width: 32px; height: 32px; background: #137fec; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white;">
          <span class="material-symbols-outlined" style="font-size: 20px;">rocket_launch</span>
        </div>
        <h2 style="margin: 0; font-size: 22px; font-weight: 900; color: #111; border-bottom: 2px solid #f0f2f4; padding-bottom: 4px; flex: 1;">关键里程碑</h2>
      </div>`
  },
  {
    id: 'dec-title-icon-2',
    name: '渐变图标标题',
    icon: 'stars',
    template: `
      <div class="decoration-block" style="margin: 40px 0; display: flex; align-items: center; gap: 16px;">
        <div contenteditable="false" style="user-select: none; width: 44px; height: 44px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 4px 10px rgba(139, 92, 246, 0.3); transform: rotate(-3deg);">
          <span class="material-symbols-outlined" style="font-size: 26px;">auto_awesome</span>
        </div>
        <div style="flex: 1;">
          <h2 style="margin: 0; font-size: 22px; font-weight: 900; color: #1f2937;">探索无限可能</h2>
          <div contenteditable="false" style="user-select: none; width: 30px; height: 3px; background: #ddd6fe; margin-top: 6px; border-radius: 2px;"></div>
        </div>
      </div>`
  },
  {
    id: 'dec-title-wave-1',
    name: '水波纹标题',
    isVip: true,
    icon: 'waves',
    template: `
      <div class="decoration-block" style="margin: 40px 0; position: relative; padding-bottom: 15px;">
        <h2 style="margin: 0; font-size: 26px; font-weight: 900; color: #1a1a1a; position: relative; z-index: 2;">深度思考与探索</h2>
        <div style="position: absolute; bottom: 0; left: 0; width: 120px; height: 10px; background: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%2210%22><path d=%22M0 5 Q 15 0, 30 5 T 60 5 T 90 5 T 120 5%22 fill=%22none%22 stroke=%22%23137fec%22 stroke-width=%223%22/></svg>'); opacity: 0.4;"></div>
      </div>`
  },
  {
    id: 'dec-marker-1',
    name: '马克笔手绘标题',
    icon: 'edit_note',
    template: `
      <div class="decoration-block" style="margin: 30px 0; display: inline-block; position: relative;">
        <span style="position: absolute; bottom: 2px; left: -5px; width: 110%; height: 40%; background: #ffe082; z-index: -1; transform: rotate(-1deg); opacity: 0.7; border-radius: 2px;"></span>
        <h3 style="margin: 0; font-size: 20px; font-weight: 900; color: #111;">在此处划重点</h3>
      </div>`
  },
  {
    id: 'dec-glass-1',
    name: '毛玻璃数据块',
    isVip: true,
    icon: 'blur_on',
    template: `
      <div class="decoration-block" style="margin: 40px 0; padding: 30px; background: rgba(255, 255, 255, 0.4); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.5); border-radius: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <p style="margin: 0; font-size: 11px; font-weight: 900; color: #137fec; text-transform: uppercase; letter-spacing: 2px;">Market Share</p>
            <h4 style="margin: 4px 0 0; font-size: 32px; font-weight: 900; color: #1e293b;">85.4%</h4>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 12px; font-weight: 800; color: #10b981;">↑ 12.5%</span>
            <p style="margin: 0; font-size: 10px; color: #94a3b8;">VS LAST YEAR</p>
          </div>
        </div>
      </div>`
  },
  {
    id: 'dec-side-quote-1',
    name: '侧边引言栏',
    icon: 'format_indent_increase',
    template: `
      <div class="decoration-block" style="margin: 40px 0; padding: 24px; background: #f8fafc; border-radius: 0 24px 24px 0; border-left: 6px solid #137fec;">
        <p style="margin: 0; font-size: 16px; font-weight: 700; color: #334155; font-style: italic; line-height: 1.6;">
          “ 技术的真正价值不在于复杂，而在于它如何简化了人类的表达欲望。”
        </p>
        <p style="margin: 12px 0 0; font-size: 12px; font-weight: 900; color: #94a3b8; text-align: right;">— GENIX 首席架构师</p>
      </div>`
  }
];

const DecorationLibrary: React.FC<DecorationLibraryProps> = ({ items, onInsert }) => {
  // 合并原始数据和扩展装饰组件
  const allItems = [...items, ...extraDecorations];

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-left-2 duration-300">
      <div className="flex items-center justify-between px-1">
        <h4 className="text-[8px] font-black text-gray-400 uppercase tracking-widest">排版组件库</h4>
        <span className="text-[8px] font-bold text-primary bg-primary/5 px-1.5 py-0.5 rounded">{allItems.length}</span>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {allItems.map((dec) => (
          <button
            key={dec.id}
            onClick={() => onInsert(dec)}
            className="group relative flex items-center justify-between p-3 rounded-[16px] border border-studio-border hover:border-primary hover:bg-primary/[0.02] transition-all text-left bg-white shadow-sm hover:shadow-md active:scale-[0.98]"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-studio-bg flex items-center justify-center text-studio-sub group-hover:text-primary transition-colors shrink-0">
                <span className="material-symbols-outlined text-[18px]">{dec.icon}</span>
              </div>
              <span className="text-[10px] font-black text-studio-dark uppercase tracking-tight truncate">{dec.name}</span>
            </div>
            {dec.isVip && (
              <span className="text-orange-500 text-[7px] font-black border border-orange-200 px-1.5 py-0.5 rounded-full bg-orange-50 shrink-0">PRO</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DecorationLibrary;
