
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SystemHealth } from '../../types';

const revenueData = [
  { name: '1月', revenue: 45000 },
  { name: '2月', revenue: 52000 },
  { name: '3月', revenue: 61000 },
];

const AdminDashboard: React.FC = () => {
  const healthMetrics: SystemHealth[] = [
    { service: 'Gemini 3 Pro API', status: 'healthy', latency: '240ms' },
    { service: 'Veo Video Engine', status: 'degraded', latency: '4.2s' },
    { service: 'CDN - Image Assets', status: 'healthy', latency: '45ms' },
    { service: 'PostgreSQL DB', status: 'healthy', latency: '12ms' },
  ];

  return (
    <div className="p-8 md:px-12 lg:px-16 space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-studio-dark">系统管理中心</h1>
          <p className="text-studio-sub mt-2 font-medium">全局基础设施、业务增长及核心系统负载实时监控。</p>
        </div>
        <div className="flex gap-3">
          <div className="px-5 py-2.5 bg-green-50 text-green-700 text-xs font-black rounded-full flex items-center gap-2.5 border border-green-100 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            全系统状态良好
          </div>
        </div>
      </header>

      {/* Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((m, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[32px] border border-studio-border shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-5">
              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-xl shadow-sm ${
                m.status === 'healthy' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {m.status}
              </span>
              <span className="text-[10px] font-black text-studio-sub bg-studio-bg px-2 py-1 rounded-lg font-mono">{m.latency}</span>
            </div>
            <h4 className="text-sm font-black text-studio-dark uppercase tracking-tight">{m.service}</h4>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white p-10 rounded-[48px] border border-studio-border shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div className="space-y-1">
               <h3 className="text-lg font-black tracking-tight">MRR (月经常性收入)</h3>
               <p className="text-[10px] text-studio-sub font-bold uppercase tracking-widest">Revenue Growth Analytics</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-primary">¥158,200</span>
              <p className="text-[10px] text-green-500 font-black mt-1">+12.5% vs Last Month</p>
            </div>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#137fec" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#137fec" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#617589', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#137fec" strokeWidth={5} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Usage stats */}
        <div className="bg-slate-900 p-10 rounded-[48px] text-white space-y-10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div>
            <h3 className="text-lg font-black text-indigo-300 flex items-center gap-3">
              <span className="material-symbols-outlined">bolt</span>
              AI 算力消耗监控
            </h3>
            <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-[0.2em]">Compute Resource Allocation</p>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex justify-between text-[11px] font-black mb-3 uppercase tracking-widest">
                <span>Gemini 3 Pro API</span>
                <span className="text-indigo-400">82%</span>
              </div>
              <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden p-[2px]">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-primary w-[82%] rounded-full shadow-[0_0_15px_rgba(129,140,248,0.6)]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] font-black mb-3 uppercase tracking-widest">
                <span>Veo GPU Clusters</span>
                <span className="text-purple-400">45%</span>
              </div>
              <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden p-[2px]">
                <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 w-[45%] rounded-full shadow-[0_0_15px_rgba(192,132,252,0.4)]"></div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-loose">
                支出预测: 本月 API 支出约为 <span className="text-white">¥12,400</span>。<br />
                预算盈余: <span className="text-green-400">¥3,600</span> (充足)。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
