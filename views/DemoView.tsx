
import React, { useState } from 'react';

interface DemoViewProps {
  onClose: () => void;
  onJoin: () => void;
}

const DemoView: React.FC<DemoViewProps> = ({ onClose, onJoin }) => {
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    { title: '极致编辑器', time: '0:15', desc: '感受毫秒级的响应与 AI 智能补全。' },
    { title: 'Gemini 算力注入', time: '1:45', desc: '一键润色、扩写与结构化优化。' },
    { title: '全平台一键分发', time: '3:20', desc: '多端自适应渲染，预览即所得。' },
    { title: '数据驱动创作', time: '4:50', desc: '深度用户洞察，助力影响力增长。' }
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-studio-dark flex flex-col animate-in fade-in duration-700 font-sans overflow-hidden">
      {/* Background Cinematic Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[150px] rounded-full"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-8 h-20 flex items-center justify-between border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="h-6 w-px bg-white/10"></div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-white uppercase tracking-widest">产品演示</span>
            <span className="px-2 py-0.5 rounded bg-primary text-[8px] font-black text-white uppercase tracking-tighter">HD 1080P</span>
          </div>
        </div>
        <button 
          onClick={onJoin}
          className="px-6 py-2 bg-primary text-white text-xs font-black rounded-full shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
        >
          立即开启专业创作
        </button>
      </header>

      {/* Content */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Video Player Area */}
        <div className="flex-1 p-6 md:p-12 flex items-center justify-center bg-black/20">
          <div className="w-full max-w-5xl aspect-video rounded-[32px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5 relative group cursor-pointer">
            {/* Mock Video Content */}
            <img 
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover brightness-50" 
              alt="Demo Preview" 
            />
            
            {/* Overlay UI */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-[40px] translate-x-1">play_arrow</span>
              </div>
            </div>

            {/* Feature Tags Floating */}
            <div className="absolute top-12 left-12 p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 animate-bounce-slow">
               <div className="flex items-center gap-2 text-primary mb-1">
                 <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                 <span className="text-[10px] font-black uppercase tracking-widest">AI 上下文感知</span>
               </div>
               <div className="h-1 w-24 bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-primary w-2/3"></div>
               </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] font-mono text-white/70 tracking-widest">01:45 / 05:20</span>
                <div className="flex-1 h-1 bg-white/10 rounded-full relative">
                  <div className="absolute top-0 left-0 h-full bg-primary w-1/3 rounded-full"></div>
                  <div className="absolute top-1/2 left-[33%] -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                   <span className="material-symbols-outlined text-white text-[24px]">skip_previous</span>
                   <span className="material-symbols-outlined text-white text-[32px]">pause</span>
                   <span className="material-symbols-outlined text-white text-[24px]">skip_next</span>
                   <span className="material-symbols-outlined text-white text-[24px]">volume_up</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-white/50 text-[20px]">closed_caption</span>
                  <span className="material-symbols-outlined text-white/50 text-[20px]">settings</span>
                  <span className="material-symbols-outlined text-white/50 text-[20px]">fullscreen</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Chapters */}
        <aside className="w-full lg:w-[400px] bg-white/5 backdrop-blur-3xl border-l border-white/10 p-8 flex flex-col space-y-8">
           <div>
             <h2 className="text-xl font-black text-white tracking-tight mb-2">演示章节</h2>
             <p className="text-xs text-white/40 uppercase tracking-widest font-bold">了解 Genix 如何重构工作流</p>
           </div>

           <div className="space-y-4">
             {chapters.map((chapter, i) => (
               <div 
                 key={i}
                 onClick={() => setActiveChapter(i)}
                 className={`p-6 rounded-3xl border transition-all cursor-pointer group ${
                   activeChapter === i 
                   ? 'bg-primary/10 border-primary/40' 
                   : 'bg-white/5 border-transparent hover:bg-white/10'
                 }`}
               >
                 <div className="flex justify-between items-start mb-2">
                   <span className={`text-[10px] font-black uppercase tracking-widest ${activeChapter === i ? 'text-primary' : 'text-white/50'}`}>
                     Chapter 0{i+1}
                   </span>
                   <span className="text-[10px] font-mono text-white/30">{chapter.time}</span>
                 </div>
                 <h3 className="text-sm font-black text-white mb-2 group-hover:text-primary transition-colors">{chapter.title}</h3>
                 <p className="text-[11px] text-white/50 leading-relaxed font-medium">{chapter.desc}</p>
               </div>
             ))}
           </div>

           <div className="mt-auto p-6 bg-gradient-to-br from-primary/20 to-indigo-500/20 rounded-[32px] border border-white/10 space-y-4">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                 <span className="material-symbols-outlined">auto_awesome_motion</span>
               </div>
               <div>
                 <p className="text-xs font-black text-white">准备好加入了吗？</p>
                 <p className="text-[10px] text-white/50 font-bold">释放你的创作潜能</p>
               </div>
             </div>
             <button 
              onClick={onJoin}
              className="w-full py-3 bg-white text-studio-dark rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl"
             >
               立即免费注册
             </button>
           </div>
        </aside>
      </main>
    </div>
  );
};

export default DemoView;
