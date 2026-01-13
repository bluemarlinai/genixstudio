
import React, { useState, useEffect, useRef } from 'react';
import { BackgroundPreset, BrandPreset } from '../components/editor/EditorTypes';
import { processHtmlForWechat, processHtmlForToutiao } from '../utils/PlatformRenderers';

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
  const [device, setDevice] = useState<'mobile' | 'pc'>('mobile');
  const [copyStatus, setCopyStatus] = useState<'IDLE' | 'WECHAT_COPIED' | 'TOUTIAO_COPIED' | 'ERROR'>('IDLE');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['wechat']);
  
  // 模拟器缩放逻辑
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (device === 'mobile' && containerRef.current) {
        const availableHeight = containerRef.current.offsetHeight;
        const availableWidth = containerRef.current.offsetWidth;
        const simulatorHeight = 820; // 模拟器原始设计高度
        const simulatorWidth = 400;  // 模拟器原始设计宽度
        
        // 计算高度和宽度的缩放比，取最小值，并预留边距
        const scaleH = (availableHeight - 60) / simulatorHeight;
        const scaleW = (availableWidth - 40) / simulatorWidth;
        const newScale = Math.min(scaleH, scaleW, 1); // 最大不超过1
        
        setScale(newScale);
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [device]);

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

  const handleCopy = async (platform: 'WECHAT' | 'TOUTIAO') => {
    try {
      // 使用提取出的公共逻辑进行渲染
      const processedHtml = platform === 'WECHAT' 
        ? processHtmlForWechat(content, bg) 
        : processHtmlForToutiao(content);
        
      const htmlBlob = new Blob([processedHtml], { type: 'text/html' });
      const textBlob = new Blob([title + '\n\n' + content.replace(/<[^>]*>/g, '')], { type: 'text/plain' });
      const data = [new ClipboardItem({ 'text/html': htmlBlob, 'text/plain': textBlob })];
      await navigator.clipboard.write(data);
      setCopyStatus(platform === 'WECHAT' ? 'WECHAT_COPIED' : 'TOUTIAO_COPIED');
      setTimeout(() => setCopyStatus('IDLE'), 3000);
    } catch (err) {
      console.error(err);
      setCopyStatus('ERROR');
    }
  };

  const platforms = [
    { id: 'wechat', name: '微信公众号', icon: 'chat', color: 'text-green-600', bg: 'bg-green-50' },
    { id: 'toutiao', name: '今日头条', icon: 'newspaper', color: 'text-red-600', bg: 'bg-red-50' },
    { id: 'zhihu', name: '知乎', icon: 'school', color: 'text-blue-600', bg: 'bg-blue-50' }
  ];

  return (
    <div className="fixed inset-0 bg-studio-bg z-[70] flex flex-col font-sans overflow-hidden animate-in fade-in duration-500">
      <header className="h-16 px-6 bg-white border-b border-studio-border flex items-center justify-between shadow-sm shrink-0 z-20">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-studio-sub hover:text-studio-dark transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
            返回编辑
          </button>
          <h1 className="text-sm font-black text-studio-dark truncate max-w-xs uppercase tracking-widest">{title || '发布预览'}</h1>
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

        <button onClick={handleFinalPublish} disabled={isPublishing} className="px-8 py-2.5 bg-primary text-white text-sm font-black rounded-xl shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest flex items-center gap-2">
          {isPublishing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <span className="material-symbols-outlined text-[20px]">rocket_launch</span>}
          确认分发
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <main ref={containerRef} className="flex-1 overflow-hidden p-6 flex items-center justify-center bg-studio-bg relative">
          <div 
            className={`transition-all duration-500 ease-in-out origin-center ${device === 'mobile' ? 'w-[375px] h-[760px] rounded-[50px] border-[12px] border-studio-dark shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] bg-white overflow-hidden' : 'w-full max-w-4xl h-full rounded-3xl border border-studio-border bg-white shadow-2xl overflow-hidden'}`}
            style={{ 
              transform: device === 'mobile' ? `scale(${scale})` : 'none',
            }}
          >
            <div className="h-full flex flex-col relative bg-white">
              <div className="flex-1 overflow-y-auto scrollbar-hide">
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
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">手动拷贝样式</h3>
            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => handleCopy('WECHAT')}
                className={`w-full p-4 rounded-2xl border transition-all flex flex-col gap-1 group relative overflow-hidden ${copyStatus === 'WECHAT_COPIED' ? 'border-green-500 bg-green-50 shadow-sm' : 'border-studio-border hover:border-primary/40 hover:bg-primary/[0.02]'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${copyStatus === 'WECHAT_COPIED' ? 'bg-green-500 text-white' : 'bg-studio-bg text-studio-sub group-hover:text-primary'}`}><span className="material-symbols-outlined text-[18px]">{copyStatus === 'WECHAT_COPIED' ? 'check_circle' : 'chat'}</span></div>
                  <div className="text-left">
                    <span className={`text-xs font-black block ${copyStatus === 'WECHAT_COPIED' ? 'text-green-700' : 'text-studio-dark group-hover:text-primary'}`}>拷贝微信富文本</span>
                    <p className="text-[8px] text-studio-sub font-bold uppercase tracking-tighter">卡片/背景/边框 100% 还原</p>
                  </div>
                </div>
              </button>

              <button 
                onClick={() => handleCopy('TOUTIAO')}
                className={`w-full p-4 rounded-2xl border transition-all flex flex-col gap-1 group relative overflow-hidden ${copyStatus === 'TOUTIAO_COPIED' ? 'border-red-500 bg-red-50 shadow-sm' : 'border-studio-border hover:border-red-400/40 hover:bg-red-50/30'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${copyStatus === 'TOUTIAO_COPIED' ? 'bg-red-500 text-white' : 'bg-studio-bg text-studio-sub group-hover:text-red-500'}`}><span className="material-symbols-outlined text-[18px]">{copyStatus === 'TOUTIAO_COPIED' ? 'check_circle' : 'newspaper'}</span></div>
                  <div className="text-left">
                    <span className={`text-xs font-black block ${copyStatus === 'TOUTIAO_COPIED' ? 'text-red-700' : 'text-studio-dark group-hover:text-red-500'}`}>拷贝今日头条样式</span>
                    <p className="text-[8px] text-studio-sub font-bold uppercase tracking-tighter">扁平化处理 · 兼容性适配</p>
                  </div>
                </div>
              </button>
            </div>
          </section>

          <div className="pt-8 mt-auto">
            <button onClick={handleFinalPublish} disabled={isPublishing || selectedPlatforms.length === 0} className="w-full py-5 bg-studio-dark text-white rounded-[28px] font-black shadow-2xl hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center gap-3 group">
              {isPublishing ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div><span className="uppercase tracking-widest">任务分发中...</span></> : <><span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span><span className="uppercase tracking-widest text-sm">一键发布到 {selectedPlatforms.length} 渠道</span></>}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

const ArticlePreviewContent: React.FC<{ mode: 'mobile' | 'pc', content: string, title: string, bg: BackgroundPreset | null }> = ({ mode, content, title, bg }) => {
  const isMobile = mode === 'mobile';
  
  // 使用新的渲染逻辑生成预览 HTML，确保所见即所得
  const previewHtml = processHtmlForWechat(content, bg);

  return (
    <div className={`min-h-full ${isMobile ? 'pb-20' : ''}`}>
      <div className={`${isMobile ? 'px-5 pt-6' : 'p-12'}`}>
        <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded-md">渲染预览 (WeChat)</span>
        <h1 className={`${isMobile ? 'text-2xl' : 'text-5xl'} font-black text-studio-dark mt-4 leading-tight`}>{title || '未命名文章'}</h1>
      </div>
      {/* 直接渲染处理后的 HTML，不使用 prose，因为样式已经内联 */}
      <div 
        dangerouslySetInnerHTML={{ __html: previewHtml }} 
      />
    </div>
  );
};

export default Publish;
