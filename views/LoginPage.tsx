import React, { useState, useEffect } from 'react';
import { UserRole } from '../types';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [loginMethod, setLoginMethod] = useState<'EMAIL' | 'WECHAT'>('EMAIL');
  const [testRole, setTestRole] = useState<UserRole>('CREATOR');
  const [qrStatus, setQrStatus] = useState<'LOADING' | 'READY'>('LOADING');

  useEffect(() => {
    if (loginMethod === 'WECHAT') {
      setQrStatus('LOADING');
      const timer = setTimeout(() => setQrStatus('READY'), 1200);
      return () => clearTimeout(timer);
    }
  }, [loginMethod]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-studio-bg px-6 font-sans">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white mb-6 shadow-xl shadow-primary/10 overflow-hidden">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
          </div>
          <h2 className="text-3xl font-black text-studio-dark tracking-tight">
            登录工作台
          </h2>
          <p className="text-studio-sub mt-2">选择您的身份并进入 Genix Studio</p>
        </div>

        <div className="bg-white p-8 rounded-[32px] shadow-2xl border border-studio-border overflow-hidden">
          <div className="flex bg-studio-bg p-1 rounded-2xl mb-8 border border-studio-border">
            <button 
              onClick={() => setTestRole('CREATOR')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${testRole === 'CREATOR' ? 'bg-white text-primary shadow-sm' : 'text-studio-sub'}`}
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
              普通创作者
            </button>
            <button 
              onClick={() => setTestRole('ADMIN')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${testRole === 'ADMIN' ? 'bg-slate-900 text-white shadow-md' : 'text-studio-sub'}`}
            >
              <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
              超级管理员
            </button>
          </div>

          <div className="space-y-5 animate-in fade-in duration-500">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">电子邮箱</label>
              <input 
                type="email" 
                className="w-full px-5 py-4 rounded-2xl border-studio-border bg-studio-bg focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
                placeholder={testRole === 'ADMIN' ? 'admin@genix.ai' : 'creator@genix.ai'}
                defaultValue={testRole === 'ADMIN' ? 'admin@genix.ai' : 'creator@genix.ai'}
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">密码</label>
              <input 
                type="password" 
                className="w-full px-5 py-4 rounded-2xl border-studio-border bg-studio-bg focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
                placeholder="••••••••"
                defaultValue="password"
              />
            </div>
            
            <button 
              onClick={() => onLogin(testRole)}
              className={`w-full py-4 text-white font-black rounded-2xl shadow-lg transition-all mt-4 active:scale-95 ${testRole === 'ADMIN' ? 'bg-slate-900 shadow-slate-900/20' : 'bg-primary shadow-primary/20'}`}
            >
              {testRole === 'ADMIN' ? '进入管理员后台' : '开启创作之旅'}
            </button>

            <div className="pt-6 border-t border-studio-border mt-6 text-center">
              <p className="text-[10px] font-bold text-studio-sub uppercase tracking-widest">
                当前选择: {testRole === 'ADMIN' ? 'SUPER ADMIN ACCESS' : 'CREATOR DASHBOARD'}
              </p>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-sm font-medium text-studio-sub">
          需要技术支持? <a href="#" className="text-primary font-bold hover:underline">联系我们</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;