
import React, { useState, useEffect } from 'react';
import { useEditor } from '@tiptap/react';
import { Node, Mark, mergeAttributes } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import Code from '@tiptap/extension-code';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Blockquote from '@tiptap/extension-blockquote';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import ListItem from '@tiptap/extension-list-item';

import { BackgroundPreset, BrandPreset, SidebarTab } from '../components/editor/EditorTypes';
import { bgPresets, decorationPresets, brandPresets, snippetPresets } from '../components/editor/EditorData';
import LeftSidebar from '../components/editor/LeftSidebar';
import RightSidebar from '../components/editor/RightSidebar';
import EditorWorkspace from '../components/editor/EditorWorkspace';
import { GoogleGenAI } from "@google/genai";

const STORAGE_DRAFT_KEY = 'genix_editor_draft';

// Define a custom Mark for span tags to handle custom styles like background-color
const SpanMark = Mark.create({
  name: 'span',
  priority: 100,
  addAttributes() {
    return {
      style: {
        default: null,
        parseHTML: element => element.getAttribute('style'),
        renderHTML: attributes => {
          if (!attributes.style) return {};
          return { style: attributes.style };
        },
      },
      class: {
        default: null,
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => {
          if (!attributes.class) return {};
          return { class: attributes.class };
        },
      },
    };
  },
  parseHTML() {
    return [{ tag: 'span' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0];
  },
});

const Div = Node.create({
  name: 'div',
  group: 'block',
  content: 'block+',
  defining: true,
  addAttributes() { return { class: { default: null }, style: { default: null } }; },
  parseHTML() { 
    return [{ 
      tag: 'div',
      priority: 51,
      getAttrs: node => (node as HTMLElement).classList.contains('ProseMirror-trailingCursor') ? false : null,
    }]; 
  },
  renderHTML({ HTMLAttributes }) { return ['div', mergeAttributes(HTMLAttributes), 0]; },
});

const Image = Node.create({
  name: 'image',
  group: 'block',
  inline: false,
  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      style: { default: null },
      class: { default: null },
    };
  },
  parseHTML() { return [{ tag: 'img' }]; },
  renderHTML({ HTMLAttributes }) { return ['img', mergeAttributes(HTMLAttributes)]; },
});

interface EditorProps {
  onBack: () => void;
  onPublish: (content: string, title: string, bg: BackgroundPreset, brand: BrandPreset) => void;
  onNavigateUpgrade: () => void;
}

