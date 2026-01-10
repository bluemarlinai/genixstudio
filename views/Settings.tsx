
import React, { useState, useEffect } from 'react';

interface SettingsProps {
  onConfigPlatform: (platformId: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ onConfigPlatform }) => {
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-3-pro-preview');
  const [isSaved, setIsSaved] = useState(false);

  // 初始化加载配置
  useEffect(() => {
    const savedKey = localStorage.getItem('user_gemini_api_key') || '';
    const savedModel = localStorage.getItem('user_gemini_model') || 'gemini-3-pro-preview';
    setApiKey(savedKey);
    setSelectedModel(savedModel);
  }, []);

  const handleSaveAIConfig = () => {
    localStorage.setItem('user_gemini_api_key', apiKey);
    localStorage.setItem('user_gemini_model', selectedModel);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const models = [
    { id: 'gemini-3-pro-preview', name: 'Gemini 3 Pro', desc: 'Google 最强推理能力，适合深度长文创作', tag: 'RECOMMENDED', link: 'https://aistudio.google.com/app/apikey' },
    { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash', desc: 'Google 极致响应速度，适合快速润色', tag: 'SPEED', link: 'https://aistudio.google.com/app/apikey' },
    { id: 'deepseek-reasoner', name: 'DeepSeek-V3', desc: '国产最强开源模型，极高性价比与逻辑能力', tag: 'POPULAR', link: 'https://platform.deepseek.com/' },
    { id: 'glm-4', name: '智谱 GLM-4', desc: '中英双语大师，更懂中国创作者的语境', tag: 'LOCAL', link: 'https://open.bigmodel.cn/' },
    { id: 'qwen-max', name: '通义千问 Qwen', desc: '阿里自研大模型，具备极强的文案创意', tag: 'ENTERPRISE', link: 'https://dashscope.aliyun.com/' }
  ];

  const currentModelLink = models.find(m => m.id === selectedModel)?.link || 'https://aistudio.google.com/app/apikey';

  return (
    <div className="p-5 w-full space-y-5 pb-20 animate-in fade-in duration-500">
      <header>
        <h1 className="text-xl font-black tracking-tight text-studio-dark">个人与系统设置</h1>
        <p className="text-[11px] text-studio-sub mt-0.5 font-medium">管理账户安全、个人品牌及 AI 云端模型接口配置。</p>
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

          {/* AI MODEL CONFIG */}
          <section className="space-y-4">
            <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-widest border-b border-studio-border pb-2 flex items-center justify-between">
              AI 创作引擎中心
              <span className="material-symbols-outlined text-[14px]">psychology</span>
            </h3>
            <div className="bg-white rounded-[32px] border border-studio-border p-8 space-y-8 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-studio-dark uppercase tracking-[0.1em]">配置您的 API Key</label>
                  <a href={currentModelLink} target="_blank" className="text-[9px] font-black text-primary hover:underline flex items-center gap-1">
                    获取当前模型密钥 <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </a>
                </div>
                <div className="relative">
                  <input 
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full bg-studio-bg border-none rounded-2xl px-5 py-4 text-xs font-mono focus:ring-2 ring-primary/20 transition-all"
                    placeholder="在此输入您的 API Key..."
                  />
                  {apiKey && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-emerald-500">verified</span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-studio-dark uppercase tracking-[0.1em] block">选择驱动模型 (Model Selection)</label>
                <div className="grid grid-cols-1 gap-3">
                  {models.map((m) => (
                    <button 
                      key={m.id}
                      onClick={() => setSelectedModel(m.id)}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left group ${selectedModel === m.id ? 'border-primary bg-primary/[0.02] shadow-sm' : 'border-studio-border hover:bg-studio-bg'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${selectedModel === m.id ? 'bg-primary text-white' : 'bg-studio-bg text-studio-sub'}`}>
                          <span className="material-symbols-outlined text-[20px]">{selectedModel === m.id ? 'check_circle' : 'smart_toy'}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-black text-studio-dark">{m.name}</p>
                            <span className="text-[7px] font-black bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded uppercase tracking-tighter">{m.tag}</span>
                          </div>
                          <p className="text-[10px] text-studio-sub mt-0.5 font-medium">{m.desc}</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedModel === m.id ? 'border-primary' : 'border-studio-border'}`}>
                        {selectedModel === m.id && <div className="w-2.5 h-2.5 bg-primary rounded-full animate-in zoom-in duration-300"></div>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-studio-border flex justify-between items-center">
                <p className="text-[9px] text-studio-sub font-medium max-w-[300px]">配置将本地保存。支持通过 OpenAI 格式调用非 Google 模型。</p>
                <button 
                  onClick={handleSaveAIConfig}
                  className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center gap-2 ${isSaved ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-studio-dark text-white hover:bg-black shadow-black/10'}`}
                >
                  {isSaved ? <span className="material-symbols-outlined text-[18px]">done_all</span> : <span className="material-symbols-outlined text-[18px]">save</span>}
                  {isSaved ? '保存成功' : '应用 AI 配置'}
                </button>
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

          <div className="mt-8 p-6 bg-primary/5 rounded-[28px] border border-primary/10 space-y-3">
            <h4 className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              订阅权益
            </h4>
            <p className="text-[11px] text-studio-dark font-bold leading-relaxed">您当前处于 <span className="text-primary italic font-black">PRO 工作室</span> 方案。</p>
            <ul className="space-y-2">
              {['无限 AI 润色次数', 'Veo 高清视频生成', '自定义品牌水印'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-[9px] text-studio-sub font-medium">
                  <span className="material-symbols-outlined text-primary text-[14px]">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
