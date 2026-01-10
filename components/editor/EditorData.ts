
import { BackgroundPreset, DecorationPreset, BrandPreset, SnippetPreset } from './EditorTypes';

// 新增底纹分类接口（用于 LeftSidebar 渲染逻辑参考）
export interface BackgroundCategory {
  title: string;
  items: BackgroundPreset[];
}

export const bgPresets: BackgroundPreset[] = [
  // --- 1. 极简网格系列 (Minimalist & Grids) ---
  { id: 'w-1', name: '纯净白', class: 'bg-white', thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=60&w=300&h=200' },
  { id: 'w-grid-1', name: '数学点阵', style: { background: '#ffffff', backgroundImage: 'radial-gradient(#137fec15 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }, thumbnail: 'https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?auto=format&fit=crop&q=60&w=300&h=200' },
  { id: 'w-grid-2', name: '工程坐标', style: { backgroundColor: '#f8fafc', backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '20px 20px' }, thumbnail: 'https://images.unsplash.com/photo-1518655061710-5ccf392c275a?auto=format&fit=crop&q=60&w=300&h=200' },
  { id: 'w-grid-3', name: '毫米方格', style: { background: '#ffffff', backgroundImage: 'linear-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(90deg, #f1f5f9 1px, transparent 1px)', backgroundSize: '8px 8px' }, thumbnail: 'https://www.transparenttextures.com/patterns/grid-me.png' },

  // --- 2. 纸张与有机纹理 (Paper & Organic) ---
  { id: 'w-paper-1', name: '重磅纤维纸', style: { backgroundColor: '#fcfaf2', backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")' }, thumbnail: 'https://images.unsplash.com/photo-1586075010633-247fe1bd6e88?auto=format&fit=crop&q=60&w=300&h=200' },
  { id: 'w-linen-1', name: '轻克重亚麻', style: { backgroundColor: '#f9f9f9', backgroundImage: 'url("https://www.transparenttextures.com/patterns/linen.png")' }, thumbnail: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=60&w=300&h=200' },
  { id: 'w-noise-1', name: '胶片银盐', style: { backgroundColor: '#f5f5f5', backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }, thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=60&w=300&h=200' },
  { id: 'w-texture-1', name: '混凝土灰', style: { backgroundColor: '#efefef', backgroundImage: 'url("https://www.transparenttextures.com/patterns/concrete-wall.png")' }, thumbnail: 'https://www.transparenttextures.com/patterns/concrete-wall.png' },

  // --- 3. 柔和艺术渐变 (Atmospheric Gradients) ---
  { id: 'w-gradient-1', name: '晨曦', style: { backgroundImage: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)' }, thumbnail: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=60&w=300&h=200' },
  { id: 'w-gradient-2', name: '北欧冷杉', style: { backgroundImage: 'linear-gradient(to top, #f3f4f6 0%, #e2e8f0 100%)' }, thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=60&w=300&h=200' },
  { id: 'w-gradient-3', name: '薄荷苏打', style: { backgroundImage: 'linear-gradient(120deg, #e0f2f1 0%, #ffffff 100%)' }, thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=60&w=300&h=200' },
  { id: 'w-gradient-4', name: '暮色蔷薇', style: { backgroundImage: 'linear-gradient(120deg, #fdf2f2 0%, #fefce8 100%)' }, thumbnail: 'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?auto=format&fit=crop&q=60&w=300&h=200' },

  // --- 4. 暗黑极客系列 (Dark Mode) ---
  { id: 'w-dark-1', name: '钛金黑', style: { background: '#111827', color: '#f9fafb' }, thumbnail: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=60&w=300&h=200' },
  { id: 'w-dark-2', name: '碳纤维方格', style: { background: '#0f172a', backgroundImage: 'linear-gradient(rgba(30, 41, 59, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 41, 59, 0.5) 1px, transparent 1px)', backgroundSize: '30px 30px', color: '#e2e8f0' }, thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=60&w=300&h=200' },
  { id: 'w-dark-3', name: '午夜点阵', style: { background: '#020617', backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px', color: '#f8fafc' }, thumbnail: 'https://www.transparenttextures.com/patterns/dark-matter.png' },

  // --- 5. 专业出版系列 (Professional Publishing) ---
  { id: 'w-modern-1', name: '财经周刊', style: { background: '#f0f7ff', borderLeft: '12px solid #137fec' }, thumbnail: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=60&w=300&h=200' },
  { id: 'w-border-1', name: '画廊框镜', style: { background: '#fff', border: '24px solid #f1f5f9' }, thumbnail: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=60&w=300&h=200' },
  { id: 'w-accent-1', name: '路透红标', style: { background: '#ffffff', borderLeft: '6px solid #ef4444' }, thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=60&w=300&h=200' },
  { id: 'w-accent-2', name: '学术索引', style: { background: '#ffffff', borderTop: '4px solid #111', borderBottom: '1px solid #eee' }, thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=60&w=300&h=200' }
];

export const decorationPresets: DecorationPreset[] = [
  {
    id: 'dec-title-1',
    name: '新锐双行标题',
    template: `<div class="decoration-block" style="margin: 40px 0; border-left: 10px solid #137fec; padding-left: 20px;"><p style="font-size: 14px; color: #137fec; font-weight: 900; letter-spacing: 2px; margin: 0 0 4px; text-transform: uppercase;">Feature Chapter</p><h2 style="font-size: 28px; font-weight: 900; color: #1a1a1a; margin: 0; line-height: 1.2;">在此处输入章节核心标题</h2></div>`,
    icon: 'text_fields'
  },
  {
    id: 'dec-quote-1',
    name: '大师金句',
    template: `<div class="decoration-block" style="margin: 40px 0; padding: 40px 32px; border-radius: 32px; background: #111; color: white; text-align: center; position: relative; overflow: hidden;"><div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(45deg, rgba(19,127,236,0.2) 0%, transparent 100%);"></div><p style="font-size: 22px; font-weight: 800; margin: 0; position: relative; z-index: 10; line-height: 1.5; font-style: italic;">“在此输入您的灵魂语录，用深刻的洞察击中人心。”</p></div>`,
    icon: 'format_quote'
  },
  {
    id: 'dec-data-1',
    name: '专业数据对比',
    template: `<div class="decoration-block" style="margin: 40px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 24px;"><div style="background: #ffffff; padding: 28px; border-radius: 24px; border: 1px solid #f0f2f4; text-align: center;"><h5 style="margin: 0 0 10px; font-size: 12px; color: #94a3b8; font-weight: 800; letter-spacing: 1px;">传统方案</h5><p style="margin: 0; font-size: 32px; font-weight: 900; color: #cbd5e1;">4.5 Hours</p></div><div style="background: #ffffff; padding: 28px; border-radius: 24px; border: 2px solid #137fec; text-align: center; box-shadow: 0 15px 30px rgba(19,127,236,0.1);"><h5 style="margin: 0 0 10px; font-size: 12px; color: #137fec; font-weight: 800; letter-spacing: 1px;">AI 赋能</h5><p style="margin: 0; font-size: 32px; font-weight: 900; color: #137fec;">20 Mins 🚀</p></div></div>`,
    icon: 'leaderboard'
  },
  {
    id: 'dec-hr-1',
    name: '渐变动态分隔',
    template: `<div class="decoration-block" style="margin: 60px auto; width: 80px; height: 4px; border-radius: 2px; background: linear-gradient(90deg, transparent, #137fec, transparent);"></div>`,
    icon: 'horizontal_rule'
  },
  {
    id: 'dec-card-1',
    name: '图标指引卡片',
    template: `<div class="decoration-block" style="display: flex; gap: 24px; margin: 40px 0; padding: 32px; background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%); border-radius: 24px; border: 1px solid rgba(19, 127, 236, 0.1); align-items: center;"><div style="width: 48px; height: 48px; background: #137fec; color: white; border-radius: 16px; display: flex; items-center: center; justify-content: center; flex-shrink: 0;"><span class="material-symbols-outlined" style="font-size: 28px; line-height: 48px;">lightbulb</span></div><div style="flex: 1;"><h4 style="margin: 0; font-weight: 800; font-size: 18px; color: #1a1a1a;">深度见解</h4><p style="margin: 8px 0 0; color: #64748b; font-size: 15px; line-height: 1.6;">输入您的核心观点描述，通过视觉强调引导阅读。</p></div></div>`,
    icon: 'auto_awesome'
  },
  {
    id: 'dec-step-1',
    name: '步骤逻辑引导',
    template: `<div class="decoration-block" style="margin: 40px 0; display: flex; flex-direction: column; gap: 12px;"><div style="display: flex; align-items: center; gap: 16px;"><div style="width: 28px; height: 28px; background: #137fec; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 900;">1</div><p style="margin: 0; font-weight: 800; color: #334155; font-size: 16px;">第一阶段：需求分析与洞察</p></div><div style="margin-left: 13px; height: 30px; border-left: 2px dashed #cbd5e1;"></div><div style="display: flex; align-items: center; gap: 16px;"><div style="width: 28px; height: 28px; background: #cbd5e1; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 900;">2</div><p style="margin: 0; font-weight: 800; color: #94a3b8; font-size: 16px;">第二阶段：原型构建与测试</p></div></div>`,
    icon: 'reorder'
  },
  {
    id: 'dec-qa-1',
    name: 'FAQ 问答对',
    template: `<div class="decoration-block" style="margin: 30px 0; padding: 24px; background: #fdfdfd; border: 1px solid #f0f2f4; border-radius: 20px;"><div style="display: flex; gap: 12px; margin-bottom: 12px;"><span style="color: #137fec; font-weight: 900; font-size: 18px;">Q:</span><p style="margin: 0; font-weight: 800; color: #1e293b; font-size: 16px;">在这里输入读者最关心的问题？</p></div><div style="display: flex; gap: 12px; border-top: 1px solid #f8fafc; padding-top: 12px;"><span style="color: #10b981; font-weight: 900; font-size: 18px;">A:</span><p style="margin: 0; color: #64748b; font-size: 15px; line-height: 1.7;">在这里提供您最专业、详尽的回答逻辑。</p></div></div>`,
    icon: 'contact_support'
  },
  {
    id: 'dec-follow-1',
    name: '社交关注引导',
    template: `<div class="decoration-block" style="margin: 40px 0; border: 2px solid #137fec; border-radius: 24px; padding: 20px; display: flex; justify-content: space-between; align-items: center;"><div style="display: flex; align-items: center; gap: 12px;"><div style="width: 40px; height: 40px; background: #e7f2fd; border-radius: 12px; display: flex; align-items: center; justify-content: center;"><span class="material-symbols-outlined" style="color: #137fec; font-size: 24px;">rss_feed</span></div><div><p style="margin: 0; font-size: 14px; font-weight: 900; color: #1a1a1a;">持续获取深度见解</p><p style="margin: 0; font-size: 11px; color: #617589; font-weight: 700;">每周更新 AI 与 product 深度干货</p></div></div><button style="background: #137fec; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 900; cursor: pointer;">+ 立即关注</button></div>`,
    icon: 'add_reaction'
  }
];

export const brandPresets: BrandPreset[] = [
  { id: 'b-0', name: '无品牌', component: '', icon: 'block' },
  { 
    id: 'b-1', 
    name: 'Genix 官方', 
    component: `<div style="padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(19,127,236,0.1);"><div style="display: flex; align-items: center; gap: 8px;"><div style="width: 24px; height: 24px; background: #137fec; border-radius: 6px;"></div><span style="font-weight: 900; font-size: 14px; color: #137fec; letter-spacing: 1px;">GENIX STUDIO</span></div><span style="font-size: 10px; font-weight: 700; color: #cbd5e1; letter-spacing: 2px;">DIGITAL INSIGHTS</span></div>`, 
    icon: 'verified'
  },
  { 
    id: 'b-2', 
    name: '媒体矩阵', 
    component: `<div style="padding: 24px 40px; display: flex; flex-direction: column; gap: 4px;"><span style="font-size: 10px; font-weight: 900; color: #137fec; letter-spacing: 4px;">PRODUCT REVIEW</span><div style="height: 2px; width: 40px; background: #137fec;"></div></div>`, 
    icon: 'newsmode'
  }
];

export const snippetPresets: SnippetPreset[] = [
  { 
    id: 's-h-1', 
    name: '专业测评眉标', 
    type: 'HEADER', 
    content: `<section style="margin-bottom: 40px; padding: 24px; border-left: 8px solid #137fec; background: rgba(19,127,236,0.03); border-radius: 4px 24px 24px 4px;"><p style="margin: 0; font-size: 12px; color: #137fec; font-weight: 900; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 8px;">Exclusive Report / 独家深度</p><h1 style="font-size: 32px; font-weight: 900; line-height: 1.2; color: #111; margin: 0;">主标题占位：<br/>输入您的震撼结论</h1></section>`, 
    icon: 'view_headline'
  },
  { 
    id: 's-f-1', 
    name: '全渠道二维码', 
    type: 'FOOTER', 
    content: `<section style="margin-top: 80px; padding: 60px 40px; background: #fdfdfd; border: 1px solid #f0f2f4; border-radius: 40px; text-align: center;"><div style="width: 140px; height: 140px; background: #fff; margin: 0 auto 24px; padding: 12px; border: 1px solid #f0f2f4; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.05);"><img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=GenixStudio" style="width: 100%; height: 100%; object-fit: contain;" /></div><p style="margin: 0; font-size: 18px; font-weight: 900; color: #1a1a1a;">欢迎扫码交流</p><p style="margin: 8px 0 0; font-size: 14px; color: #64748b; font-weight: 500;">后台回复 <span style="color: #137fec; font-weight: 800;">“手册”</span> 获取本期干货</p><div style="margin-top: 40px; height: 1px; background: linear-gradient(to right, transparent, #eee, transparent);"></div><p style="margin: 32px 0 0; font-size: 10px; color: #cbd5e1; font-weight: 900; letter-spacing: 5px; text-transform: uppercase;">© 2024 GENIX STUDIO · ALL RIGHTS RESERVED</p></section>`, 
    icon: 'qr_code_2'
  }
];
