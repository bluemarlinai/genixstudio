import React from 'react';

interface PrivacyPageProps {
  onBack: () => void;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-primary/20">
      <nav className="h-20 border-b border-studio-border flex items-center px-8 bg-white sticky top-0 z-50">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-studio-sub hover:text-studio-dark transition-colors group">
          <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          返回首页
        </button>
      </nav>

      <div className="max-w-3xl mx-auto py-20 px-6">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-studio-dark tracking-tight mb-4">隐私政策</h1>
          <p className="text-studio-sub text-sm">最后更新日期：2024年3月21日</p>
        </header>

        <article className="prose prose-indigo max-w-none prose-headings:font-black prose-headings:text-studio-dark prose-p:text-studio-sub prose-p:leading-relaxed">
          <p>在 Genix Studio，保护您的隐私和个人数据是我们的首要任务。本隐私政策解释了我们如何收集、使用和保护您的信息。</p>

          <h2>1. 我们收集的信息</h2>
          <p>我们收集您直接提供给我们的信息，包括：</p>
          <ul>
            <li>账户信息：姓名、电子邮件地址、个人资料图片。</li>
            <li>内容数据：您撰写的文章、上传的媒体以及创作偏好。</li>
            <li>API 数据：当您关联微信、知乎等平台时所需的授权 Token。</li>
          </ul>

          <h2>2. 我们如何使用信息</h2>
          <p>您的信息将用于：</p>
          <ul>
            <li>提供、维护和优化我们的创作与分发服务。</li>
            <li>通过 AI 模型为您生成创作建议。</li>
            <li>向您发送产品更新、安全提醒和客户支持响应。</li>
          </ul>

          <h2>3. 数据共享与第三方集成</h2>
          <p>我们不会向第三方出售您的个人数据。但在以下情况下我们会共享信息：</p>
          <ul>
            <li>根据您的指示分发内容至社交媒体平台。</li>
            <li>使用 AI 服务提供商处理 AI 辅助请求。</li>
            <li>法律要求的合规披露。</li>
          </ul>

          <h2>4. AI 数据处理</h2>
          <p>当您使用 AI 功能时，相关的文本片段会发送至我们的 AI 服务提供商进行处理。我们承诺在发送前尽可能进行去标识化处理，且不使用您的私有创作内容来训练基础 AI 模型，除非您明确授权。</p>

          <h2>5. 您的权利</h2>
          <p>您有权随时访问、更正或删除您的个人信息。您可以通过设置页面管理您的数据，或通过注销账户来移除所有存储的信息。</p>

          <h2>6. 数据安全</h2>
          <p>我们采用行业标准的加密技术（TLS/SSL）保护您的数据传输，并使用安全存储方案保护静态数据。虽然我们尽力保护，但任何网络传输都无法保证 100% 安全。</p>

          <footer className="mt-20 pt-10 border-t border-studio-border">
            <p className="text-xs italic">隐私相关事宜请咨询我们的数据保护专员：privacy@genixstudio.ai</p>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default PrivacyPage;