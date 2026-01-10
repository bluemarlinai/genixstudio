
import React, { useState } from 'react';
import { BackgroundPreset, BrandPreset } from '../components/editor/EditorTypes';

interface PublishProps {
  content: string;
  title: string;
  bg: BackgroundPreset | null;
  brand: BrandPreset | null;
  onBack: () => void;
  onSuccess: () => void;
}

const Publish: React.FC<PublishProps> = ({ content, title, bg, brand, onBack, onSuccess }) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [selectedTime, setSelectedTime] = useState<'now' | 'scheduled'>('now');
  const [device, setDevice] = useState<'mobile' | 'pc'>('mobile');
  const [copyStatus, setCopyStatus] = useState<'IDLE' | 'COPIED' | 'ERROR'>('IDLE');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['wechat']);

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleFinalPublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      onSuccess();
    }, 2000);
  };

  /**
   * 微信公众号超高保真处理逻辑 - 严格清理版
   */
  const processHtmlForWechat = (rawHtml: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, 'text/html');
    
    const remToPx = (styleStr: string) => {
      return styleStr.replace(/([\d.]+)rem/g, (_, p1) => `${parseFloat(p1) * 16}px`);
    };

    const styleMap: Record<string, string> = {
      'h1': 'font-size: 24px; font-weight: bold; color: #1e293b; margin: 25px 0 15px; line-height: 1.4; padding: 0;',
      'h2': 'font-size: 20px; font-weight: bold; color: #1e293b; margin: 22px 0 12px; line-height: 1.4; border-bottom: 2px solid #f1f5f9; padding: 0 0 8px 0;',
      'h3': 'font-size: 18px; font-weight: bold; color: #334155; margin: 18px 0 10px; line-height: 1.4; padding: 0;',
      'p': 'font-size: 16px; line-height: 1.75; color: #333333; margin: 16px 0; text-align: justify; padding: 0;',
      'blockquote': 'border-left: 4px solid #137fec; padding: 12px 18px; background-color: #f8fafc; color: #666666; margin: 18px 0; border-radius: 8px;',
      'strong': 'color: #1e293b; font-weight: bold !important;',
      'ul': 'list-style-type: disc; margin: 15px 0; padding-left: 25px;',
      'li': 'margin-bottom: 8px; font-size: 16px; color: #333333;'
    };

    // 1. 处理底纹背景 (BG Styles) - 修复图片拼接导致的 HTML 源码泄露
    const bgStyleObj = bg?.style || {};
    let bgStyleStr = '';
    
    if (bgStyleObj.background) bgStyleStr += `background: ${bgStyleObj.background};`;
    if (bgStyleObj.backgroundImage) {
      // 移除可能存在的双引号，统一使用单引号，防止 HTML 属性提前闭合
      const cleanImg = bgStyleObj.backgroundImage.replace(/"/g, "'");
      bgStyleStr += `background-image: ${cleanImg};`;
    }
    if (bgStyleObj.backgroundColor) bgStyleStr += `background-color: ${bgStyleObj.backgroundColor};`;
    if (bgStyleObj.backgroundSize) bgStyleStr += `background-size: ${bgStyleObj.backgroundSize};`;
    if (bg?.class === 'bg-white') bgStyleStr += 'background-color: #ffffff;';

    // 2. 处理装饰块 (Cards)
    const blocks = doc.querySelectorAll('.decoration-block');
    blocks.forEach(block => {
      const innerDivs = block.querySelectorAll('div');
      innerDivs.forEach(div => {
        let style = div.getAttribute('style') || '';
        style = remToPx(style);
        div.setAttribute('style', `box-sizing: border-box !important; display: block; ${style}`);
      });

      const innerPs = block.querySelectorAll('p');
      innerPs.forEach(p => {
        let pStyle = p.getAttribute('style') || '';
        pStyle = remToPx(pStyle);
        p.setAttribute('style', `padding: 0 !important; margin: 0; ${pStyle}`);
      });

      let blockStyle = block.getAttribute('style') || '';
      blockStyle = remToPx(blockStyle);
      const section = doc.createElement('section');
      section.innerHTML = block.innerHTML;
      section.setAttribute('style', `box-sizing: border-box !important; width: 100% !important; margin: 20px 0; border-radius: 12px; overflow: hidden; ${blockStyle}`);
      block.parentNode?.replaceChild(section, block);
    });

    // 3. 处理普通标签并应用 styleMap
    const allElements = doc.body.querySelectorAll('*');
    allElements.forEach(el => {
      const tagName = el.tagName.toLowerCase();
      const baseStyle = styleMap[tagName] || '';
      let existingStyle = el.getAttribute('style') || '';
      existingStyle = remToPx(existingStyle);
      const isProcessed = el.closest('section');
      const finalStyle = isProcessed ? existingStyle : `${baseStyle}; ${existingStyle}`;
      el.setAttribute('style', `box-sizing: border-box !important; max-width: 100% !important; ${finalStyle}`.trim());
      el.removeAttribute('class');
    });

    // 4. 构建最终 HTML - 修正外层容器，彻底解决多余代码显示问题
    return `<section style="margin: 0; padding: 0; font-family: -apple-system-font,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Arial,sans-serif; width: 100%; box-sizing: border-box; ${bgStyleStr}"><section style="margin: 0; padding: 20px 15px; width: 100%; box-sizing: border-box !important; overflow: hidden; display: block;">${doc.body.innerHTML}<section style="margin: 40px 0 20px; text-align: center; color: #bbbbbb; font-size: 11px; letter-spacing: 2px;"><p style="margin: 0; opacity: 0.5; padding: 0;">POWERED BY GENIX STUDIO</p></section></section></section>`;
  };

  const handleCopyArticle = async () => {
    try {
      const processedHtml = processHtmlForWechat(content);
      const plainText = title + '\n\n' + content.replace(/<[^>]*>/g, '');
      
      // 使用 ClipboardItem 时，确保 HTML 字符串是干净的，没有任何多余的控制字符
      const htmlBlob = new Blob([processedHtml], { type: 'text/html' });
      const textBlob = new Blob([plainText], { type: 'text/plain' });
      const data = [new ClipboardItem({ 'text/html': htmlBlob, 'text/plain': textBlob })];
      
      await navigator.clipboard.write(data);
      setCopyStatus('COPIED');
      setTimeout(() => setCopyStatus('IDLE'), 3000);
    } catch (err) {
      console.error('Copy failed:', err);
      setCopyStatus('ERROR');
      setTimeout(() => setCopyStatus('IDLE'), 3000);
    }
  };

  const platforms = [
    { id: 'wechat', name: '微信公众号', icon: 'chat', color: 'text-green-600', bg: 'bg-green-50' },
    { id: 'zhihu', name: '知乎', icon: 'school', color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'medium', name: 'Medium', icon: 'article', color: 'text-black', bg: 'bg-gray-100' }
  ];

  return (
    <div className="fixed inset-0 bg-studio-bg z-[70] flex flex-col font-sans overflow-hidden animate-in fade-in duration-500">
      <header className="h-16 px-6 bg-white border-b border-studio-border flex items-center justify-between shadow-sm shrink-0 z-20">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-studio-sub hover:text-studio-dark transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
            返回编辑
          </button>
          <div className="w-px h-6 bg-studio-border"></div>
          <h1 className="text-sm font-black text-studio-dark truncate max-w-xs uppercase tracking-widest">
            {title || '发布预览'}
          </h1>
        </div>

        <div className="flex items-center gap-1 bg-studio-bg p-1 rounded-2xl border border-studio-border">
          <button onClick={() => setDevice('mobile')} className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-black transition-all ${device === 'mobile' ? 'bg-white text-primary shadow-sm' : 'text-studio-sub hover:text-studio-dark'}`}>
            <span className="material-symbols-outlined text-[18px]">smartphone</span>
            移动端
          </button>
          <button onClick={() => setDevice('pc')} className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-black transition-all ${device === 'pc' ? 'bg-white text-primary shadow-sm' : 'text-studio-sub hover:text-studio-dark'}`}>
            <span className="material-symbols-outlined text-[18px]">laptop</span>
            桌面端
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handleFinalPublish} disabled={isPublishing} className="px-8 py-2.5 bg-primary text-white text-sm font-black rounded-xl shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest flex items-center gap-2 disabled:opacity-50">
            {isPublishing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <span className="material-symbols-outlined text-[20px]">rocket_launch</span>}
            确认分发
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-y-auto p-8 lg:p-12 flex justify-center bg-studio-bg relative">
          <div className={`transition-all duration-700 ease-in-out ${device === 'mobile' ? 'w-[375px] h-[760px] rounded-[50px] border-[12px] border-studio-dark shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] bg-white overflow-hidden sticky top-0' : 'w-full max-w-4xl h-fit min-h-[600px] rounded-3xl border border-studio-border bg-white shadow-2xl overflow-hidden'}`}>
            <div className="h-full flex flex-col relative rounded-[38px] bg-white">
              {device === 'mobile' && (
                <div className="h-10 w-full bg-white flex justify-between items-center px-8 shrink-0">
                  <span className="text-[10px] font-bold">9:41</span>
                  <div className="flex gap-1.5 items-center">
                    <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
                    <span className="material-symbols-outlined text-[14px]">wifi</span>
                    <span className="material-symbols-outlined text-[14px]">battery_full</span>
                  </div>
                </div>
              )}
              <div className={`flex-1 overflow-y-auto p-0 ${device === 'pc' ? 'max-w-3xl mx-auto' : ''}`}>
                <ArticlePreviewContent mode={device} content={content} title={title} bg={bg} />
              </div>
            </div>
          </div>
        </main>

        <aside className="w-[400px] bg-white border-l border-studio-border flex flex-col overflow-y-auto p-8 space-y-8 shadow-2xl z-30">
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">选择分发渠道</h3>
            <div className="space-y-2">
              {platforms.map(p => (
                <button key={p.id} onClick={() => togglePlatform(p.id)} className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${selectedPlatforms.includes(p.id) ? 'border-primary bg-primary/[0.03] shadow-sm' : 'border-studio-border bg-white hover:bg-studio-bg/50'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${p.bg} ${p.color}`}><span className="material-symbols-outlined text-[20px]">{p.icon}</span></div>
                    <div className="text-left"><p className="text-xs font-black text-studio-dark">{p.name}</p><p className="text-[9px] text-studio-sub font-bold uppercase tracking-tighter">已连接 · 样式自适应</p></div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedPlatforms.includes(p.id) ? 'bg-primary border-primary' : 'border-studio-border'}`}>{selectedPlatforms.includes(p.id) && <span className="material-symbols-outlined text-white text-[14px] font-bold">check</span>}</div>
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">发布排程设置</h3>
            <div className="flex bg-studio-bg p-1 rounded-2xl border border-studio-border">
              <button onClick={() => setSelectedTime('now')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black transition-all ${selectedTime === 'now' ? 'bg-white text-primary shadow-sm' : 'text-studio-sub'}`}><span className="material-symbols-outlined text-[18px]">bolt</span>立即分发</button>
              <button onClick={() => setSelectedTime('scheduled')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black transition-all ${selectedTime === 'scheduled' ? 'bg-white text-primary shadow-sm' : 'text-studio-sub'}`}><span className="material-symbols-outlined text-[18px]">calendar_month</span>定时发布</button>
            </div>
          </section>

          <div className="w-full h-px bg-studio-border"></div>

          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">手动拷贝样式</h3>
            <button 
              onClick={handleCopyArticle}
              className={`w-full p-6 rounded-3xl border transition-all flex flex-col gap-2 group relative overflow-hidden ${copyStatus === 'COPIED' ? 'border-green-500 bg-green-50 ring-4 ring-green-100' : 'border-primary/20 bg-primary/[0.02] hover:bg-primary/[0.05] ring-4 ring-primary/5'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${copyStatus === 'COPIED' ? 'bg-green-500 text-white' : 'bg-primary text-white shadow-lg shadow-primary/20'}`}><span className="material-symbols-outlined text-[20px]">{copyStatus === 'COPIED' ? 'check_circle' : 'content_paste_go'}</span></div>
                <div className="text-left"><span className={`text-xs font-black block ${copyStatus === 'COPIED' ? 'text-green-700' : 'text-primary'}`}>{copyStatus === 'COPIED' ? '已复制高保真样式' : '拷贝微信富文本'}</span><p className="text-[9px] text-studio-sub font-bold uppercase tracking-tighter">深度还原底纹 · 边框修复</p></div>
              </div>
            </button>
          </section>

          <div className="pt-8 mt-auto">
            <button onClick={handleFinalPublish} disabled={isPublishing || selectedPlatforms.length === 0} className="w-full py-5 bg-studio-dark text-white rounded-[28px] font-black shadow-2xl hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center gap-3 group">
              {isPublishing ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div><span className="uppercase tracking-widest">正在分发任务...</span></> : <><span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span><span className="uppercase tracking-widest text-sm">一键发布到 {selectedPlatforms.length} 渠道</span></>}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

const ArticlePreviewContent: React.FC<{ mode: 'mobile' | 'pc', content: string, title: string, bg: BackgroundPreset | null }> = ({ mode, content, title, bg }) => {
  const isMobile = mode === 'mobile';
  return (
    <div 
      className={`animate-in fade-in duration-500 min-h-full ${isMobile ? 'pb-20' : ''} ${bg?.class || ''}`}
      style={{
        ...bg?.style,
        backgroundRepeat: 'repeat',
        backgroundSize: bg?.style?.backgroundImage && !bg?.style?.backgroundSize ? 'cover' : bg?.style?.backgroundSize || 'auto',
      }}
    >
      <div className={`${isMobile ? 'px-5 pt-6 pb-0' : 'p-12 pb-0'}`}>
        <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded-md">高保真渲染预览</span>
        <h1 className={`${isMobile ? 'text-2xl' : 'text-5xl'} font-black text-studio-dark mt-4 leading-tight tracking-tight`}>{title || '未命名文章'}</h1>
      </div>
      <div 
        className={`prose ${isMobile ? 'prose-sm px-5' : 'prose-lg px-12'} prose-blue max-w-none rendered-content py-6`} 
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    </div>
  );
};

export default Publish;
