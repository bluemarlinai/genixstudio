import React from 'react';

interface TermsPageProps {
  onBack: () => void;
}

const TermsPage: React.FC<TermsPageProps> = ({ onBack }) => {
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
          <h1 className="text-4xl font-black text-studio-dark tracking-tight mb-4">服务条款</h1>
          <p className="text-studio-sub text-sm">最后更新日期：2024年3月21日</p>
        </header>

        <article className="prose prose-blue max-w-none prose-headings:font-black prose-headings:text-studio-dark prose-p:text-studio-sub prose-p:leading-relaxed">
          <p>欢迎使用 Genix Studio。通过访问或使用我们的服务，您同意受以下条款的约束。请仔细阅读。这些条款管理您对 Genix Studio 平台、软件、内容以及我们提供的任何相关服务的访问和使用。</p>

          <h2>1. 账户注册与安全</h2>
          <p>您必须提供准确、完整的信息来创建账户。您应对保护您的账户凭据负责，并对您账户下发生的任何活动承担全部责任。如果您发现任何未经授权的访问，请立即通知我们。</p>

          <h2>2. 创作与知识产权</h2>
          <p>您保留通过 Genix Studio 创作、上传或分发的所有原创内容的知识产权。但是，通过使用我们的服务，您授予我们一个全球范围的、非排他性的许可，允许我们托管、存储和展示这些内容，以便为您提供服务。</p>
          <p>在使用 AI 辅助功能时，请注意 AI 生成内容可能受特定平台法律框架的约束。Genix Studio 不对 AI 建议的内容造成的任何版权纠纷负责。</p>

          <h2>3. 禁止行为</h2>
          <ul>
            <li>利用服务传播虚假信息、仇恨言论或违反法律的内容。</li>
            <li>尝试逆向工程或通过不正当手段访问我们的 API。</li>
            <li>滥用 AI 生成额度或干扰其他用户的正常使用。</li>
          </ul>

          <h2>4. 订阅与支付</h2>
          <p>我们提供多种订阅计划。选择付费计划即表示您同意按期支付费用。所有费用均不予退还，除非法律另有规定或本条款另有说明。</p>

          <h2>5. 服务变更与终止</h2>
          <p>我们保留随时修改、暂停或终止服务（或其任何部分）的权利，无论是否通知。如果您违反了这些条款，我们可能会立即终止您对服务的访问权限。</p>

          <h2>6. 免责声明</h2>
          <p>我们的服务按“现状”和“现有”基础提供，不提供任何形式的明示或暗示保证。我们不保证服务将不间断、及时、安全或无错误。</p>

          <footer className="mt-20 pt-10 border-t border-studio-border">
            <p className="text-xs italic">如果您对本服务条款有任何疑问，请联系我们的法务团队：legal@genixstudio.ai</p>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default TermsPage;