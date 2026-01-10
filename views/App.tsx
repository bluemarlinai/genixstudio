
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Dashboard from './views/Dashboard';
import Editor from './views/Editor';
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import TemplateLibrary from './views/TemplateLibrary';
import TemplatePreview from './views/TemplatePreview';
import Settings from './views/Settings';
import Publish from './views/Publish';
import ContentList from './views/ContentList';
import PlatformConfig from './views/PlatformConfig';
import TermsPage from './views/TermsPage';
import PrivacyPage from './views/PrivacyPage';
import UpgradePage from './views/UpgradePage';
import PaymentPage from './views/PaymentPage';
import Announcements from './views/Announcements';
import CalendarView from './views/CalendarView';
import MediaLibrary from './views/MediaLibrary';
import HelpPage from './views/HelpPage';
import BlogView from './views/BlogView';

// Admin Views
import AdminDashboard from './views/admin/AdminDashboard';
import AssetManager from './views/admin/AssetManager';
import SubscriberManager from './views/admin/SubscriberManager';
import BillingManager from './views/admin/BillingManager';
import AnnouncementManager from './views/admin/AnnouncementManager';
import PlanManager from './views/admin/PlanManager';
import BlogManager from './views/admin/BlogManager';

import { ViewState, Template } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('LANDING');
  const [activePlatform, setActivePlatform] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // State for content being published
  const [publishingContent, setPublishingContent] = useState<string>('');
  const [publishingTitle, setPublishingTitle] = useState<string>('');

  const getPageTitle = () => {
    switch (currentView) {
      case 'DASHBOARD': return '数据概览';
      case 'ANNOUNCEMENTS': return '公告中心';
      case 'CALENDAR': return '发布日历';
      case 'CONTENT_LIST': return '内容管理';
      case 'MEDIA_LIBRARY': return '媒体素材库';
      case 'EDITOR': return '内容编辑';
      case 'TEMPLATES': return '模板库';
      case 'TEMPLATE_PREVIEW': return '模板预览';
      case 'SETTINGS': return '系统设置';
      case 'PUBLISH': return '发布准备';
      case 'PLATFORM_CONFIG': return '平台配置';
      case 'UPGRADE': return '会员方案';
      case 'PAYMENT': return '安全支付';
      case 'HELP': return '帮助与支持';
      case 'BLOG': return '官方博客';
      case 'ADMIN_DASHBOARD': return '系统指挥中心';
      case 'ADMIN_ASSETS': return '基础设施：物料库';
      case 'ADMIN_ANNOUNCEMENTS': return '全局公告分发控制';
      case 'ADMIN_PLANS': return '方案与权益配置';
      case 'ADMIN_BLOG': return '官方博客：内容管理';
      case 'ADMIN_SUBSCRIBERS': return '用户与订阅管理';
      case 'ADMIN_BILLING': return '财务与结算中心';
      default: return 'Genix Studio';
    }
  };

  const handleLogin = () => {
    setCurrentView('DASHBOARD');
  };

  const handleLogout = () => {
    setCurrentView('LANDING');
  };

  const handleConfigPlatform = (platformId: string) => {
    setActivePlatform(platformId);
    setCurrentView('PLATFORM_CONFIG');
  };

  const handleTemplatePreview = (template: Template) => {
    setSelectedTemplate(template);
    setCurrentView('TEMPLATE_PREVIEW');
  };

  const handleApplyTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setCurrentView('EDITOR');
  };

  const handlePublishNavigate = (content: string, title: string) => {
    setPublishingContent(content);
    setPublishingTitle(title);
    setCurrentView('PUBLISH');
  };

  const getActions = () => {
    if (currentView.startsWith('ADMIN_')) {
      return (
        <div className="flex items-center gap-1.5">
           <button className="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-[11px] font-bold transition-all">
              导出 CSV
           </button>
           <button 
            onClick={() => setCurrentView('ADMIN_PLANS')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-md ${currentView === 'ADMIN_PLANS' ? 'bg-primary text-white' : 'bg-slate-900 text-white hover:bg-black'}`}
           >
              方案配置
           </button>
        </div>
      );
    }
    if (['EDITOR', 'PUBLISH', 'TEMPLATE_PREVIEW', 'UPGRADE', 'PAYMENT', 'ANNOUNCEMENTS', 'CALENDAR', 'MEDIA_LIBRARY', 'HELP', 'BLOG'].includes(currentView)) {
      return null;
    }
    return (
      <button 
        onClick={() => setCurrentView('EDITOR')}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-bold shadow-sm transition-colors"
      >
        <span className="material-symbols-outlined text-[16px]">add</span>
        新建文章
      </button>
    );
  };

  // Full-screen / Independent Views
  if (currentView === 'LANDING') return <LandingPage onStart={setCurrentView} />;
  if (currentView === 'LOGIN') return <LoginPage onLogin={handleLogin} />;
  if (currentView === 'TERMS') return <TermsPage onBack={() => setCurrentView('LANDING')} />;
  if (currentView === 'PRIVACY') return <PrivacyPage onBack={() => setCurrentView('LANDING')} />;
  if (currentView === 'UPGRADE') return <UpgradePage onBack={() => setCurrentView('DASHBOARD')} onUpgrade={() => setCurrentView('PAYMENT')} />;
  if (currentView === 'PAYMENT') return <PaymentPage onBack={() => setCurrentView('UPGRADE')} onSuccess={() => setCurrentView('DASHBOARD')} />;
  if (currentView === 'EDITOR') return <Editor onBack={() => setCurrentView('CONTENT_LIST')} onPublish={handlePublishNavigate} onNavigateUpgrade={() => setCurrentView('UPGRADE')} />;
  if (currentView === 'TEMPLATE_PREVIEW' && selectedTemplate) return <TemplatePreview template={selectedTemplate} onBack={() => setCurrentView('TEMPLATES')} onUse={handleApplyTemplate} />;
  if (currentView === 'PUBLISH') return <Publish content={publishingContent} title={publishingTitle} onBack={() => setCurrentView('EDITOR')} onSuccess={() => setCurrentView('DASHBOARD')} />;
  if (currentView === 'BLOG') return <BlogView onBack={() => setCurrentView('LANDING')} />;

  return (
    <div className="min-h-screen flex bg-studio-bg overflow-x-hidden">
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        onLogout={handleLogout} 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-56'} flex flex-col min-h-screen`}>
        <TopNav 
          title={getPageTitle()} 
          subtitle={
            currentView === 'ADMIN_DASHBOARD' ? '实时监控全局业务指标与系统负载。' :
            currentView === 'ADMIN_ASSETS' ? '定制化编辑器中的核心视觉资产。' :
            currentView === 'ADMIN_ANNOUNCEMENTS' ? '管理用户可见的所有公告与通知。' :
            currentView === 'ADMIN_PLANS' ? '调整各级会员的权益、配额与价格体系。' :
            currentView === 'ADMIN_BLOG' ? '管理官方博客内容库。' :
            currentView === 'ADMIN_SUBSCRIBERS' ? 'CRM 中心：深度管理用户生命周期。' :
            currentView === 'ADMIN_BILLING' ? '营收监控：管理账单与订阅方案。' : undefined
          }
          actions={getActions()} 
          onNotificationClick={() => setCurrentView('ANNOUNCEMENTS')}
          onHelpClick={() => setCurrentView('HELP')}
          hasUnread={true}
        />
        
        <div className="flex-1 overflow-y-auto bg-studio-bg/50">
          {(currentView === 'DASHBOARD') && <Dashboard onUpgrade={() => setCurrentView('UPGRADE')} onNavigateAnnouncements={() => setCurrentView('ANNOUNCEMENTS')} />}
          {currentView === 'ANNOUNCEMENTS' && <Announcements />}
          {currentView === 'CALENDAR' && <CalendarView />}
          {currentView === 'MEDIA_LIBRARY' && <MediaLibrary />}
          {currentView === 'CONTENT_LIST' && <ContentList onEdit={() => setCurrentView('EDITOR')} onCreate={() => setCurrentView('EDITOR')} />}
          {currentView === 'TEMPLATES' && <TemplateLibrary onPreview={handleTemplatePreview} />}
          {currentView === 'SETTINGS' && <Settings onConfigPlatform={handleConfigPlatform} />}
          {currentView === 'PLATFORM_CONFIG' && activePlatform && <PlatformConfig platformId={activePlatform} onBack={() => setCurrentView('SETTINGS')} />}
          {currentView === 'HELP' && <HelpPage />}
          
          {/* Admin Modules */}
          {currentView === 'ADMIN_DASHBOARD' && <AdminDashboard />}
          {currentView === 'ADMIN_ASSETS' && <AssetManager />}
          {currentView === 'ADMIN_ANNOUNCEMENTS' && <AnnouncementManager />}
          {currentView === 'ADMIN_PLANS' && <PlanManager />}
          {currentView === 'ADMIN_BLOG' && <BlogManager />}
          {currentView === 'ADMIN_SUBSCRIBERS' && <SubscriberManager />}
          {currentView === 'ADMIN_BILLING' && <BillingManager />}
        </div>
      </main>
    </div>
  );
};

export default App;
