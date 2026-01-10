
import React from 'react';

interface SettingsProps {
  onConfigPlatform: (platformId: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ onConfigPlatform }) => {
  return (
    <div className="p-5 w-full space-y-5 pb-20 animate-in fade-in duration-500">
      <header>
        <h1 className="text-xl font-black tracking-tight text-studio-dark">个人与系统设置</h1>
        <p className="text-[11px] text-studio-sub mt-0.5 font-medium">管理账户安全、个人品牌、团队协作及 AI 云端接口配置。</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* PROFILE SECTION */}
          <section className="space-y-4">
            <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-widest border-b border-studio-border pb-2 flex items-center justify-between">
              个人资料
              <span className="material-symbols-outlined text-[14px]">account_circle</span>
            </h3>
            <div className="flex items-center gap-6 bg-white p-6 rounded-[28px] border border-studio-border shadow-sm">
              <div className="relative group shrink-0">
                <div className="w-16 h-16 rounded-[24px] bg-gray-100 bg-cover bg-center border-2 border-white shadow-lg" style={{backgroundImage: 'url("https://picsum.photos/seed/user/200/200")'}}></div>
                <button className="absolute inset-0 bg-black/40 rounded-[24px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]">
                  <span className="material-symbols-outlined text-white text-[20px]">photo_camera</span>
                </button>
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black text-studio-sub uppercase tracking-wider">显示名称</label>
                  <input className="w-full bg-studio-bg border-none rounded-lg px-3 py-2 text-xs font-bold focus:ring-2 ring-primary/10 transition-all" defaultValue="Alex Chen" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black text-studio-sub uppercase tracking-wider">个人简介</label>
                  <input className="w-full bg-studio-bg border-none rounded-lg px-3 py-2 text-xs font-bold focus:ring-2 ring-primary/10 transition-all" defaultValue="Digital Storyteller & Tech Creator" />
                </div>
              </div>
            </div>
          </section>

          {/* AI CONFIG */}
          <section className="space-y-4">
            <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-widest border-b border-studio-border pb-2 flex items-center justify-between">
              AI 模型引擎 (Gemini)
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            </h3>
            <div className="bg-white rounded-[28px] border border-studio-border p-6 space-y-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
                    <span className="material-symbols-outlined text-[20px]">key</span>
                  </div>
                  <div>
                    <p className="text-xs font-black text-studio-dark">API 密钥管理</p>
                    <p className="text-[9px] text-studio-sub font-bold uppercase tracking-tighter">Gemini Pro Multi-modal Engine</p>
                  </div>
                </div>
                <button 
                  onClick={async () => window.aistudio?.openSelectKey?.()} 
                  className="px-5 py-2 bg-primary text-white text-[9px] font-black rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-95 uppercase tracking-widest"
                >
                  更换密钥
                </button>
              </div>
              <div className="p-4 bg-primary/[0.02] rounded-xl border border-primary/5 flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">info</span>
                <p className="text-[10px] leading-relaxed text-studio-sub font-medium">
                  生成高质量 4K 图像及 Veo 视频需要连接 Google Cloud 付费项目。查看 <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="font-bold underline text-primary">账单指南</a>。
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* SIDEBAR CONFIGS */}
        <section className="space-y-4">
          <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-widest border-b border-studio-border pb-2 flex items-center justify-between">
            关联分发平台
            <span className="material-symbols-outlined text-[14px]">hub</span>
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: 'wechat', name: '微信公众号', icon: 'chat', status: '已连接', color: 'text-green-600', bg: 'bg-green-50' },
              { id: 'zhihu', name: '知乎', icon: 'school', status: '未连接', color: 'text-blue-600', bg: 'bg-blue-50' },
              { id: 'medium', name: 'Medium', icon: 'article', status: '已连接', color: 'text-black', bg: 'bg-gray-100' }
            ].map((platform, i) => (
              <div 
                key={i} 
                onClick={() => platform.status !== '未连接' && onConfigPlatform(platform.id)} 
                className={`flex items-center justify-between p-4 bg-white rounded-[24px] border border-studio-border hover:shadow-lg hover:border-primary/20 transition-all group ${platform.status !== '未连接' ? 'cursor-pointer' : 'opacity-50 grayscale cursor-not-allowed'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg ${platform.bg} ${platform.color} flex items-center justify-center shadow-sm`}>
                    <span className={`material-symbols-outlined text-[18px]`}>{platform.icon}</span>
                  </div>
                  <span className="text-[11px] font-black text-studio-dark">{platform.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[8px] font-black uppercase tracking-widest ${platform.status === '未连接' ? 'text-gray-400' : 'text-primary'}`}>{platform.status}</span>
                  {platform.status !== '未连接' && <span className="material-symbols-outlined text-gray-300 text-[14px] group-hover:text-primary transition-colors">arrow_forward_ios</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
