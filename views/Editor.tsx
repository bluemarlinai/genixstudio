
import React, { useState } from 'react';
import { useEditor } from '@tiptap/react';
import { Node, mergeAttributes } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import BubbleMenu from '@tiptap/extension-bubble-menu';
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

const Span = Node.create({
  name: 'span',
  group: 'inline',
  inline: true,
  content: 'text*', 
  addAttributes() { return { class: { default: null }, style: { default: null } }; },
  parseHTML() { return [{ tag: 'span' }]; },
  renderHTML({ HTMLAttributes }) { return ['span', mergeAttributes(HTMLAttributes), 0]; },
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
  const [title, setTitle] = useState('🎨太酷啦！NotebookLM生成PPT也太丝滑了！这效果直接拿去毕业答辩/路演，稳了！🏆');
  const [summary, setSummary] = useState('深度测评 Google 最新黑科技 NotebookLM 的 PPT 自动化生成能力...');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800');
  const [activeTab, setActiveTab] = useState<SidebarTab>('BACKGROUND');
  
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);
  
  const [activeBg, setActiveBg] = useState<BackgroundPreset>(bgPresets[1]);
  const [activeBrand, setActiveBrand] = useState<BrandPreset>(brandPresets[0]);

  const toggleZenMode = () => {
    setIsLeftCollapsed(!isLeftCollapsed);
    setIsRightCollapsed(!isRightCollapsed);
  };

  const longContent = `
    <div class="article-meta" style="margin-bottom: 40px; font-family: -apple-system-font, system-ui, sans-serif;">
      <p style="margin: 0; font-size: 15px; color: #888888; letter-spacing: 1px; line-height: 1.4;">
        GENIX INSIGHTS <span style="margin: 0 4px; color: #137fec; font-weight: 700;">AI 效率实验室</span>
      </p>
      <p style="margin: 4px 0 0; font-size: 13px; color: #b2b2b2; line-height: 1.4;">发布时间：2024年12月15日 · 阅读时间约 10 分钟</p>
    </div>

    <h1 style="font-size: 32px; font-weight: 900; line-height: 1.3; color: #111; margin-bottom: 24px;">为什么 NotebookLM 正在杀死传统的 PPT 制作逻辑？</h1>

    <p style="line-height: 1.8; letter-spacing: 0.02em; margin-bottom: 24px; color: #333; font-size: 17px;">
      在这个“人人皆可 AI”的时代，我们见惯了各种生成 PPT 的工具。从早期的 Gamma 到后来的 Canva Magic Design，虽然视觉上越来越华丽，但始终存在一个<strong>致命伤</strong>：内容空洞。它们生成的文字往往是泛泛而谈的废话，根本无法支撑起一场严肃的<strong>毕业答辩</strong>或<strong>商业路演</strong>。
    </p>

    <div class="decoration-block" style="margin: 40px 0; padding: 24px; background: #f0f7ff; border-radius: 20px; border-left: 6px solid #137fec; position: relative;">
      <span class="material-symbols-outlined" style="position: absolute; right: 16px; top: 16px; color: #137fec; opacity: 0.2; font-size: 40px;">lightbulb</span>
      <h4 style="margin: 0 0 8px; font-size: 14px; font-weight: 900; color: #137fec; text-transform: uppercase; letter-spacing: 1px;">Key Insight / 核心观察</h4>
      <p style="margin: 0; font-size: 16px; font-weight: 700; color: #1e293b; line-height: 1.6;">NotebookLM 的 PPT 生成逻辑是“基于事实的重组”，而不是“基于概率的瞎编”。这正是专业人士最需要的能力。</p>
    </div>

    <h2 style="font-size: 24px; font-weight: 850; border-bottom: 2px solid #eee; padding-bottom: 12px; margin: 48px 0 24px;">一、 痛点直击：为什么你的 PPT 总是“答非所问”？</h2>

    <p style="line-height: 1.8; margin-bottom: 20px;">
      想象一下，你有一篇 2 万字的毕业论文，或者一份 50 页的市场调研报告。如果你想把它转化成 15 页的答辩 PPT，传统的路径是：
    </p>
    <ul style="margin-bottom: 24px; padding-left: 20px; line-height: 2;">
      <li>阅读全文并手动提取大纲（耗时 2-4 小时）；</li>
      <li>手动排版每一页的标题和要点（耗时 3 小时）；</li>
      <li>寻找合适的逻辑图表（耗时 2 小时）。</li>
    </ul>
    <p style="line-height: 1.8; margin-bottom: 24px;">
      而市面上的通用型 AI，往往会因为无法完全理解你文档中的专业术语、实验数据或逻辑推演，生成的内容牛头不对马嘴。<strong>Google NotebookLM</strong> 的出现，彻底改变了这个博弈规则。
    </p>

    <div class="decoration-block" style="margin: 32px 0; display: flex; gap: 16px;">
        <div style="flex: 1; background: #fff; padding: 20px; border-radius: 20px; text-align: center; border: 1px solid #f0f2f4; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
          <p style="font-size: 10px; font-weight: 900; color: #137fec; margin-bottom: 8px;">TRADITIONAL</p>
          <p style="font-size: 15px; font-weight: 800; color: #334155;">体力驱动<br/>容易遗漏数据</p>
        </div>
        <div style="flex: 1; background: #137fec; padding: 20px; border-radius: 20px; text-align: center; color: white;">
          <p style="font-size: 10px; font-weight: 900; color: rgba(255,255,255,0.7); margin-bottom: 8px;">NOTEBOOKLM</p>
          <p style="font-size: 15px; font-weight: 800;">逻辑驱动<br/>100% 来源溯源</p>
        </div>
    </div>

    <h2 style="font-size: 24px; font-weight: 850; border-bottom: 2px solid #eee; padding-bottom: 12px; margin: 48px 0 24px;">二、 深度测评：NotebookLM 生成 PPT 的“保姆级”流程</h2>

    <p style="line-height: 1.8; margin-bottom: 20px;">经过我们实验室连续一周的测试，我们总结出了让 NotebookLM 生成“高含金量”PPT 的三个核心步骤：</p>

    <h3 style="font-size: 20px; font-weight: 800; margin: 32px 0 16px; color: #137fec;">1. 喂养：建立高质量的本地知识库</h3>
    <p style="line-height: 1.8; margin-bottom: 20px;">
      NotebookLM 最大的优势在于 RAG（检索增强生成）。你不仅可以上传 PDF，还可以直接粘贴网页链接。对于毕业答辩，建议直接喂入：
    </p>
    <code style="display: block; background: #f8fafc; padding: 16px; border-radius: 12px; font-family: monospace; font-size: 13px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
      - 论文正文.pdf<br/>
      - 实验原始数据表.xlsx<br/>
      - 指导老师的修改建议.docx
    </code>

    <h3 style="font-size: 20px; font-weight: 800; margin: 32px 0 16px; color: #137fec;">2. 提炼：利用音频笔记进行“预处理”</h3>
    <p style="line-height: 1.8; margin-bottom: 24px;">
      这是最神奇的一步！先让 NotebookLM 生成一个 <strong>Audio Overview</strong>。通过两个虚拟主持人的对话，你能瞬间听出你文档中最重要的“论点”和“亮点”。把这些对话内容转录为文字，作为 PPT 的逻辑主轴。
    </p>

    <div class="decoration-block" style="margin: 40px 0; text-align: center; padding: 40px 20px; background: #ffffff; border: 1px solid #eeeeee; border-radius: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.03);">
        <p style="font-size: 48px; color: #137fec; margin: 0; line-height: 1; opacity: 0.2; font-family: serif;">“</p>
        <p style="font-size: 20px; font-weight: 800; color: #111; margin: 10px 0 20px; line-height: 1.5; font-style: italic;">
          NotebookLM 不只是在总结，它在帮你‘翻译’复杂的论文逻辑，将其降维打击为通俗易懂的展示逻辑。
        </p>
        <div style="width: 40px; height: 2px; background: #137fec; margin: 0 auto;"></div>
    </div>

    <h3 style="font-size: 20px; font-weight: 800; margin: 32px 0 16px; color: #137fec;">3. 转化：基于 Prompt 的结构化输出</h3>
    <p style="line-height: 1.8; margin-bottom: 24px;">
      在右侧对话框输入：“请基于上传的所有文档，为我起草一份 12 页的学术答辩 PPT 大纲。要求：每一页包含标题、核心论点（Bullet points）、以及建议的视觉图表（如：此处建议使用对比柱状图）。确保引用具体的数据支持。”
    </p>

    <h2 style="font-size: 24px; font-weight: 850; border-bottom: 2px solid #eee; padding-bottom: 12px; margin: 48px 0 24px;">三、 对比实验：NotebookLM vs 传统 AI 助手</h2>

    <div style="overflow-x: auto; margin-bottom: 32px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left;">
        <thead>
          <tr style="background: #f1f5f9;">
            <th style="padding: 12px; border: 1px solid #e2e8f0;">维度</th>
            <th style="padding: 12px; border: 1px solid #e2e8f0;">NotebookLM</th>
            <th style="padding: 12px; border: 1px solid #e2e8f0;">某常用 GPT 工具</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">数据真实性</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; color: #059669;">极高 (严格遵循原文)</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; color: #dc2626;">中等 (偶有幻觉)</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">专业逻辑</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; color: #059669;">极强 (理解长文本脉络)</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; color: #d97706;">一般 (碎片化严重)</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">溯源能力</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">支持 (点击即看原文)</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">不支持</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p style="line-height: 1.8; margin-bottom: 24px;">
      我们可以看到，在涉及到<strong>严肃学术</strong>或<strong>精密商业</strong>领域时，NotebookLM 的表现堪称降维打击。它不仅能记住你在第 32 页提到的一个微小变量，还能在第 5 页的 PPT 总结中将其作为关键支撑点列出。
    </p>

    <h2 style="font-size: 24px; font-weight: 850; border-bottom: 2px solid #eee; padding-bottom: 12px; margin: 48px 0 24px;">四、 实战避坑：如何避免生成的 PPT 像说明书？</h2>

    <p style="line-height: 1.8; margin-bottom: 20px;">很多初学者会抱怨 NotebookLM 生成的东西“太硬”，没有美感。这里有三个进阶技巧：</p>
    
    <div style="background: #fff; border: 1px solid #eee; border-radius: 24px; padding: 24px; margin-bottom: 32px;">
      <p style="margin-bottom: 12px;"><strong>💡 技巧 1：指定分众角色</strong><br/>在 Prompt 中加入：“请以麦肯锡高级顾问的口吻重新修辞，让逻辑更具说服力。”</p>
      <p style="margin-bottom: 12px;"><strong>🎨 技巧 2：结构化视觉建议</strong><br/>要求 AI 在每一页结尾注明：“视觉建议：此处应展示 2020-2024 年的增长曲线，并高亮 2023 年的拐点。”</p>
      <p style="margin-bottom: 0;"><strong>⚡ 技巧 3：结合 Canva/Slidev</strong><br/>将生成的 Markdown 大纲一键导入 Slidev 或 Canva 的 AI 编辑器，实现“文案+排版”的无缝闭环。</p>
    </div>

    <h2 style="font-size: 24px; font-weight: 850; border-bottom: 2px solid #eee; padding-bottom: 12px; margin: 48px 0 24px;">五、 总结：效率工具的终局是“理解力”</h2>

    <p style="line-height: 1.8; margin-bottom: 24px;">
      随着 NotebookLM 这种深度内容理解工具的普及，我们可能真的要迎来 PPT 的“白银时代”。在未来，老板或导师不再看谁的 PPT 画得更漂亮，而是看谁的内容更有逻辑、数据更有支撑、见解更有洞察。
    </p>

    <p style="line-height: 1.8; margin-bottom: 24px; font-weight: 700;">
      如果你还在为了明天的答辩焦头烂额，赶紧打开 NotebookLM，把你的论文丢进去试试。相信我，那种“思维被瞬间理顺”的感觉，真的会上瘾。
    </p>

    <div class="decoration-block" style="margin-top: 60px; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 32px;">
        <p style="font-size: 14px; color: #94a3b8; font-weight: 500; margin: 0;">感谢阅读。如果觉得有用，欢迎点赞分享。</p>
        <p style="font-size: 10px; font-weight: 900; color: #cbd5e1; margin-top: 16px; letter-spacing: 2px;">POWERED BY GENIX AI LAB</p>
    </div>
  `;

  const editor = useEditor({
    extensions: [
      StarterKit, Bold, Italic, Strike, Code, BubbleMenu,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList, OrderedList, ListItem, Blockquote, HorizontalRule,
      Div, Span, Image, 
      Placeholder.configure({ placeholder: '在此处落笔您的灵感...' })
    ],
    content: longContent,
    editorProps: { attributes: { class: 'prose prose-sm prose-blue max-w-none focus:outline-none' } },
  });

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
          <button onClick={() => onPublish(editor?.getHTML() || '', title, activeBg, activeBrand)} className="px-6 py-2 bg-primary text-white text-[10px] font-black rounded-lg shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
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
            brandPresets={brandPresets} activeBrand={activeBrand} setActiveBrand={setActiveBrand}
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
    </div>
  );
};

export default EditorView;
