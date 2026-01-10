
import React, { useState } from 'react';

interface PlatformConfigProps {
  platformId: string;
  onBack: () => void;
}

const PlatformConfig: React.FC<PlatformConfigProps> = ({ platformId, onBack }) => {
  const [isTesting, setIsTesting] = useState(false);
  
  const platformData = {
    wechat: { name: '微信公众号', icon: 'chat', color: 'text-green-600' },
    medium: { name: 'Medium', icon: 'article', color: 'text-black' },
    zhihu: { name: '知乎', icon: 'school', color: 'text-blue-600' },
  }[platformId as 'wechat' | 'medium' | 'zhihu'] || { name: '未知平台', icon: 'help', color: 'text-gray-400' };

  return (
    <div className="p-5 w-full space-y-6 animate-in fade-in duration-500">
      <header className="flex items-center gap-3">
        <button onClick={onBack} className="p-1.5 hover:bg-white rounded-lg border border-transparent hover:border-studio-border shadow-sm bg-white">
          <span className="material-symbols-outlined text-studio-sub text-[20px]">arrow_back</span>
        </button>
        <div>
          <h1 className="text-lg font-black text-studio-dark tracking-tight">配置 {platformData.name}</h1>
          <p className="text-[10px] text-studio-sub">管理 API 权限与自动化发布设置</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-5">
          <section className="bg-white p-6 rounded-2xl border border-studio-border shadow-sm space-y-5">
            <div className="flex items-center gap-4 border-b border-studio-border pb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-studio-bg ${platformData.color}`}>
                <span className="material-symbols-outlined text-[24px]">{platformData.icon}</span>
              </div>
              <div>
                <h3 className="text-sm font-black">连接状态</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">正常运行</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Access Token</label>
                <div className="relative">
                  <input type="password" readOnly value="••••••••••••••••" className="w-full bg-studio-bg border-none rounded-xl px-4 py-2.5 text-xs font-mono" />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary font-black text-[10px] hover:underline">更换</button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">用户 ID</label>
                  <input type="text" defaultValue="creator_88" className="w-full bg-studio-bg border-none rounded-xl px-4 py-2.5 text-xs font-bold" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">默认分类</label>
                  <select className="w-full bg-studio-bg border-none rounded-xl px-4 py-2.5 text-xs font-bold appearance-none">
                    <option>科技资讯</option>
                    <option>个人随笔</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-2">
              <button 
                onClick={() => { setIsTesting(true); setTimeout(() => setIsTesting(false), 1000); }}
                className="flex-1 py-3 bg-studio-dark text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all"
              >
                {isTesting ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <span className="material-symbols-outlined text-[16px]">sync_alt</span>}
                测试连接
              </button>
              <button className="px-5 py-3 bg-white border border-studio-border text-red-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 transition-all">断开</button>
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-studio-border shadow-sm space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">同步选项</h3>
            <div className="space-y-3">
              {[
                { label: '自动添加平台后缀', active: true },
                { label: '同步读者评论', active: false },
                { label: '高清图片转存', active: true },
              ].map((opt, i) => (
                <div key={i} className="flex items-center justify-between py-1">
                  <span className="text-xs font-black text-studio-dark">{opt.label}</span>
                  <div className={`w-8 h-4 rounded-full relative transition-colors cursor-pointer ${opt.active ? 'bg-primary' : 'bg-gray-200'}`}>
                    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${opt.active ? 'left-[17px]' : 'left-0.5'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="bg-white p-5 rounded-2xl border border-studio-border shadow-sm">
            <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">近期同步日志</h3>
            <div className="space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-studio-border mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-[11px] font-bold text-studio-dark line-clamp-1 leading-none mb-1">AI 创作文章</p>
                    <p className="text-[9px] text-studio-sub font-black uppercase">2024.03.{20-i} · 成功</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default PlatformConfig;
