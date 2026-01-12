
import React, { useEffect, useState, useRef } from 'react';
import { EditorContent, BubbleMenu } from '@tiptap/react';
import { Editor } from '@tiptap/core';
import { BackgroundPreset, BrandPreset } from './EditorTypes';

interface HeadingItem {
  text: string;
  level: number;
  id: string;
}

interface EditorWorkspaceProps {
  editor: Editor | null;
  activeBg: BackgroundPreset;
  activeBrand: BrandPreset;
  callAI: (prompt: string, isJson?: boolean) => Promise<string>;
}

/**
 * 智能大纲组件
 */
const TableOfContents: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);

  useEffect(() => {
    if (!editor) return;

    const updateHeadings = () => {
      const items: HeadingItem[] = [];
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'heading') {
          const text = node.textContent;
          const level = node.attrs.level;
          const id = `heading-${pos}`;
          if (text) items.push({ text, level, id });
        }
      });
      setHeadings(items);
    };

    editor.on('update', updateHeadings);
    updateHeadings();

    return () => {
      editor.off('update', updateHeadings);
    };
  }, [editor]);

  const scrollToHeading = (index: number) => {
    if (!editor) return;
    const headingNodes = editor.view.dom.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headingNodes[index]) {
      headingNodes[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="w-full shrink-0 z-20 h-fit">
      <div className="bg-white/60 backdrop-blur-xl border border-studio-border rounded-[28px] p-5 shadow-sm space-y-4 animate-in fade-in slide-in-from-left-4 duration-700">
        <div className="flex items-center gap-2 border-b border-studio-border pb-3">
          <span className="material-symbols-outlined text-[16px] text-primary font-bold">toc</span>
          <span className="text-[9px] font-black text-studio-dark uppercase tracking-widest">智能大纲</span>
        </div>

        <div className="max-h-[60vh] overflow-y-auto scrollbar-hide space-y-3">
          {headings.length === 0 ? (
            <p className="text-[9px] text-studio-sub font-medium italic">等待输入内容...</p>
          ) : (
            headings.map((h, i) => (
              <button
                key={h.id}
                onClick={() => scrollToHeading(i)}
                className={`block text-left hover:translate-x-1 transition-all group w-full ${
                  h.level === 1 ? 'pl-0' : h.level === 2 ? 'pl-3' : 'pl-5'
                }`}
              >
                <p
                  className={`truncate leading-tight ${
                    h.level === 1
                      ? 'text-[10px] font-black text-studio-dark group-hover:text-primary'
                      : 'text-[9px] font-bold text-studio-sub group-hover:text-studio-dark border-l-2 border-transparent group-hover:border-primary/30 pl-1.5'
                  }`}
                >
                  {h.text}
                </p>
              </button>
            ))
          )}
        </div>

        <div className="pt-3 border-t border-studio-border">
          <div className="h-0.5 w-full bg-studio-bg rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-700"
              style={{ width: `${Math.min(100, (headings.length / 10) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ColorPicker = ({ onSelect }: { onSelect: (color: string) => void }) => {
  const [customColor, setCustomColor] = useState('#137fec');
  const colors = [
    'transparent', '#137fec', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', 
    '#e7f2fd', '#ecfdf5', '#fffbeb', '#fef2f2', '#f5f3ff', '#334155'
  ];

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-3 bg-white border border-studio-border rounded-2xl shadow-2xl z-[100] w-48 animate-in fade-in zoom-in-95 duration-200">
      <div className="grid grid-cols-4 gap-2 mb-3">
        {colors.map(color => (
          <button
            key={color}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onSelect(color)}
            className="w-8 h-8 rounded-lg border border-studio-border shadow-sm hover:scale-110 transition-transform flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: color }}
          >
            {color === 'transparent' && <span className="material-symbols-outlined text-[16px] text-gray-400">format_color_reset</span>}
          </button>
        ))}
      </div>
      <div className="pt-3 border-t border-studio-border flex items-center gap-2">
        <input 
          type="color" 
          value={customColor} 
          onChange={(e) => setCustomColor(e.target.value)}
          className="w-6 h-6 p-0 border-none bg-transparent cursor-pointer shrink-0"
        />
        <input 
          type="text" 
          value={customColor}
          onChange={(e) => setCustomColor(e.target.value)}
          className="flex-1 bg-studio-bg border-none text-[10px] font-mono p-1 rounded uppercase"
        />
        <button 
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onSelect(customColor)}
          className="p-1 bg-primary text-white rounded hover:bg-primary-dark"
        >
          <span className="material-symbols-outlined text-[14px]">check</span>
        </button>
      </div>
    </div>
  );
};

const TextColorPicker = ({ onSelect }: { onSelect: (color: string) => void }) => {
  const [customColor, setCustomColor] = useState('#111418');
  const colors = [
    '#111418', '#137fec', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
    '#617589', '#94a3b8', '#cbd5e1', '#f1f5f9', '#ffffff', '#3b82f6'
  ];

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-3 bg-white border border-studio-border rounded-2xl shadow-2xl z-[100] w-48 animate-in fade-in zoom-in-95 duration-200">
      <div className="grid grid-cols-4 gap-2 mb-3">
        {colors.map(color => (
          <button
            key={color}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onSelect(color)}
            className="w-8 h-8 rounded-lg border border-studio-border shadow-sm hover:scale-110 transition-transform flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <div className="pt-3 border-t border-studio-border flex items-center gap-2">
        <input 
          type="color" 
          value={customColor} 
          onChange={(e) => setCustomColor(e.target.value)}
          className="w-6 h-6 p-0 border-none bg-transparent cursor-pointer shrink-0"
        />
        <input 
          type="text" 
          value={customColor}
          onChange={(e) => setCustomColor(e.target.value)}
          className="flex-1 bg-studio-bg border-none text-[10px] font-mono p-1 rounded uppercase"
        />
        <button 
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onSelect(customColor)}
          className="p-1 bg-primary text-white rounded hover:bg-primary-dark"
        >
          <span className="material-symbols-outlined text-[14px]">check</span>
        </button>
      </div>
    </div>
  );
};

const EditorWorkspace: React.FC<EditorWorkspaceProps> = ({
  editor,
  activeBg,
  activeBrand,
  callAI,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showAlignMenu, setShowAlignMenu] = useState(false);
  const [showSizeMenu, setShowSizeMenu] = useState(false);
  const [showHeadingMenu, setShowHeadingMenu] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const textColorPickerRef = useRef<HTMLDivElement>(null);
  const alignMenuRef = useRef<HTMLDivElement>(null);
  const sizeMenuRef = useRef<HTMLDivElement>(null);
  const headingMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (colorPickerRef.current && !colorPickerRef.current.contains(target)) setShowColorPicker(false);
      if (textColorPickerRef.current && !textColorPickerRef.current.contains(target)) setShowTextColorPicker(false);
      if (alignMenuRef.current && !alignMenuRef.current.contains(target)) setShowAlignMenu(false);
      if (sizeMenuRef.current && !sizeMenuRef.current.contains(target)) setShowSizeMenu(false);
      if (headingMenuRef.current && !headingMenuRef.current.contains(target)) setShowHeadingMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const handleScroll = () => setShowBackToTop(container.scrollTop > 300);
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  if (!editor) return null;

  const handleScrollToTop = () => scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    icon, 
    label, 
    isText = false,
    children,
    size = 'md',
    loading = false,
    className = "",
  }: { 
    onClick?: (e: React.MouseEvent) => void, 
    isActive?: boolean, 
    icon?: string, 
    label?: string,
    isText?: boolean,
    children?: React.ReactNode,
    size?: 'sm' | 'md',
    loading?: boolean,
    className?: string,
  }) => (
    <div className={`relative group/btn-container ${className}`}>
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={(e) => { if (onClick && !loading) onClick(e); }}
        className={`${size === 'sm' ? 'p-1.5' : 'p-2'} rounded-xl flex items-center justify-center transition-all group relative ${
          isActive 
            ? 'bg-primary/10 text-primary shadow-inner' 
            : 'hover:bg-studio-bg text-studio-sub hover:text-studio-dark'
        } ${loading ? 'opacity-50 cursor-wait' : ''}`}
        title={label}
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        ) : isText ? (
          <span className={`${size === 'sm' ? 'text-[9px]' : 'text-[10px]'} font-black px-1`}>{label}</span>
        ) : (
          <span className={`material-symbols-outlined ${size === 'sm' ? 'text-[16px]' : 'text-[18px]'}`}>{icon}</span>
        )}
      </button>
      {children}
    </div>
  );

  const updateSpanStyle = (newStyles: Record<string, string>) => {
    const currentAttributes = editor.getAttributes('span');
    const existingStyle = currentAttributes.style || '';
    const styleObj: Record<string, string> = {};
    existingStyle.split(';').forEach((s: string) => {
      const pair = s.trim();
      if (!pair) return;
      const colonIndex = pair.indexOf(':');
      if (colonIndex === -1) return;
      const key = pair.slice(0, colonIndex).trim();
      const val = pair.slice(colonIndex + 1).trim();
      if (key && val) styleObj[key] = val;
    });

    Object.keys(newStyles).forEach(key => {
      const val = newStyles[key];
      if (val === 'transparent' || val === '' || val === null) {
        delete styleObj[key];
        if (key === 'background-color') {
          delete styleObj['padding'];
          delete styleObj['border-radius'];
        }
      } else {
        styleObj[key] = val;
      }
    });

    const mergedStyle = Object.entries(styleObj).map(([k, v]) => `${k}: ${v}`).join('; ');
    if (!mergedStyle) {
      editor.chain().focus().unsetMark('span').run();
    } else {
      editor.chain().focus().setMark('span', { style: mergedStyle }).run();
    }
  };

  const applyHighlightColor = (color: string) => {
    updateSpanStyle({ 
      'background-color': color,
      'padding': color === 'transparent' ? '' : '2px 4px',
      'border-radius': color === 'transparent' ? '' : '4px'
    });
    setShowColorPicker(false);
  };

  const applyTextColor = (color: string) => {
    updateSpanStyle({ 'color': color });
    setShowTextColorPicker(false);
  };

  const setTextAlign = (align: 'center' | 'right' | 'left') => {
    if (align === 'left') {
      updateSpanStyle({ 'display': '', 'text-align': '' });
    } else {
      updateSpanStyle({ 'display': 'block', 'text-align': align });
    }
    setShowAlignMenu(false);
  };

  const updateFontSize = (direction: 'up' | 'down') => {
    const currentAttributes = editor.getAttributes('span');
    const existingStyle = currentAttributes.style || '';
    let currentSize = 16;
    const match = existingStyle.match(/font-size:\s*(\d+)px/);
    if (match) currentSize = parseInt(match[1]);
    const newSize = direction === 'up' ? currentSize + 2 : Math.max(10, currentSize - 2);
    updateSpanStyle({ 'font-size': `${newSize}px` });
  };

  const handleAiPolish = async () => {
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to, ' ') || editor.getText();
    if (!text.trim()) return;
    setIsAiProcessing(true);
    try {
      const prompt = `你是一位顶尖的新媒体编辑，请对以下内容进行深度润色：\n\n${text}`;
      const result = await callAI(prompt);
      if (result) editor.chain().focus().insertContentAt({ from, to }, result).run();
    } finally { setIsAiProcessing(false); }
  };

  const handleAutoLayout = async () => {
    const content = editor.getHTML();
    if (!editor.getText().trim()) return;
    setIsAiProcessing(true);
    try {
      const prompt = `你是一位顶级视觉排版大师，请将以下 HTML 重新排版：\n${content}`;
      const result = await callAI(prompt);
      if (result) editor.commands.setContent(result);
    } finally { setIsAiProcessing(false); }
  };

  const currentSpanStyle = editor.getAttributes('span').style || '';
  const getAlignIcon = () => {
    if (currentSpanStyle.includes('text-align: center')) return 'format_align_center';
    if (currentSpanStyle.includes('text-align: right')) return 'format_align_right';
    return 'format_align_left';
  };

  return (
    <section ref={scrollContainerRef} className="flex-1 overflow-y-auto bg-studio-bg/60 flex flex-col items-center scroll-smooth pb-32 relative transition-all duration-500">
      
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bubble-menu flex items-center gap-0.5 bg-studio-dark/95 backdrop-blur-md px-1.5 py-1 rounded-2xl shadow-2xl border border-white/10">
            <ToolbarButton size="sm" onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} icon="format_bold" label="加粗" />
            <ToolbarButton size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} icon="format_italic" label="斜体" />
            <div className="w-px h-3 bg-white/10 mx-1"></div>
            <ToolbarButton size="sm" onClick={() => setTextAlign('center')} isActive={currentSpanStyle.includes('text-align: center')} icon="format_align_center" label="居中" />
            <ToolbarButton size="sm" onClick={() => updateFontSize('up')} icon="format_size" label="字号+" />
            <div className="w-px h-3 bg-white/10 mx-1"></div>
            <div ref={textColorPickerRef} className="relative">
              <ToolbarButton size="sm" onClick={() => setShowTextColorPicker(!showTextColorPicker)} isActive={showTextColorPicker} icon="format_color_text" label="颜色">
                {showTextColorPicker && <TextColorPicker onSelect={applyTextColor} />}
              </ToolbarButton>
            </div>
            <div className="w-px h-3 bg-white/10 mx-1"></div>
            <ToolbarButton size="sm" onClick={handleAiPolish} loading={isAiProcessing} icon="auto_fix_high" label="AI 润色" />
          </div>
        </BubbleMenu>
      )}

      {/* 1. COMPACT STICKY TOOLBAR */}
      <div className="sticky top-4 flex items-center gap-1 bg-white/90 backdrop-blur-xl border border-studio-border rounded-[24px] p-1.5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] z-50 ring-1 ring-black/5 animate-in slide-in-from-top-4 duration-500">
        
        {/* Undo Group */}
        <div className="flex bg-studio-bg/50 rounded-xl p-0.5 border border-studio-border/50">
          <ToolbarButton size="sm" onClick={() => editor.chain().focus().undo().run()} icon="undo" label="撤销" />
          <ToolbarButton size="sm" onClick={() => editor.chain().focus().redo().run()} icon="redo" label="重做" />
        </div>

        <div className="w-px h-4 bg-studio-border mx-0.5"></div>

        {/* Text Style Group */}
        <div className="flex gap-0.5">
          <ToolbarButton size="sm" onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} icon="format_bold" label="加粗" />
          <ToolbarButton size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} icon="format_italic" label="斜体" />
          <ToolbarButton size="sm" onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive('code')} icon="code" label="代码" />
        </div>

        {/* Heading Dropdown (Refactored) */}
        <div ref={headingMenuRef} className="relative">
          <ToolbarButton 
            size="sm" 
            onClick={() => setShowHeadingMenu(!showHeadingMenu)} 
            isActive={showHeadingMenu || editor.isActive('heading')} 
            icon="format_h1" 
            label="标题级别" 
          >
            {showHeadingMenu && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-studio-border rounded-xl shadow-xl p-1 flex flex-col min-w-[80px] animate-in fade-in slide-in-from-top-1">
                <button 
                  onClick={() => { editor.chain().focus().setParagraph().run(); setShowHeadingMenu(false); }} 
                  className={`px-3 py-2 text-[10px] font-black text-left rounded-lg transition-colors ${!editor.isActive('heading') ? 'bg-primary/10 text-primary' : 'hover:bg-studio-bg text-studio-sub'}`}
                >
                  正文 (P)
                </button>
                <button 
                  onClick={() => { editor.chain().focus().toggleHeading({ level: 1 }).run(); setShowHeadingMenu(false); }} 
                  className={`px-3 py-2 text-[10px] font-black text-left rounded-lg transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-primary/10 text-primary' : 'hover:bg-studio-bg text-studio-sub'}`}
                >
                  标题 1 (H1)
                </button>
                <button 
                  onClick={() => { editor.chain().focus().toggleHeading({ level: 2 }).run(); setShowHeadingMenu(false); }} 
                  className={`px-3 py-2 text-[10px] font-black text-left rounded-lg transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-primary/10 text-primary' : 'hover:bg-studio-bg text-studio-sub'}`}
                >
                  标题 2 (H2)
                </button>
                <button 
                  onClick={() => { editor.chain().focus().toggleHeading({ level: 3 }).run(); setShowHeadingMenu(false); }} 
                  className={`px-3 py-2 text-[10px] font-black text-left rounded-lg transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-primary/10 text-primary' : 'hover:bg-studio-bg text-studio-sub'}`}
                >
                  标题 3 (H3)
                </button>
                <button 
                  onClick={() => { editor.chain().focus().toggleHeading({ level: 4 }).run(); setShowHeadingMenu(false); }} 
                  className={`px-3 py-2 text-[10px] font-black text-left rounded-lg transition-colors ${editor.isActive('heading', { level: 4 }) ? 'bg-primary/10 text-primary' : 'hover:bg-studio-bg text-studio-sub'}`}
                >
                  标题 4 (H4)
                </button>
              </div>
            )}
          </ToolbarButton>
        </div>

        {/* Align Dropdown */}
        <div ref={alignMenuRef} className="relative">
          <ToolbarButton 
            size="sm" 
            onClick={() => setShowAlignMenu(!showAlignMenu)} 
            isActive={showAlignMenu} 
            icon={getAlignIcon()} 
            label="对齐方式" 
          >
            {showAlignMenu && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-studio-border rounded-xl shadow-xl p-1 flex flex-col min-w-[44px] animate-in fade-in slide-in-from-top-1">
                <ToolbarButton size="sm" onClick={() => setTextAlign('left')} isActive={!currentSpanStyle.includes('text-align')} icon="format_align_left" label="左对齐" />
                <ToolbarButton size="sm" onClick={() => setTextAlign('center')} isActive={currentSpanStyle.includes('text-align: center')} icon="format_align_center" label="居中" />
                <ToolbarButton size="sm" onClick={() => setTextAlign('right')} isActive={currentSpanStyle.includes('text-align: right')} icon="format_align_right" label="右对齐" />
              </div>
            )}
          </ToolbarButton>
        </div>

        {/* Font Size Dropdown */}
        <div ref={sizeMenuRef} className="relative">
          <ToolbarButton 
            size="sm" 
            onClick={() => setShowSizeMenu(!showSizeMenu)} 
            isActive={showSizeMenu} 
            icon="format_size" 
            label="字号调整" 
          >
            {showSizeMenu && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-studio-border rounded-xl shadow-xl p-1 flex flex-col min-w-[44px] animate-in fade-in slide-in-from-top-1">
                <ToolbarButton size="sm" onClick={() => updateFontSize('up')} icon="add" label="加大" />
                <ToolbarButton size="sm" onClick={() => updateFontSize('down')} icon="remove" label="减小" />
              </div>
            )}
          </ToolbarButton>
        </div>

        {/* Color Group */}
        <div className="flex gap-0.5">
          <div ref={textColorPickerRef} className="relative">
            <ToolbarButton size="sm" onClick={() => setShowTextColorPicker(!showTextColorPicker)} isActive={showTextColorPicker} icon="format_color_text" label="文字颜色">
              {showTextColorPicker && <TextColorPicker onSelect={applyTextColor} />}
            </ToolbarButton>
          </div>
          <div ref={colorPickerRef} className="relative">
            <ToolbarButton size="sm" onClick={() => setShowColorPicker(!showColorPicker)} isActive={showColorPicker} icon="format_color_fill" label="背景色">
              {showColorPicker && <ColorPicker onSelect={applyHighlightColor} />}
            </ToolbarButton>
          </div>
        </div>

        <div className="w-px h-4 bg-studio-border mx-0.5"></div>

        {/* Structure Group */}
        <div className="flex gap-0.5">
          <ToolbarButton size="sm" onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} icon="format_quote" label="引用" />
          <ToolbarButton size="sm" onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} icon="format_list_bulleted" label="无序列表" />
        </div>

        <div className="w-px h-4 bg-studio-border mx-0.5"></div>

        {/* AI Actions */}
        <div className="flex items-center gap-1 pl-1">
          <button 
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleAiPolish}
            disabled={isAiProcessing}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-studio-dark text-white rounded-xl text-[9px] font-black hover:bg-black transition-all uppercase tracking-wider shadow-lg shadow-black/5 disabled:opacity-50"
          >
            {isAiProcessing ? <div className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div> : <span className="material-symbols-outlined text-[14px] text-primary">bolt</span>}
            润色
          </button>
          <ToolbarButton size="sm" onClick={handleAutoLayout} loading={isAiProcessing} icon="auto_awesome_motion" label="一键排版" />
        </div>

        <div className="w-px h-4 bg-studio-border mx-0.5"></div>

        <ToolbarButton 
          size="sm"
          onClick={() => setShowToc(!showToc)} 
          isActive={showToc} 
          icon="toc" 
          label="大纲" 
        />
      </div>

      <div className="flex w-full max-w-[1440px] items-start justify-center gap-12 px-12 mt-8">
        <div className="w-60 shrink-0 hidden xl:block sticky top-24">
           {showToc && <TableOfContents editor={editor} />}
        </div>

        <div 
          className={`w-full max-w-[1200px] rounded-[32px] shadow-[0_15px_60px_-15px_rgba(0,0,0,0.05)] border border-studio-border relative transition-all duration-700 ease-in-out flex flex-col mb-40 z-10 ${activeBg.class || ''}`}
          style={{ ...activeBg.style, backgroundRepeat: 'repeat', backgroundSize: activeBg.style?.backgroundImage && !activeBg.style?.backgroundSize ? 'cover' : activeBg.style?.backgroundSize || 'auto' }}
        >
          <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none overflow-visible" dangerouslySetInnerHTML={{ __html: activeBrand.component }} />
          <div className="relative z-10 px-6 pt-6 pb-16 md:px-16 md:pt-10 md:pb-24 flex-1">
            <EditorContent editor={editor} />
            <div className="mt-20 pt-10 border-t border-studio-border/30 flex items-center justify-between text-[8px] font-black text-studio-sub uppercase tracking-widest">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">edit_note</span> {editor.getText().length} 字</span>
              </div>
              <div className="flex items-center gap-1.5 text-primary/50">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                PRO WORKSPACE
              </div>
            </div>
          </div>
        </div>
        <div className="w-60 shrink-0 hidden xl:block"></div>
      </div>

      <div className={`fixed bottom-8 right-8 z-[60] transition-all duration-500 transform ${showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <button onClick={handleScrollToTop} className="w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-xl border border-studio-border shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] flex items-center justify-center text-primary hover:text-primary-dark hover:-translate-y-1 active:scale-95 transition-all group">
          <span className="material-symbols-outlined text-[28px] font-black group-hover:animate-bounce-slow">arrow_upward</span>
        </button>
      </div>
    </section>
  );
};

export default EditorWorkspace;
