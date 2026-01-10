
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

// --- 类型定义 ---
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
  parseHTML() { return [{ tag: 'span' }]; },
  renderHTML({ HTMLAttributes }) { return ['span', mergeAttributes(HTMLAttributes), 0]; },
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
  autoOpenAiModal?: boolean;
}

const EditorView: React.FC<EditorProps> = ({ onBack, onPublish, autoOpenAiModal }) => {
  const [title, setTitle] = useState('未命名文章');
  const [summary, setSummary] = useState('');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800');
  const [activeTab, setActiveTab] = useState<SidebarTab>('BACKGROUND');
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);
  const [activeBg, setActiveBg] = useState<BackgroundPreset>(bgPresets[0]);
  const [activeBrand, setActiveBrand] = useState<BrandPreset>(brandPresets[0]);
  
  const [isAiModalOpen, setIsAiModalOpen] = useState(autoOpenAiModal || false);
  const [aiIdea, setAiIdea] = useState('');
  const [aiLoadingStage, setAiLoadingStage] = useState<'IDLE' | 'TITLES' | 'GENERATING'>('IDLE');
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);
  const [aiConfigError, setAiConfigError] = useState<string | null>(null);

  const [isGeneratingCover, setIsGeneratingCover] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isTitleCopied, setIsTitleCopied] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit, Bold, Italic, Strike, Code,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList, OrderedList, ListItem, Blockquote, HorizontalRule,
      Div, SpanMark, Image, 
      Placeholder.configure({ placeholder: '在此处落笔您的灵感，或者点击“AI一键创作”快速生成内容...' })
    ],
    content: '',
    editorProps: { attributes: { class: 'prose prose-sm prose-blue max-w-none focus:outline-none' } },
    onUpdate({ editor }) {
      saveToStorage(editor.getHTML());
    }
  });

  const getAIConfig = () => {
    const userKey = localStorage.getItem('user_gemini_api_key');
    const userModel = localStorage.getItem('user_gemini_model');
    const apiKey = userKey || process.env.API_KEY;
    const model = userModel || 'gemini-3-flash-preview';
    
    // 判断是否为第三方模型
    const isThirdParty = model.includes('deepseek') || model.includes('glm') || model.includes('qwen');
    let baseUrl = '';
    if (model.includes('deepseek')) baseUrl = 'https://api.deepseek.com/v1';
    else if (model.includes('glm')) baseUrl = 'https://open.bigmodel.cn/api/paas/v4';
    else if (model.includes('qwen')) baseUrl = 'https://dashscope.aliyun.com/compatible-mode/v1';

    return { apiKey, model, isThirdParty, baseUrl };
  };

  // 通用模型生成函数，支持 Google 和 OpenAI 兼容格式
  const callAI = async (prompt: string, isJson: boolean = false) => {
    const config = getAIConfig();
    if (!config.apiKey) throw new Error('MISSING_KEY');

    if (config.isThirdParty) {
      // 使用 OpenAI 兼容格式请求
      const response = await fetch(`${config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          model: config.model,
          messages: [{ role: 'user', content: prompt }],
          response_format: isJson ? { type: 'json_object' } : undefined
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      return data.choices[0].message.content;
    } else {
      // 使用 Google SDK
      const ai = new GoogleGenAI({ apiKey: config.apiKey });
      const response = await ai.models.generateContent({
        model: config.model,
        contents: prompt,
        config: isJson ? { responseMimeType: "application/json" } : undefined
      });
      return response.text;
    }
  };

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
        if (editor && draft.content) {
          editor.commands.setContent(draft.content);
        }
      } catch (e) { console.error("Failed to restore draft", e); }
    }
  }, [editor]);

  useEffect(() => {
    saveToStorage();
  }, [title, summary, coverImage, activeBg, activeBrand]);

  const saveToStorage = (currentContent?: string) => {
    const content = currentContent || editor?.getHTML() || '';
    const draft = {
      title, summary, coverImage,
      bgId: activeBg.id, brandId: activeBrand.id, content,
      updatedAt: new Date().getTime()
    };
    localStorage.setItem(STORAGE_DRAFT_KEY, JSON.stringify(draft));
  };

  const handleCopyTitle = () => {
    navigator.clipboard.writeText(title).then(() => {
      setIsTitleCopied(true);
      setTimeout(() => setIsTitleCopied(false), 2000);
    });
  };

  const handleTitleDoubleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.select();
  };

  const handleGenerateTitles = async () => {
    if (!aiIdea.trim()) return;
    setAiLoadingStage('TITLES');
    setAiConfigError(null);
    try {
      const prompt = `你是一位专业的新媒体运营总监，擅长写爆款标题。请根据用户的想法：'${aiIdea}'，给出 4 个具有吸引力的文章标题，涵盖不同的风格。请仅返回 JSON 数组格式，例如 ["标题1", "标题2", "标题3", "标题4"]`;
      const result = await callAI(prompt, true);
      const titles = JSON.parse(result || "[]");
      setSuggestedTitles(titles);
    } catch (err: any) {
      console.error(err);
      setAiConfigError(err.message === 'MISSING_KEY' ? '未检测到有效的 API Key。' : `AI 生成失败: ${err.message}`);
    } finally { setAiLoadingStage('IDLE'); }
  };

  const handleGenerateFullArticle = async (selectedTitle: string) => {
    setAiLoadingStage('GENERATING');
    setTitle(selectedTitle);
    try {
      const prompt = `你是一位全能的数字内容创作者。请为标题为《${selectedTitle}》的文章生成深度且排版优美的正文内容。要求：1. 使用 HTML 格式。2. 内容要长且深度。3. 请根据文章主题建议一个背景底纹 ID（可选：w-grid-1, w-paper-1, w-noise-1, w-gradient-1）。请返回如下 JSON 格式：{"html": "...", "summary": "...", "suggestedBgId": "w-grid-1"}`;
      const responseText = await callAI(prompt, true);
      const result = JSON.parse(responseText || "{}");
      editor?.commands.setContent(result.html);
      setSummary(result.summary);
      const matchedBg = bgPresets.find(b => b.id === result.suggestedBgId);
      if (matchedBg) setActiveBg(matchedBg);
      // 封面生成依然优先使用 Gemini Image（因为这是目前唯一的图像模型）
      handleGenerateCover(selectedTitle, result.summary);
      saveToStorage(result.html);
      setIsAiModalOpen(false);
      setAiIdea('');
      setSuggestedTitles([]);
    } catch (err) {
      console.error(err);
      alert('AI 文章生成失败，请重试。');
    } finally { setAiLoadingStage('IDLE'); }
  };

  const handleGenerateCover = async (overrideTitle?: string, overrideSummary?: string) => {
    const currentTitle = overrideTitle || title;
    const currentSummary = overrideSummary || summary || editor?.getText().slice(0, 100) || "";
    if (!currentTitle) return;

    // 图像生成目前固定使用 Gemini 系列，需要检查默认 Key
    const apiKey = localStorage.getItem('user_gemini_api_key') || process.env.API_KEY;
    if (!apiKey) return;

    setIsGeneratingCover(true);
    try {
      const ai = new GoogleGenAI({ apiKey });
      const promptResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze: "${currentTitle}". Summary: "${currentSummary}". Create a professional cinematic image prompt (English, no text).`,
      });
      const visualPrompt = promptResponse.text || currentTitle;

      const imageResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ text: visualPrompt }],
        config: { imageConfig: { aspectRatio: "16:9" } }
      });

      for (const part of imageResponse.candidates[0].content.parts) {
        if (part.inlineData) {
          setCoverImage(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (err) {
      console.error("Cover generation failed", err);
    } finally {
      setIsGeneratingCover(false);
    }
  };

  const handleGenerateSummary = async () => {
    const content = editor?.getText();
    if (!content || content.length < 50) return;
    setIsGeneratingSummary(true);
    try {
      const prompt = `请根据以下文章内容，总结一段 100 字以内的摘要，要求语气专业且吸引人：\n\n${content}`;
      const result = await callAI(prompt);
      setSummary(result || "");
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const toggleZenMode = () => {
    setIsLeftCollapsed(!isLeftCollapsed);
    setIsRightCollapsed(!isRightCollapsed);
  };

  const isZenMode = isLeftCollapsed && isRightCollapsed;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-studio-bg font-sans overflow-hidden">
      <header className="h-[52px] px-4 bg-white border-b border-studio-border flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 hover:bg-studio-bg rounded-lg transition-colors text-studio-sub"><span className="material-symbols-outlined text-[20px]">arrow_back</span></button>
          <div className="h-4 w-px bg-studio-border"></div>
          <div className="flex items-center gap-1 group/title">
            <input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              onDoubleClick={handleTitleDoubleClick}
              className="bg-transparent border-none text-[11px] font-black text-studio-dark w-[350px] focus:ring-0 p-0" 
              placeholder="文章标题..." 
            />
            <button 
              onClick={handleCopyTitle}
              className={`p-1 rounded-md transition-all ${isTitleCopied ? 'text-emerald-500 bg-emerald-50' : 'text-studio-sub hover:bg-studio-bg hover:text-primary opacity-0 group-hover/title:opacity-100'}`}
              title="复制标题"
            >
              <span className="material-symbols-outlined text-[16px]">{isTitleCopied ? 'done' : 'content_copy'}</span>
            </button>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <button 
            onClick={toggleZenMode}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all duration-500 group relative overflow-hidden ${
              isZenMode 
                ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-105' 
                : 'bg-white text-studio-sub border-studio-border hover:border-primary/40 hover:text-primary'
            }`}
          >
            <span className={`material-symbols-outlined text-[20px] transition-transform duration-700 ${isZenMode ? 'rotate-180' : 'rotate-0'}`}>
              {isZenMode ? 'fullscreen_exit' : 'fullscreen'}
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">禅意模式</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setIsAiModalOpen(true)} className="px-6 py-2 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-all flex items-center gap-2 h-[36px]"><span className="material-symbols-outlined text-[18px] animate-pulse">auto_awesome</span>AI 一键创作</button>
          <button onClick={() => onPublish(editor?.getHTML() || '', title, activeBg, activeBrand)} className="px-6 py-2 bg-primary text-white text-[10px] font-black rounded-lg shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest h-[36px]">预览并发布文章</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        <div className={`transition-all duration-500 ease-in-out overflow-hidden border-r border-studio-border bg-white ${isLeftCollapsed ? 'w-0 opacity-0 pointer-events-none' : 'w-[240px] opacity-100'}`}>
          <LeftSidebar 
            activeTab={activeTab} setActiveTab={setActiveTab}
            bgPresets={bgPresets} activeBg={activeBg} setActiveBg={setActiveBg}
            decorationPresets={decorationPresets} onInsertDecoration={(p) => editor?.chain().focus().insertContent(p.template).run()}
            brandPresets={brandPresets} activeBrand={activeBrand} setActiveBrand={setActiveBrand}
            snippetPresets={snippetPresets} onInsertSnippet={(s) => {
              if (!editor) return;
              if (s.type === 'HEADER') editor.chain().focus().insertContentAt(0, s.content).run();
              else editor.chain().focus().insertContentAt(editor.state.doc.content.size, s.content).run();
            }}
          />
        </div>
        <div className="flex-1 relative overflow-hidden flex flex-col">
          <EditorWorkspace editor={editor} activeBg={activeBg} activeBrand={activeBrand} />
        </div>
        <div className={`transition-all duration-500 ease-in-out overflow-hidden border-l border-studio-border bg-white ${isRightCollapsed ? 'w-0 opacity-0 pointer-events-none' : 'w-[260px] opacity-100'}`}>
          <RightSidebar 
            coverImage={coverImage} 
            isGeneratingCover={isGeneratingCover} 
            onGenerateCover={() => handleGenerateCover()} 
            summary={summary} 
            setSummary={setSummary} 
            isGeneratingSummary={isGeneratingSummary} 
            onGenerateSummary={handleGenerateSummary} 
          />
        </div>
      </div>

      {isAiModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsAiModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl p-10 space-y-8 animate-in zoom-in-95 duration-300">
            <header className="text-center space-y-2">
               <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4"><span className="material-symbols-outlined text-4xl">auto_awesome</span></div>
               <h2 className="text-2xl font-black text-studio-dark">AI 智能辅助创作</h2>
               <p className="text-xs text-studio-sub font-medium">输入你的想法，Genix 将为你构建完整的叙事框架与排版。</p>
            </header>

            {aiLoadingStage === 'GENERATING' ? (
              <div className="py-20 text-center space-y-6">
                <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
                <p className="text-sm font-black text-studio-dark animate-pulse">正在深度构建内容架构...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {aiConfigError && (
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3">
                    <span className="material-symbols-outlined text-rose-500">error</span>
                    <p className="text-[10px] text-rose-700 font-bold">{aiConfigError}</p>
                  </div>
                )}
                <textarea value={aiIdea} onChange={(e) => setAiIdea(e.target.value)} className="w-full bg-studio-bg border-none rounded-3xl p-5 text-sm font-medium focus:ring-2 ring-indigo-500/20 h-32 resize-none" placeholder="例如：写一篇关于远程办公如何提升工作效率的文章..." />
                {suggestedTitles.length > 0 ? (
                  <div className="grid grid-cols-1 gap-2">
                    {suggestedTitles.map((t, i) => (
                      <button key={i} onClick={() => handleGenerateFullArticle(t)} className="w-full text-left p-4 bg-indigo-50 hover:bg-indigo-100 rounded-2xl border border-indigo-100 transition-all flex justify-between">
                        <span className="text-xs font-black text-indigo-900">{t}</span>
                        <span className="material-symbols-outlined text-indigo-300">arrow_forward</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <button onClick={handleGenerateTitles} disabled={!aiIdea || aiLoadingStage === 'TITLES'} className="w-full py-4 bg-indigo-600 text-white rounded-[24px] font-black text-xs uppercase tracking-widest shadow-xl disabled:opacity-50 flex items-center justify-center gap-2">
                    {aiLoadingStage === 'TITLES' ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <span className="material-symbols-outlined">magic_button</span>}获取爆款标题
                  </button>
                )}
              </div>
            )}
            <p className="text-center text-[9px] text-studio-sub font-bold uppercase tracking-widest">
              正在运行: {getAIConfig().model.toUpperCase()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorView;
