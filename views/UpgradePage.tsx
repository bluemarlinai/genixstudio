
import React from 'react';

interface UpgradePageProps {
  onBack: () => void;
  onUpgrade: () => void;
}

const UpgradePage: React.FC<UpgradePageProps> = ({ onBack, onUpgrade }) => {
  const features = [
    { title: '全能 AI 辅助', desc: '取消 Gemini 3 Pro 调用限制。', icon: 'auto_awesome' },
    { title: 'VIP 素材库', desc: '解锁所有高级底纹与组件。', icon: 'palette' },
    { title: '多模态 Veo', desc: '每月 50 次高清视频生成。', icon: 'movie_filter' },
    { title: '极速同步', desc: '优先分发与 HTML 导出。', icon: 'rocket_launch' },
    { title: '品牌定制', desc: '支持自定义 Logo 库。', icon: 'verified_user' },
    { title: '优先支持', desc: '24/7 专家技术解答。', icon: 'support_agent' },
  ];

  return (
    <div className="p-5 max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <header className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-2">
          <span className="material-symbols-outlined text-[14px] text-primary fill-icon">stars</span>
          <span className="text-[9px] font-black text-primary tracking-widest uppercase">Professional Plan</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-studio-dark">开启您的专业创作之路</h1>
        <p className="text-[11px] text-studio-sub max-w-lg mx-auto leading-relaxed">
          不再受限于免费额度。Pro 方案旨在为高产出创作者提供极致的生产力工具链。
        </p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-studio-border hover:border-primary/20 hover:shadow-lg transition-all group">
            <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[20px]">{f.icon}</span>
            </div>
            <h3 className="text-sm font-bold mb-1">{f.title}</h3>
            <p className="text-[10px] text-studio-sub leading-relaxed font-medium">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
         <div className="space-y-4 relative z-10 text-center md:text-left">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400 mb-1">年度特惠中</p>
              <h2 className="text-2xl font-black">只需 ¥99 / 月</h2>
              <p className="text-slate-400 text-[10px] font-bold">按年订阅立省 16%</p>
            </div>
            <ul className="space-y-2">
              {['无限文章库', '全功能 AI 解锁', '跨端实时云同步'].map((item, i) => (
                <li key={i} className="flex items-center justify-center md:justify-start gap-2 text-[11px] font-bold">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px]">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
         </div>

         <div className="flex flex-col gap-3 w-full max-w-[240px] relative z-10">
            <button onClick={onUpgrade} className="w-full py-3.5 bg-primary text-white text-sm font-black rounded-2xl shadow-xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
              立即升级
            </button>
            <p className="text-[8px] text-center text-slate-500 font-bold uppercase tracking-widest">支持 微信 / 支付宝支付</p>
         </div>
      </div>

      <div className="text-center pt-2">
        <button onClick={onBack} className="text-[10px] font-black text-studio-sub hover:text-studio-dark uppercase tracking-widest">
          暂不升级，继续试用
        </button>
      </div>
    </div>
  );
};

export default UpgradePage;
