
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { KPI } from '../types';
import { ApiService } from '../api';

const chartData = [
  { name: '周一', value: 4000 },
  { name: '周二', value: 3000 },
  { name: '周三', value: 2000 },
  { name: '周四', value: 2780 },
  { name: '周五', value: 1890 },
  { name: '周六', value: 2390 },
  { name: '周日', value: 3490 },
];

interface DashboardProps {
  onUpgrade?: () => void;
  onNavigateAnnouncements?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onUpgrade, onNavigateAnnouncements }) => {
  const [showBanner, setShowBanner] = useState(true);
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      const stats = await ApiService.fetchDashboardStats();
      setKpis(stats);
      setIsLoading(false);
    };
    loadStats();
  }, []);

  return (
    <div className="p-5 w-full space-y-5 animate-in fade-in duration-500 overflow-x-hidden">
      {showBanner && (
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center justify-between animate-in slide-in-from-top duration-500">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-white text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded shadow-sm">
              NEW
            </div>
            <p className="text-xs font-bold text-studio-dark">
              Gemini 3 Pro 模型现已深度集成，快来体验更细腻的 AI 润色功能。
              <button onClick={onNavigateAnnouncements} className="text-primary hover:underline ml-1.5">了解更多</button>
            </p>
          </div>
          <button onClick={() => setShowBanner(false)} className="text-studio-sub hover:text-studio-dark p-1">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-xl font-black tracking-tight text-studio-dark">数据概览</h1>
          <p className="text-[11px] text-studio-sub mt-0.5">实时追踪您在各大平台的内容表现与互动数据。</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          [1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-white rounded-2xl animate-pulse border border-studio-border"></div>)
        ) : (
          kpis.map((kpi, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-studio-border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.color}`}>
                  <span className="material-symbols-outlined text-[20px]">{kpi.icon}</span>
                </div>
                <span className="text-[10px] font-black text-studio-sub uppercase tracking-wider">{kpi.label}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black">{kpi.value}</span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${
                  kpi.trendType === 'up' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'
                }`}>
                  {kpi.trend}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-[32px] border border-studio-border shadow-sm h-full">
            <h3 className="text-xs font-black tracking-tight mb-6 flex items-center gap-2 text-studio-dark">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              流量趋势 (近7日)
            </h3>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#137fec" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#137fec" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#617589', fontSize: 10}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontSize: '11px' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#137fec" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[32px] p-8 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden min-h-[350px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
          <div>
            <h3 className="text-lg font-black mb-1">使用额度状态</h3>
            <p className="text-[10px] text-slate-400 mb-8 font-medium">您本月的创作额度即将耗尽。</p>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[10px] font-black mb-2 uppercase tracking-widest text-slate-400">
                  <span>文章发布 (可用性)</span>
                  <span className="text-white">Unlimited</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-full shadow-[0_0_12px_rgba(19,127,236,0.8)]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-black mb-2 uppercase tracking-widest text-slate-400">
                  <span>AI 润色额度</span>
                  <span className="text-indigo-400">95%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[95%]"></div>
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={onUpgrade}
            className="w-full py-4 bg-primary text-white text-[11px] font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-10 uppercase tracking-widest"
          >
            升级至 PRO 解锁更多
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
