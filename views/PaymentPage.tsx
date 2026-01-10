
import React, { useState, useEffect } from 'react';

interface PaymentPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ onBack, onSuccess }) => {
  const [method, setMethod] = useState<'WECHAT' | 'ALIPAY'>('WECHAT');
  const [qrStatus, setQrStatus] = useState<'LOADING' | 'READY'>('LOADING');

  useEffect(() => {
    setQrStatus('LOADING');
    const timer = setTimeout(() => setQrStatus('READY'), 800);
    return () => clearTimeout(timer);
  }, [method]);

  return (
    <div className="min-h-screen bg-studio-bg flex items-center justify-center p-4 animate-in fade-in duration-500">
      <div className="max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-2xl border border-studio-border overflow-hidden">
        {/* Left: Order Info */}
        <div className="p-8 space-y-8 border-r border-studio-border">
          <header className="space-y-3">
            <button onClick={onBack} className="flex items-center gap-1.5 text-studio-sub hover:text-primary transition-colors mb-4">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span className="text-[10px] font-black uppercase tracking-widest">返回修改方案</span>
            </button>
            <h1 className="text-xl font-black text-studio-dark tracking-tight">确认订单</h1>
            <p className="text-studio-sub text-xs">请核对订阅详情并支付</p>
          </header>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-studio-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                </div>
                <div>
                  <p className="text-xs font-black">Studio Pro</p>
                  <p className="text-[9px] text-studio-sub font-bold uppercase">月订阅</p>
                </div>
              </div>
              <span className="text-base font-black text-studio-dark">¥99.00</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-medium text-studio-sub">
                <span>小计</span>
                <span>¥99.00</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-black text-studio-dark">应付总额</span>
                <span className="text-2xl font-black text-primary">¥99.00</span>
              </div>
            </div>
          </div>

          <div className="pt-6 flex items-center gap-3 border-t border-studio-border">
            <span className="material-symbols-outlined text-emerald-500 text-[24px]">verified_user</span>
            <div>
              <p className="text-[9px] font-black text-studio-dark uppercase tracking-widest">安全支付保护</p>
              <p className="text-[9px] text-studio-sub leading-tight">支付信息经 SSL 加密。我们不会存储您的密码。</p>
            </div>
          </div>
        </div>

        {/* Right: QR Section */}
        <div className="bg-slate-50 p-8 flex flex-col items-center justify-center text-center space-y-6">
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-studio-border w-full">
            <button onClick={() => setMethod('WECHAT')} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-black transition-all ${method === 'WECHAT' ? 'bg-green-500 text-white shadow-md' : 'text-studio-sub'}`}>
              <span className="material-symbols-outlined text-[16px]">chat</span>
              微信支付
            </button>
            <button onClick={() => setMethod('ALIPAY')} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-black transition-all ${method === 'ALIPAY' ? 'bg-blue-500 text-white shadow-md' : 'text-studio-sub'}`}>
              <span className="material-symbols-outlined text-[16px]">payments</span>
              支付宝
            </button>
          </div>

          <div className="relative group">
            <div className="bg-white p-4 rounded-3xl border-2 border-white shadow-xl relative z-10">
              <div className={`w-48 h-48 rounded-xl bg-studio-bg flex items-center justify-center overflow-hidden ${qrStatus === 'READY' ? 'opacity-100' : 'opacity-40'}`}>
                {qrStatus === 'LOADING' ? <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div> : (
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${method}`} className="w-full h-full object-contain cursor-pointer" onClick={onSuccess} />
                )}
              </div>
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full border border-studio-border shadow-md z-20 whitespace-nowrap flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full animate-pulse ${method === 'WECHAT' ? 'bg-green-500' : 'bg-blue-500'}`}></span>
              <span className="text-[9px] font-black uppercase tracking-widest text-studio-dark">等待扫码</span>
            </div>
          </div>

          <button onClick={onSuccess} className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline pt-2">[ 模拟支付成功 ]</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
