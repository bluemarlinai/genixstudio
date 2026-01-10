
import React, { useState, useEffect } from 'react';
import { UserRole } from '../types';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
  onBackToLanding: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBackToLanding }) => {
  const [loginMethod, setLoginMethod] = useState<'PHONE' | 'WECHAT'>('PHONE');
  const [testRole, setTestRole] = useState<UserRole>('CREATOR');
  // 预填测试数据，方便演示。用户可直接点击登录进入系统。
  const [phone, setPhone] = useState('13800138000');
  const [code, setCode] = useState('888888');
  const [countdown, setCountdown] = useState(0);

  // 当角色切换时，自动更新预填的演示数据，模拟不同身份登录
  useEffect(() => {
    if (testRole === 'ADMIN') {
      setPhone('18888888888');
      setCode('999999');
    } else {
      setPhone('13800138000');
      setCode('888888');
    }
  }, [testRole]);

  const startCountdown = () => {
    if (countdown === 0 && phone.length === 11) {
      setCountdown(60);
    }
  };

  useEffect(() => {
    let timer: number;
    if (countdown > 0) {
      timer = window.setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-studio-bg px-6 py-8 font-sans overflow-hidden relative">
      
      {/* Floating Back Button - 建立与 LandingPage 的联系 */}
      <button 
        onClick={onBackToLanding}
        className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-xl border border-studio-border rounded-full text-[10px] font-black text-studio-sub hover:text-primary hover:border-primary/20 hover:shadow-lg transition-all z-50 group"
      >
        <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
        返回首页
      </button>

      <div className="max-w-[380px] w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white mb-4 shadow-xl shadow-primary/10 overflow-hidden ring-4 ring-white/50 transition-transform hover:rotate-6">
            <img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain" />
          </div>
          <h2 className="text-2xl font-black text-studio-dark tracking-tight">
            欢迎回来
          </h2>
          <p className="text-studio-sub mt-1 text-[11px] font-bold uppercase tracking-widest opacity-70">Empowering Content Creators</p>
        </div>

        {/* Main Card */}
        <div className="bg-white p-7 rounded-[32px] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.12)] border border-studio-border relative overflow-hidden">
          
          {/* Identity Switcher */}
          <div className="flex bg-studio-bg p-1 rounded-xl mb-6 border border-studio-border">
            <button 
              onClick={() => setTestRole('CREATOR')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[10px] font-black transition-all ${testRole === 'CREATOR' ? 'bg-white text-primary shadow-sm' : 'text-studio-sub hover:text-studio-dark'}`}
            >
              <span className="material-symbols-outlined text-[16px]">person</span>
              创作者
            </button>
            <button 
              onClick={() => setTestRole('ADMIN')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[10px] font-black transition-all ${testRole === 'ADMIN' ? 'bg-slate-900 text-white shadow-md' : 'text-studio-sub hover:text-studio-dark'}`}
            >
              <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
              管理员
            </button>
          </div>

          {loginMethod === 'PHONE' ? (
            <div className="space-y-4 animate-in fade-in duration-500">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block px-1">手机号码</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px] material-symbols-outlined text-studio-sub">smartphone</span>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={11}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border-none bg-studio-bg focus:ring-2 focus:ring-primary/20 transition-all text-xs font-bold placeholder:text-gray-300"
                    placeholder="请输入手机号"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block px-1">验证码</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px] material-symbols-outlined text-studio-sub">verified_user</span>
                    <input 
                      type="text" 
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      maxLength={6}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border-none bg-studio-bg focus:ring-2 focus:ring-primary/20 transition-all text-xs font-bold placeholder:text-gray-300"
                      placeholder="验证码"
                    />
                  </div>
                  <button 
                    onClick={startCountdown}
                    disabled={phone.length !== 11 || countdown > 0}
                    className="px-4 rounded-xl bg-studio-bg text-primary text-[10px] font-black border border-primary/10 hover:bg-primary/5 disabled:opacity-50 transition-all whitespace-nowrap"
                  >
                    {countdown > 0 ? `${countdown}s` : '获取'}
                  </button>
                </div>
              </div>
              
              <button 
                onClick={() => onLogin(testRole)}
                className={`w-full py-4 text-white text-xs font-black rounded-xl shadow-xl transition-all mt-2 active:scale-95 flex items-center justify-center gap-2 group ${testRole === 'ADMIN' ? 'bg-slate-900 shadow-slate-900/20 hover:bg-black' : 'bg-primary shadow-primary/20 hover:bg-primary-dark'}`}
              >
                {testRole === 'ADMIN' ? '一键进入系统后台' : '一键开启创作之旅'}
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">bolt</span>
              </button>

              <div className="relative py-2 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-studio-border"></div></div>
                <span className="relative bg-white px-3 text-[9px] font-black text-studio-sub uppercase tracking-widest">或</span>
              </div>

              <button 
                onClick={() => setLoginMethod('WECHAT')}
                className="w-full py-3.5 bg-white border border-studio-border text-studio-dark text-xs font-black rounded-xl hover:bg-studio-bg transition-all flex items-center justify-center gap-2.5 active:scale-95"
              >
                <img src="https://img.icons8.com/color/48/000000/weixing.png" className="w-4 h-4" alt="WeChat" />
                微信快捷登录
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center py-2 animate-in zoom-in-95 duration-500 text-center">
               <div className="p-3 bg-white rounded-2xl border-2 border-studio-bg shadow-inner mb-4 relative">
                 <div className="w-40 h-40 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=GenixLogin&color=111418`} 
                      className="w-full h-full p-3 grayscale hover:grayscale-0 transition-all cursor-pointer" 
                      alt="Login QR" 
                      onClick={() => onLogin(testRole)}
                    />
                 </div>
               </div>
               <p className="text-[11px] text-studio-sub font-bold mb-6">微信扫描上方二维码进入</p>
               <button 
                onClick={() => setLoginMethod('PHONE')}
                className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-1"
               >
                 <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                 返回手机号登录
               </button>
            </div>
          )}

          <div className="mt-6 pt-5 border-t border-studio-border text-center">
             <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-loose">
               继续即代表您同意我们的 <br/>
               <a href="#" className="text-studio-sub hover:text-primary transition-colors">服务条款</a> & <a href="#" className="text-studio-sub hover:text-primary transition-colors">隐私政策</a>
             </p>
          </div>
        </div>

        {/* Footer Info */}
        <p className="text-center mt-6 text-[10px] font-bold text-studio-sub">
          遇到问题? <a href="#" className="text-primary hover:underline">联系技术顾问</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
