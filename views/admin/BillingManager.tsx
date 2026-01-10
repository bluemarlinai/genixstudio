
import React from 'react';

const BillingManager: React.FC = () => {
  const transactions = [
    { id: 'TX-10294', user: 'Michael Wu', plan: 'Pro Monthly', amount: '¥99.00', date: '10分钟前', status: 'Success' },
    { id: 'TX-10293', user: 'Sarah Jenkins', plan: 'Pro Annual', amount: '¥988.00', date: '2小时前', status: 'Success' },
    { id: 'TX-10292', user: 'Unknown User', plan: 'Pro Monthly', amount: '¥99.00', date: '4小时前', status: 'Failed' },
    { id: 'TX-10291', user: 'Alex Chen', plan: 'Internal Pro', amount: '¥0.00', date: '昨天', status: 'Success' },
  ];

  return (
    <div className="p-8 w-full space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">平台营收监控</h1>
          <p className="text-studio-sub mt-2">实时追踪个人订阅转化，分析用户 LTV 与运营成本。</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-8 rounded-[40px] text-white space-y-4 shadow-2xl relative overflow-hidden">
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Total MRR</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black">¥124,500</span>
            <span className="text-xs font-bold text-emerald-400">+15.8%</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
            全平台个人 Pro 订阅收入。
          </p>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-studio-border space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">付费用户数</p>
          <div className="flex items-baseline gap-2 text-slate-900">
            <span className="text-4xl font-black">1,120</span>
            <span className="text-xs font-bold text-slate-400">Active Pro Users</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
            昨日净增 12 位订阅用户。
          </p>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-studio-border space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">ARPU (每用户平均收入)</p>
          <div className="flex items-baseline gap-2 text-slate-900">
            <span className="text-4xl font-black">¥111.1</span>
            <span className="text-xs font-bold text-emerald-400">+3.2%</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
            年费用户占比提升。
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">最新交易日志</h3>
        <div className="bg-white rounded-[40px] border border-studio-border overflow-hidden">
           <table className="w-full text-left">
             <thead className="bg-slate-50 border-b border-studio-border">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">单号</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">创作者</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">方案</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">金额</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">状态</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-studio-border">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-5 font-mono text-xs text-slate-400">{tx.id}</td>
                    <td className="px-8 py-5">
                      <span className="text-xs font-black text-slate-900">{tx.user}</span>
                    </td>
                    <td className="px-8 py-5 text-xs font-bold text-slate-600">{tx.plan}</td>
                    <td className="px-8 py-5 text-xs font-black text-slate-900">{tx.amount}</td>
                    <td className="px-8 py-5">
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase ${
                        tx.status === 'Success' ? 'text-emerald-600' : 'text-rose-600'
                      }`}>
                        {tx.status === 'Success' ? '成功' : '失败'}
                      </span>
                    </td>
                  </tr>
                ))}
             </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

export default BillingManager;
