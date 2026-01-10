
import React, { useState } from 'react';
import { UserSubscriber } from '../../types';

const mockSubscribers: UserSubscriber[] = [
  { id: '1', name: 'Alex Chen', email: 'alex@creatorstudio.ai', tier: 'Admin', joinedDate: '2023-10-12', status: 'Active' },
  { id: '2', name: 'Sarah Jenkins', email: 'sarah@design-lab.com', tier: 'Pro', joinedDate: '2024-01-05', status: 'Active' },
  { id: '3', name: 'Michael Wu', email: 'm.wu@freelance.net', tier: 'Pro', joinedDate: '2024-02-20', status: 'Active' },
  { id: '4', name: 'Emma Watson', email: 'emma@reader.io', tier: 'Free', joinedDate: '2024-03-01', status: 'Active' },
  { id: '5', name: 'David Miller', email: 'd.miller@spam.com', tier: 'Free', joinedDate: '2024-03-10', status: 'Suspended' },
  { id: '6', name: 'Lisa Ray', email: 'lisa@creative.com', tier: 'Pro', joinedDate: '2024-03-12', status: 'Active' },
];

const SubscriberManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<'All' | 'Free' | 'Pro'>('All');

  const filteredSubscribers = mockSubscribers.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) || sub.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = tierFilter === 'All' || sub.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  return (
    <div className="p-8 w-full space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">创作者名录</h1>
          <p className="text-studio-sub mt-2">管理全平台用户账户、订阅状态及违规处罚。</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-studio-sub text-[20px]">search</span>
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-studio-border rounded-xl text-sm w-64 focus:ring-slate-900 shadow-sm" 
              placeholder="搜姓名或邮箱..."
            />
          </div>
          <select 
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value as any)}
            className="bg-white border border-studio-border rounded-xl text-sm px-4 focus:ring-slate-900 shadow-sm"
          >
            <option value="All">所有等级</option>
            <option value="Free">免费用户</option>
            <option value="Pro">专业版</option>
          </select>
        </div>
      </header>

      <div className="bg-white rounded-[40px] border border-studio-border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-studio-border">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">创作者信息</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">当前方案</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">注册日期</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">状态</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">管理</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-studio-border">
            {filteredSubscribers.map((sub) => (
              <tr key={sub.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400 uppercase tracking-tighter">
                      {sub.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-slate-900">{sub.name}</span>
                      <span className="text-[11px] text-slate-400">{sub.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                    sub.tier === 'Admin' ? 'bg-red-50 text-red-600' :
                    sub.tier === 'Pro' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {sub.tier}
                  </span>
                </td>
                <td className="px-8 py-5 text-xs font-bold text-slate-500">{sub.joinedDate}</td>
                <td className="px-8 py-5">
                  <span className={`text-xs font-black uppercase ${sub.status === 'Active' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {sub.status === 'Active' ? '活跃' : '限制'}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                   <button className="text-slate-400 hover:text-slate-900">
                     <span className="material-symbols-outlined text-[20px]">more_vert</span>
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriberManager;