const EditorView: React.FC<EditorProps> = ({ onBack, onPublish }) => {
  const [title, setTitle] = useState('未命名文章');
  const [summary, setSummary] = useState('');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800');
  const [activeTab, setActiveTab] = useState<SidebarTab>('BACKGROUND');
  
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);
  
  const [activeBg, setActiveBg] = useState<BackgroundPreset>(bgPresets[0]);
  const [activeBrand, setActiveBrand] = useState<BrandPreset>(brandPresets[0]);

  // AI 自动写作状态
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiIdea, setAiIdea] = useState('');
  const [aiLoadingStage, setAiLoadingStage] = useState<'IDLE' | 'TITLES' | 'GENERATING'>('IDLE');
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);

  const editor = useEditor({
    extensions: [
      StarterKit, Bold, Italic, Strike, Code,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList, OrderedList, ListItem, Blockquote, HorizontalRule,
      Div, SpanMark, Image, 
      Placeholder.configure({ placeholder: '在此处落笔您的灵感，或者点击左侧“AI创作”快速生成内容...' })
    ],
    content: '',
    editorProps: { attributes: { class: 'prose prose-sm prose-blue max-w-none focus:outline-none' } },
    onUpdate({ editor }) {
      // 触发自动保存
      saveToStorage(editor.getHTML());
    }
  });

  // 1. 初始化时从 LocalStorage 恢复
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_DRAFT_KEY);
    if (saved) {
      try {
        const draft = JSON.parse(saved);
        if (draft.title) setTitle(draft.title);
        if (draft.summary) setSummary(draft.summary);
        if (draft.coverImage) setCoverImage(draft.coverImage);
        if (draft.bgId) {
          const matchedBg = bgPresets.find(b => b.id === draft.bgId);
          if (matchedBg) setActiveBg(matchedBg);
        }
        if (draft.brandId) {
          const matchedBrand = brandPresets.find(b => b.id === draft.brandId);
          if (matchedBrand) setActiveBrand(matchedBrand);
        }
        // 只有当 editor 初始化完成后再注入内容
        if (editor && draft.content) {
          editor.commands.setContent(draft.content);
        }
      } catch (e) {
        console.error("Failed to restore draft", e);
      }
    }
  }, [editor]);

  // 2. 状态变化时自动保存（除了 content 之外的元数据）
  useEffect(() => {
    saveToStorage();
  }, [title, summary, coverImage, activeBg, activeBrand]);

  const saveToStorage = (currentContent?: string) => {
    const content = currentContent || editor?.getHTML() || '';
    const draft = {
      title,
      summary,
      coverImage,
      bgId: activeBg.id,
      brandId: activeBrand.id,
      content,
      updatedAt: new Date().getTime()
    };
    localStorage.setItem(STORAGE_DRAFT_KEY, JSON.stringify(draft));
  };

  const toggleZenMode = () => {
    setIsLeftCollapsed(!isLeftCollapsed);
    setIsRightCollapsed(!isRightCollapsed);
  };

  // 处理 AI 标题生成
  const handleGenerateTitles = async () => {
    if (!aiIdea.trim()) return;
    setAiLoadingStage('TITLES');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `你是一位专业的新媒体运营总监，擅长写爆款标题。请根据用户的想法：'${aiIdea}'，给出 4 个具有吸引力的文章标题，涵盖不同的风格（如：专业严谨、情感共鸣、极客前沿、实用指南）。请仅返回 JSON 数组格式，例如 ["标题1", "标题2", "标题3", "标题4"]`,
        config: { responseMimeType: "application/json" }
      });
      // Corrected: response.text is a property
      const titles = JSON.parse(response.text || "[]");
      setSuggestedTitles(titles);
    } catch (err) {
      console.error(err);
      alert('AI 标题生成失败，请重试。');
    } finally {
      setAiLoadingStage('IDLE');
    }
  };

  // 处理 AI 全文生成
  const handleGenerateFullArticle = async (selectedTitle: string) => {
    setAiLoadingStage('GENERATING');
    setTitle(selectedTitle);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `你是一位全能的数字内容创作者。请为标题为《${selectedTitle}》的文章生成深度且排版优美的正文内容。
        要求：
        1. 使用 HTML 格式，包含 h2, h3, p, strong, blockquote 标签。
        2. 内容要长且深度，分为 3-4 个章节。
        3. 请根据文章主题建议一个背景底纹 ID（从 [w-1, w-grid-1, w-grid-2, w-paper-1, w-linen-1, w-gradient-1, w-dark-1, w-modern-1] 中选一个）和 封面关键词。
        请返回如下 JSON 格式：
        {
          "html": "...",
          "summary": "100字左右的摘要",
          "suggestedBgId": "w-grid-1",
          "coverKeywords": "tech, abstract, future"
        }`,
        config: { responseMimeType: "application/json" }
      });
      
      // Corrected: response.text is a property
      const result = JSON.parse(response.text || "{}");
      editor?.commands.setContent(result.html);
      setSummary(result.summary);
      
      // 自动设置底纹
      const matchedBg = bgPresets.find(b => b.id === result.suggestedBgId);
      if (matchedBg) setActiveBg(matchedBg);
      
      // 自动生成封面图
      setCoverImage(`https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200&sig=${Math.random()}`);
      
      // AI 生成后立即执行一次强制持久化
      saveToStorage(result.html);

      setIsAiModalOpen(false);
      setAiIdea('');
      setSuggestedTitles([]);
    } catch (err) {
      console.error(err);
      alert('AI 文章生成失败，请重试。');
    } finally {
      setAiLoadingStage('IDLE');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-studio-bg font-sans overflow-hidden">
      <header className="h-[52px] px-4 bg-white border-b border-studio-border flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 hover:bg-studio-bg rounded-lg transition-colors text-studio-sub"><span className="material-symbols-outlined text-[20px]">arrow_back</span></button>
          <div className="h-4 w-px bg-studio-border"></div>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-transparent border-none text-[11px] font-black text-studio-dark w-[450px] focus:ring-0 p-0" placeholder="文章标题..." />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
           <button onClick={toggleZenMode} className={`flex items-center gap-2 px-5 py-1.5 rounded-full border transition-all duration-500 hover:scale-[1.03] active:scale-95 group ${isLeftCollapsed && isRightCollapsed ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/10' : 'bg-white text-studio-sub border-studio-border hover:text-primary hover:border-primary/20'}`}>
             <span className="material-symbols-outlined text-[18px] transition-transform duration-500 group-hover:rotate-180">{isLeftCollapsed && isRightCollapsed ? 'fullscreen_exit' : 'fullscreen'}</span>
             <span className="text-[9px] font-black uppercase tracking-[0.2em] hidden md:block">{isLeftCollapsed && isRightCollapsed ? '退出全屏' : '禅定模式'}</span>
           </button>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsAiModalOpen(true)}
            className="px-6 py-2 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-all flex items-center gap-2 h-[36px]"
          >
            <span className="material-symbols-outlined text-[18px] animate-pulse">auto_awesome</span>
            AI 一键创作
          </button>
          <button onClick={() => onPublish(editor?.getHTML() || '', title, activeBg, activeBrand)} className="px-6 py-2 bg-primary text-white text-[10px] font-black rounded-lg shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest h-[36px]">
            预览并发布文章
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        <div className={`transition-all duration-500 ease-in-out overflow-hidden border-r border-studio-border bg-white ${isLeftCollapsed ? 'w-0 opacity-0' : 'w-[240px] opacity-100'}`}>
          <LeftSidebar 
            activeTab={activeTab} setActiveTab={setActiveTab}
            bgPresets={bgPresets} activeBg={activeBg} setActiveBg={setActiveBg}
            decorationPresets={decorationPresets} onInsertDecoration={(p) => editor?.chain().focus().insertContent(p.template).run()}
            brandPresets={brandPresets} activeBrand={brandPresets.find(b => b.id === activeBrand.id) || activeBrand} setActiveBrand={setActiveBrand}
            snippetPresets={snippetPresets} onInsertSnippet={(s) => {
              if (!editor) return;
              const cleanContent = s.content.replace(/>\s+</g, '><'); 
              if (s.type === 'HEADER') editor.chain().focus().insertContentAt(0, cleanContent).run();
              else editor.chain().focus().insertContentAt(editor.state.doc.content.size, cleanContent).run();
            }}
          />
        </div>
        
        <div className="flex-1 relative overflow-hidden flex flex-col">
           <EditorWorkspace editor={editor} activeBg={activeBg} activeBrand={activeBrand} />
        </div>

        <div className={`transition-all duration-500 ease-in-out overflow-hidden border-l border-studio-border bg-white ${isRightCollapsed ? 'w-0 opacity-0' : 'w-[260px] opacity-100'}`}>
          <RightSidebar 
            coverImage={coverImage} isGeneratingCover={false} onGenerateCover={() => {}}
            summary={summary} setSummary={setSummary} isGeneratingSummary={false} onGenerateSummary={() => {}}
          />
        </div>
      </div>

      {/* AI 创作弹窗 */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsAiModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl p-10 space-y-8 animate-in zoom-in-95 duration-300">
            <header className="text-center space-y-2">
               <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                 <span className="material-symbols-outlined text-4xl">auto_awesome</span>
               </div>
               <h2 className="text-2xl font-black text-studio-dark">AI 智能辅助创作</h2>
               <p className="text-xs text-studio-sub font-medium">输入你的想法，Genix 将为你构建完整的叙事框架与排版。</p>
            </header>

            {aiLoadingStage === 'GENERATING' ? (
              <div className="py-20 text-center space-y-6">
                <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
                <div className="space-y-1">
                  <p className="text-sm font-black text-studio-dark animate-pulse">正在深度构建内容架构...</p>
                  <p className="text-[10px] text-studio-sub font-bold uppercase tracking-widest">GEMINI 3 PRO IS THINKING</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">你的创作灵感</label>
                  <textarea 
                    value={aiIdea}
                    onChange={(e) => setAiIdea(e.target.value)}
                    className="w-full bg-studio-bg border-none rounded-3xl p-5 text-sm font-medium focus:ring-2 ring-indigo-500/20 h-32 resize-none"
                    placeholder="例如：写一篇关于远程办公如何提升工作效率的文章，要有数据支撑..."
                  />
                </div>

                {suggestedTitles.length > 0 ? (
                  <div className="space-y-3 animate-in slide-in-from-bottom-4 duration-500">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">AI 推荐标题 (点击即可生成全文)</label>
                    <div className="grid grid-cols-1 gap-2">
                      {suggestedTitles.map((t, i) => (
                        <button 
                          key={i} 
                          onClick={() => handleGenerateFullArticle(t)}
                          className="w-full text-left p-4 bg-indigo-50/50 hover:bg-indigo-50 rounded-2xl border border-indigo-100/50 transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-indigo-900 leading-tight">{t}</span>
                            <span className="material-symbols-outlined text-indigo-300 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={handleGenerateTitles}
                    disabled={!aiIdea || aiLoadingStage === 'TITLES'}
                    className="w-full py-4 bg-indigo-600 text-white rounded-[24px] font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {aiLoadingStage === 'TITLES' ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <span className="material-symbols-outlined">magic_button</span>}
                    获取爆款标题
                  </button>
                )}
              </div>
            )}

            <p className="text-center text-[9px] text-studio-sub font-bold uppercase tracking-widest">
              基于 GEMINI 3 PRO 多模态引擎驱动
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorView;
