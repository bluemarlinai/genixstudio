
import React, { useState } from 'react';

interface PlanConfig {
  id: string;
  name: string;
  price: string;
  cycle: '月' | '年';
  activeUsers: string;
  features: {
    label: string;
    enabled: boolean;
    limit?: string;
  }[];
  tag?: string;
}

const PlanManager: React.FC = () => {
  const [plans, setPlans] = useState<PlanConfig[]>([
    {
      id: 'free',
      name: '标准免费版',
      price: '0',
      cycle: '月',
      activeUsers: '12,405',
      features: [
        { label: '基础富文本编辑器', enabled: true },
        { label: 'Gemini 3 Flash 辅助', enabled: true, limit: '500次/月' },
        { label: '高清 PDF 导出', enabled: false },
        { label: 'Veo 视频生成', enabled: false },
        { label: '全平台自动同步', enabled: false },
      ]
    },
    {
      id: 'pro',
      name: '创作者专业版',
      price: '99',
      cycle: '月',
      activeUsers: '1,120',
      tag: '最受欢迎',
      features: [
        { label: '专业级排版引擎', enabled: true },
        { label: 'Gemini 3 Pro 无限制调用', enabled: true },
        { label: '高清 PDF & HTML 导出', enabled: true },
        { label: 'Veo 视频生成', enabled: true, limit: '50次/月' },
        { label: '全平台自动同步', enabled: true },
      ]
    },
    {
      id: 'enterprise',
      name: '企业内部账号',
      price: '定制',
      cycle: '年',
      activeUsers: '12',
      tag: '内部专用',
      features: [
        { label: '私有化部署支持', enabled: true },
        { label: '无限 Gemini Tokens', enabled: true },
        { label: 'Veo 4K 视频引擎', enabled: true },
        { label: '多级团队审核流', enabled: true },
        { label: '24/7 专属架构师支持', enabled: true },
      ]
    }
  ]);

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('方案配置已同步到生产环境！');
    }, 1500);
  };

  return (
    <div className="p-8 w-full space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">方案与权益管理</h1>
          <p className="text-studio-sub mt-2">定义不同会员等级的定价、功能边界以及 AI 算力配额。</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white border border-studio-border text-studio-dark rounded-2xl text-sm font-black shadow-sm hover:bg-gray-50 transition-all">
            重置默认值
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-xl hover:bg-black transition-all disabled:opacity-50"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <span className="material-symbols-outlined">save</span>
            )}
            发布配置更新
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-[48px] border border-studio-border shadow-sm overflow-hidden flex flex-col relative group">
            {plan.tag && (
              <div className="absolute top-8 right-8 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/10">
                {plan.tag}
              </div>
            )}
            
            <div className="p-10 space-y-6">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">方案名称</p>
                <input 
                  defaultValue={plan.name}
                  className="w-full text-xl font-black text-slate-900 border-none bg-transparent p-0 focus:ring-0"
                />
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-xs font-bold text-slate-400">¥</span>
                <input 
                  defaultValue={plan.price}
                  className="w-24 text-4xl font-black text-slate-900 border-none bg-transparent p-0 focus:ring-0"
                />
                <span className="text-sm font-bold text-slate-400">/ {plan.cycle}</span>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">活跃用户</span>
                  <span className="text-sm font-black text-slate-900">{plan.activeUsers}</span>
                </div>
                <div className="w-px h-6 bg-slate-200"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">续费率</span>
                  <span className="text-sm font-black text-emerald-600">92%</span>
                </div>
              </div>
            </div>

            <div className="flex-1 px-10 pb-10 space-y-6">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">权益配置 (Feature Matrix)</h4>
              <div className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center justify-between group/item">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${feature.enabled ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-100 text-slate-300'}`}>
                        <span className="material-symbols-outlined text-[16px]">{feature.enabled ? 'check_circle' : 'cancel'}</span>
                      </div>
                      <span className={`text-xs font-bold ${feature.enabled ? 'text-slate-700' : 'text-slate-400 line-through opacity-50'}`}>
                        {feature.label}
                      </span>
                    </div>
                    {feature.limit ? (
                      <span className="text-[10px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded-lg">
                        {feature.limit}
                      </span>
                    ) : (
                      <div className={`w-8 h-4 rounded-full relative transition-colors cursor-pointer ${feature.enabled ? 'bg-emerald-400' : 'bg-slate-200'}`}>
                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${feature.enabled ? 'left-[17px]' : 'left-0.5'}`}></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-slate-50 border-t border-studio-border">
              <button className="w-full py-3 bg-white border border-studio-border text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
                配置高级规则
              </button>
            </div>
          </div>
        ))}

        <button className="group border-4 border-dashed border-studio-border rounded-[48px] p-12 text-center flex flex-col items-center justify-center gap-4 hover:border-primary/40 hover:bg-primary/[0.02] transition-all min-h-[500px]">
          <div className="w-16 h-16 bg-studio-bg rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 transition-all">
            <span className="material-symbols-outlined text-3xl text-studio-sub group-hover:text-primary">add_circle</span>
          </div>
          <h3 className="text-lg font-black text-studio-dark">创建新方案</h3>
          <p className="text-xs text-studio-sub max-w-[200px]">
            定义一个新的会员级别，用于测试新的商业模式。
          </p>
        </button>
      </div>
    </div>
  );
};

export default PlanManager;
