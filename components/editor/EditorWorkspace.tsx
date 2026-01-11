
import React, { useEffect, useState, useRef } from 'react';
/* Import EditorContent and BubbleMenu from @tiptap/react correctly */
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

/**
 * 字体颜色选择器
 */
const TextColorPicker = ({ onSelect }: { onSelect: (color: string) => void }) => {
  const [customColor, setCustomColor] = useState('#111418');
  const colors = [
    '#111418', '#137fec', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
    '#617589', '#94a3b8', '#cbd5e1', '#f1f5f9', '#ffffff', '#3b82f6'
  ];

  return (
    <div className="absolute top-full left-0 mt-2 p-3 bg-white border border-studio-border rounded-2xl shadow-2xl z-[100] w-48 animate-in fade-in zoom-in-95 duration-200">
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
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const textColorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
      if (textColorPickerRef.current && !textColorPickerRef.current.contains(event.target as Node)) {
        setShowTextColorPicker(false);
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
    children,
    size = 'md',
    loading = false,
  }: { 
    onClick?: (e: React.MouseEvent) => void, 
    isActive?: boolean, 
    icon?: string, 
    label?: string,
    isText?: boolean,
    children?: React.ReactNode,
    size?: 'sm' | 'md',
    loading?: boolean,
  }) => (
    <div className="relative group/btn-container">
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={(e) => {
          if (onClick && !loading) onClick(e);
        }}
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
          <span className={`${size === 'sm' ? 'text-[9px]' : 'text-[10px]'} font-black`}>{label}</span>
        ) : (
          <span className={`material-symbols-outlined ${size === 'sm' ? 'text-[16px]' : 'text-[18px]'}`}>{icon}</span>
        )}
      </button>
      {children}
    </div>
  );

  /**
   * 核心逻辑：合并新样式而保持现有样式
   */
  const updateSpanStyle = (newStyles: Record<string, string>) => {
    const currentAttributes = editor.getAttributes('span');
    const existingStyle = currentAttributes.style || '';
    
    // 解析现有内联样式为对象
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

    // 合并新样式
    Object.keys(newStyles).forEach(key => {
      const val = newStyles[key];
      if (val === 'transparent' || val === '') {
        delete styleObj[key];
        // 如果是背景颜色透明，同时移除 padding 和 border-radius
        if (key === 'background-color') {
          delete styleObj['padding'];
          delete styleObj['border-radius'];
        }
      } else {
        styleObj[key] = val;
      }
    });

    // 重新构建样式字符串
    const mergedStyle = Object.entries(styleObj)
      .map(([k, v]) => `${k}: ${v}`)
      .join('; ');

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

  /**
   * 智能润色：优化选中文字或当前段落
   */
  const handleAiPolish = async () => {
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to, ' ') || editor.getText();
    if (!text.trim()) return;

    setIsAiProcessing(true);
    try {
      const prompt = `你是一位顶尖的新媒体编辑，擅长提升文字的感染力、逻辑性和专业感。请对以下内容进行深度润色（仅返回润色后的内容，不要有任何解释性文字）：\n\n${text}`;
      const result = await callAI(prompt);
      if (result) {
        editor.chain().focus().insertContentAt({ from, to }, result).run();
      }
    } catch (err) {
      console.error('Polish failed', err);
    } finally {
      setIsAiProcessing(false);
    }
  };

  /**
   * AI 续写：根据上下文继续写作
   */
  const handleAiContinue = async () => {
    const text = editor.getText();
    if (!text.trim()) return;

    setIsAiProcessing(true);
    try {
      const prompt = `你是一位全能的内容创作者。请根据以下现有文章内容的语境和风格，继续进行精彩的创作。要求：1. 保持风格一致。2. 内容有深度。3. 长度约 200 字左右。4. 仅返回续写的文本内容。\n\n内容如下：\n${text}`;
      const result = await callAI(prompt);
      if (result) {
        editor.chain().focus().insertContentAt(editor.state.doc.content.size, `\n${result}`).run();
      }
    } catch (err) {
      console.error('Continue failed', err);
    } finally {
      setIsAiProcessing(false);
    }
  };

  /**
   * 一键排版：AI 自动美化全文
   */
  const handleAutoLayout = async () => {
    const content = editor.getHTML();
    if (!editor.getText().trim()) return;

    setIsAiProcessing(true);
    try {
      const prompt = `你是一位顶级视觉排版大师。请将以下 HTML 内容重新排版，使其像专业杂志一样精美。
      要求：
      1. 在合适的位置插入符合语境的装饰块（例如章节标题样式、引用金句样式、数据展示卡片等）。
      2. 装饰块必须使用带有 class="decoration-block" 的 div 容器包裹，内部使用内联样式。
      3. 保持原有的所有文字内容不丢失，仅进行结构重组 and 视觉增强。
      4. 仅返回排版后的全量 HTML。
      内容如下：\n${content}`;
      const result = await callAI(prompt);
      if (result) {
        editor.commands.setContent(result);
      }
    } catch (err) {
      console.error('Auto layout failed', err);
    } finally {
      setIsAiProcessing(false);
    }
  };

  return (
    <section 
      ref={scrollContainerRef}
      className="flex-1 overflow-y-auto bg-studio-bg/60 flex flex-col items-center scroll-smooth pb-32 relative transition-all duration-500"
    >
      
      {/* 
          BubbleMenu component is used here to display a floating toolbar when text is selected.
          FIX: Corrected import from '@tiptap/react' and using it as a component.
      */}
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bubble-menu flex items-center gap-0.5 bg-studio-dark/95 backdrop-blur-md px-1.5 py-1 rounded-2xl shadow-2xl border border-white/10">
            <ToolbarButton size="sm" onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} icon="format_bold" label="加粗" />
            <ToolbarButton size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} icon="format_italic" label="斜体" />
            <ToolbarButton size="sm" onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive('code')} icon="code" label="行内代码" />
            <div className="w-px h-3 bg-white/10 mx-1"></div>
            <div ref={textColorPickerRef} className="relative">
              <ToolbarButton size="sm" onClick={() => setShowTextColorPicker(!showTextColorPicker)} isActive={showTextColorPicker} icon="format_color_text" label="文字颜色">
                {showTextColorPicker && <TextColorPicker onSelect={applyTextColor} />}
              </ToolbarButton>
            </div>
            <div className="w-px h-3 bg-white/10 mx-1"></div>
            <ToolbarButton size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} label="H2" isText />
            <ToolbarButton size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} label="H3" isText />
            <div className="w-px h-3 bg-white/10 mx-1"></div>
            <ToolbarButton size="sm" onClick={handleAiPolish} loading={isAiProcessing} icon="auto_fix_high" label="AI 润色选中" />
          </div>
        </BubbleMenu>
      )}

      {/* 1. STICKY TOOLBAR */}
      <div className="sticky top-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-xl border border-studio-border rounded-[22px] p-1.5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] z-50 ring-1 ring-black/5 animate-in slide-in-from-top-4 duration-500">
        <div className="flex items-center gap-0.5 pr-1.5 border-r border-studio-border">
          <ToolbarButton onClick={() => editor.chain().focus().undo().run()} icon="undo" label="撤销" />
          <ToolbarButton onClick={() => editor.chain().focus().redo().run()} icon="redo" label="重做" />
        </div>

        <div className="flex items-center gap-0.5 px-1.5 border-r border-studio-border">
          <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} icon="format_bold" label="加粗" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} icon="format_italic" label="斜体" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} icon="strikethrough_s" label="删除线" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive('code')} icon="code" label="行内代码" />
          
          <div ref={textColorPickerRef} className="relative">
            <ToolbarButton 
              onClick={() => setShowTextColorPicker(!showTextColorPicker)} 
              isActive={showTextColorPicker} 
              icon="format_color_text" 
              label="文字颜色"
            >
              {showTextColorPicker && <TextColorPicker onSelect={applyTextColor} />}
            </ToolbarButton>
          </div>

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
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} label="H1" isText />
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} label="H2" isText />
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} label="H3" isText />
          <div className="w-px h-4 bg-studio-border mx-1"></div>
          <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} icon="format_list_bulleted" label="无序列表" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} icon="format_list_numbered" label="有序列表" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} icon="format_quote" label="引用块" />
          <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} icon="horizontal_rule" label="分割线" />
        </div>

        <div className="flex items-center gap-2 px-2 border-r border-studio-border mr-1.5">
          <button 
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleAiPolish}
            disabled={isAiProcessing}
            className="flex items-center gap-2 px-4 py-2 bg-studio-dark text-white rounded-xl text-[9px] font-black hover:bg-black transition-all uppercase tracking-[0.15em] shadow-lg shadow-black/10 active:scale-95 group overflow-hidden text-nowrap disabled:opacity-50"
          >
            {isAiProcessing ? (
              <div className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            ) : (
              <span className="material-symbols-outlined text-[16px] text-primary animate-pulse">bolt</span>
            )}
            智能润色
          </button>
          <ToolbarButton onClick={handleAiContinue} loading={isAiProcessing} icon="auto_fix" label="AI 续写" />
          <ToolbarButton onClick={handleAutoLayout} loading={isAiProcessing} icon="auto_awesome_motion" label="一键排版" />
        </div>

        <div className="pl-1.5">
          <ToolbarButton 
            onClick={() => setShowToc(!showToc)} 
            isActive={showToc} 
            icon="toc" 
            label={showToc ? "关闭大纲" : "开启大纲"} 
          />
        </div>
      </div>

      <div className="flex w-full max-w-[1440px] items-start justify-center gap-12 px-12 mt-8">
        
        {showToc && <TableOfContents editor={editor} />}

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

        <div className="w-60 shrink-0 hidden xl:block"></div>

      </div>
    </section>
  );
};

export default EditorWorkspace;
