
import React, { useEffect, useState, useRef } from 'react';
/* Corrected: Removed BubbleMenu from @tiptap/react as it is not a standard export for this context or version */
import { EditorContent } from '@tiptap/react';
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
}

/**
 * 智能大纲组件
 * 实时提取 Tiptap 编辑器中的所有 Heading 节点
 */
const TableOfContents: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);

  useEffect(() => {
    if (!editor) return;

    const updateHeadings = () => {
      const items: HeadingItem[] = [];
      // 遍历文档查找标题节点
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

    // 监听编辑器更新和选择变化
    editor.on('update', updateHeadings);
    // 初始化执行一次
    updateHeadings();

    return () => {
      editor.off('update', updateHeadings);
    };
  }, [editor]);

  // 平滑滚动至目标标题
  const scrollToHeading = (index: number) => {
    if (!editor) return;
    // 获取编辑器内部 DOM 中所有的标题元素
    const headingNodes = editor.view.dom.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headingNodes[index]) {
      headingNodes[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="sticky top-24 w-60 shrink-0 hidden xl:block z-20 h-fit">
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
    <div className="absolute top-full left-0 mt-2 p-3 bg-white border border-studio-border rounded-2xl shadow-2xl z-[100] w-48 animate-in fade-in zoom-in-95 duration-200">
      <div className="grid grid-cols-4 gap-2 mb-3">
        {colors.map(color => (
          <button
            key={color}
            onMouseDown={(e) => e.preventDefault()} // 关键：防止点击色块导致编辑器失焦
            onClick={() => onSelect(color)} // 单击即应用
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

const EditorWorkspace: React.FC<EditorWorkspaceProps> = ({
  editor,
  activeBg,
  activeBrand,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!editor) return null;

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    icon, 
    label, 
    isText = false,
    children
  }: { 
    onClick?: (e: React.MouseEvent) => void, 
    isActive?: boolean, 
    icon?: string, 
    label?: string,
    isText?: boolean,
    children?: React.ReactNode
  }) => (
    <div className="relative group/btn-container">
      <button
        onMouseDown={(e) => {
          // 防止点击工具栏按钮时编辑器失去焦点
          e.preventDefault();
        }}
        onClick={(e) => {
          if (onClick) onClick(e);
        }}
        className={`p-2 rounded-xl flex items-center justify-center transition-all group relative ${
          isActive 
            ? 'bg-primary/10 text-primary shadow-inner' 
            : 'hover:bg-studio-bg text-studio-sub hover:text-studio-dark'
        }`}
        title={label}
      >
        {isText ? (
          <span className="text-[10px] font-black">{label}</span>
        ) : (
          <span className="material-symbols-outlined text-[18px]">{icon}</span>
        )}
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-studio-dark text-white text-[8px] font-black rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100] uppercase tracking-widest">
          {label}
        </span>
      </button>
      {children}
    </div>
  );

  const applyHighlightColor = (color: string) => {
    if (color === 'transparent') {
      (editor.chain().focus() as any).unsetMark('span').run();
      (editor.chain().focus() as any).setMark('span', { style: `background-color: transparent` }).run();
    } else {
      (editor.chain().focus() as any).setMark('span', { style: `background-color: ${color}; padding: 2px 4px; border-radius: 4px;` }).run();
    }
    setShowColorPicker(false); // 单击应用后立即关闭面板
  };

  return (
    <section 
      ref={scrollContainerRef}
      className="flex-1 overflow-y-auto bg-studio-bg/60 flex flex-col items-center scroll-smooth pb-32 relative transition-all duration-500"
    >
      
      {/* 1. STICKY TOOLBAR */}
      <div className="sticky top-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-xl border border-studio-border rounded-[22px] p-1.5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] z-50 ring-1 ring-black/5 animate-in slide-in-from-top-4 duration-500">
        <div className="flex items-center gap-0.5 pr-1.5 border-r border-studio-border">
          <ToolbarButton onClick={() => (editor.chain().focus() as any).undo().run()} icon="undo" label="撤销" />
          <ToolbarButton onClick={() => (editor.chain().focus() as any).redo().run()} icon="redo" label="重做" />
        </div>

        <div className="flex items-center gap-0.5 px-1.5 border-r border-studio-border">
          <ToolbarButton onClick={() => (editor.chain().focus() as any).toggleBold().run()} isActive={editor.isActive('bold')} icon="format_bold" label="加粗" />
          <ToolbarButton onClick={() => (editor.chain().focus() as any).toggleItalic().run()} isActive={editor.isActive('italic')} icon="format_italic" label="斜体" />
          <ToolbarButton onClick={() => (editor.chain().focus() as any).toggleStrike().run()} isActive={editor.isActive('strike')} icon="strikethrough_s" label="删除线" />
          <ToolbarButton onClick={() => (editor.chain().focus() as any).toggleCode().run()} isActive={editor.isActive('code')} icon="code" label="行内代码" />
          
          <div ref={colorPickerRef} className="relative">
            <ToolbarButton 
              onClick={() => setShowColorPicker(!showColorPicker)} 
              isActive={showColorPicker} 
              icon="format_color_fill" 
              label="文字背景色"
            >
              {showColorPicker && <ColorPicker onSelect={applyHighlightColor} />}
            </ToolbarButton>
          </div>
        </div>

        <div className="flex items-center gap-0.5 px-1.5 border-r border-studio-border">
          <ToolbarButton onClick={() => (editor.chain().focus() as any).toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} label="H1" isText />
          <ToolbarButton onClick={() => (editor.chain().focus() as any).toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} label="H2" isText />
          <ToolbarButton onClick={() => (editor.chain().focus() as any).toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} label="H3" isText />
          <div className="w-px h-4 bg-studio-border mx-1"></div>
          <ToolbarButton onClick={() => (editor.chain().focus() as any).toggleBulletList().run()} isActive={editor.isActive('bulletList')} icon="format_list_bulleted" label="无序列表" />
          <ToolbarButton onClick={() => (editor.chain().focus() as any).toggleOrderedList().run()} isActive={editor.isActive('orderedList')} icon="format_list_numbered" label="有序列表" />
          <ToolbarButton onClick={() => (editor.chain().focus() as any).toggleBlockquote().run()} isActive={editor.isActive('blockquote')} icon="format_quote" label="引用块" />
          <ToolbarButton onClick={() => (editor.chain().focus() as any).setHorizontalRule().run()} icon="horizontal_rule" label="分割线" />
        </div>

        <div className="flex items-center gap-2 pl-2">
          <button 
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {}}
            className="flex items-center gap-2 px-4 py-2 bg-studio-dark text-white rounded-xl text-[9px] font-black hover:bg-black transition-all uppercase tracking-[0.15em] shadow-lg shadow-black/10 active:scale-95 group overflow-hidden text-nowrap"
          >
            <span className="material-symbols-outlined text-[16px] text-primary animate-pulse">bolt</span>
            智能润色
          </button>
          <ToolbarButton onClick={() => {}} icon="auto_fix" label="AI 续写" />
          <ToolbarButton onClick={() => {}} icon="auto_awesome_motion" label="一键排版" />
        </div>
      </div>

      <div className="flex w-full max-w-[1440px] items-start justify-center gap-12 px-12 mt-8">
        
        {/* LEFT STICKY TOC - 智能大纲 */}
        <TableOfContents editor={editor} />

        {/* 2. ARTICLE CANVAS */}
        <div 
          className={`w-full max-w-[920px] rounded-[32px] shadow-[0_15px_60px_-15px_rgba(0,0,0,0.05)] border border-studio-border relative transition-all duration-700 ease-in-out flex flex-col mb-40 z-10 ${activeBg.class || ''}`}
          style={{
            ...activeBg.style,
            backgroundRepeat: 'repeat',
            backgroundSize: activeBg.style?.backgroundImage && !activeBg.style?.backgroundSize ? 'cover' : activeBg.style?.backgroundSize || 'auto',
            backgroundAttachment: 'scroll'
          }}
        >
          {/* Brand Overlay */}
          <div 
            className="absolute top-0 left-0 right-0 z-20 pointer-events-none overflow-visible"
            dangerouslySetInnerHTML={{ __html: activeBrand.component }}
          />

          {/* EDITOR BODY */}
          <div className="relative z-10 px-6 pt-6 pb-16 md:px-16 md:pt-10 md:pb-24 flex-1">
            <EditorContent editor={editor} />
            
            {/* ARTICLE FOOTER */}
            <div className="mt-20 pt-10 border-t border-studio-border/30 flex items-center justify-between text-[8px] font-black text-studio-sub uppercase tracking-widest">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">edit_note</span> {editor.getText().length} 字</span>
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">speed</span> {Math.ceil(editor.getText().length / 400)} 分钟阅读</span>
              </div>
              <div className="flex items-center gap-1.5 text-primary/50">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                PRO WORKSPACE
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SPACER - TO MATCH TOC WIDTH */}
        <div className="w-60 shrink-0 hidden xl:block"></div>

      </div>
    </section>
  );
};

export default EditorWorkspace;
