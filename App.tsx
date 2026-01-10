
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
import DemoView from './views/DemoView';

// Admin Views
import AdminDashboard from './views/admin/AdminDashboard';
import AssetManager from './views/admin/AssetManager';
import SubscriberManager from './views/admin/SubscriberManager';
import BillingManager from './views/admin/BillingManager';
import AnnouncementManager from './views/admin/AnnouncementManager';
import PlanManager from './views/admin/PlanManager';
import BlogManager from './views/admin/BlogManager';

import { ViewState, Template, UserRole } from './types';
import { BackgroundPreset, BrandPreset } from './components/editor/EditorTypes';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('LANDING');
  const [userRole, setUserRole] = useState<UserRole>('CREATOR');
  const [activePlatform, setActivePlatform] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const [publishingContent, setPublishingContent] = useState<string>('');
  const [publishingTitle, setPublishingTitle] = useState<string>('');
  const [publishingBg, setPublishingBg] = useState<BackgroundPreset | null>(null);
  const [publishingBrand, setPublishingBrand] = useState<BrandPreset | null>(null);

  const [autoOpenAi, setAutoOpenAi] = useState(false);

  const getPageTitle = () => {
    switch (currentView) {
      case 'DASHBOARD': return userRole === 'ADMIN' ? '系统健康看板' : '我的创作主页';
      case 'ADMIN_DASHBOARD': return '系统监控中心';
      case 'ANNOUNCEMENTS': return '消息与公告';
      case 'CALENDAR': return '发布排程';
      case 'CONTENT_LIST': return '我的作品';
      case 'MEDIA_LIBRARY': return '云端素材库';
      case 'EDITOR': return '正在创作';
      case 'TEMPLATES': return '灵感市场';
      case 'SETTINGS': return '偏好设置';
      default: return 'Genix Studio';
    }
  };

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setCurrentView(role === 'ADMIN' ? 'ADMIN_DASHBOARD' : 'DASHBOARD');
  };

  const handleLogout = () => {
    setCurrentView('LANDING');
  };

  const handleTemplatePreview = (template: Template) => {
    setSelectedTemplate(template);
    setCurrentView('TEMPLATE_PREVIEW');
  };

  const handleApplyTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setAutoOpenAi(false);
    setCurrentView('EDITOR');
  };

  const handlePublishNavigate = (content: string, title: string, bg: BackgroundPreset, brand: BrandPreset) => {
    setPublishingContent(content);
    setPublishingTitle(title);
    setPublishingBg(bg);
    setPublishingBrand(brand);
    setCurrentView('PUBLISH');
  };

  const handleStartCreation = () => {
    setAutoOpenAi(false);
    setCurrentView('EDITOR');
  };

  const handleTriggerAiCreation = () => {
    setAutoOpenAi(true);
    setCurrentView('EDITOR');
  };

  // 判定是否在需要显示顶部创作按钮的页面
  const showCreationButtons = userRole !== 'ADMIN' && ['DASHBOARD', 'CONTENT_LIST', 'TEMPLATES', 'MEDIA_LIBRARY', 'ANNOUNCEMENTS', 'CALENDAR', 'SETTINGS'].includes(currentView);

  if (currentView === 'LANDING') return <LandingPage onStart={setCurrentView} />;
  if (currentView === 'LOGIN') return <LoginPage onLogin={handleLogin} />;
  if (currentView === 'TERMS') return <TermsPage onBack={() => setCurrentView('LANDING')} />;
  if (currentView === 'PRIVACY') return <PrivacyPage onBack={() => setCurrentView('LANDING')} />;
  if (currentView === 'UPGRADE') return <UpgradePage onBack={() => setCurrentView('DASHBOARD')} onUpgrade={() => setCurrentView('PAYMENT')} />;
  if (currentView === 'PAYMENT') return <PaymentPage onBack={() => setCurrentView('UPGRADE')} onSuccess={() => setCurrentView('DASHBOARD')} />;
  if (currentView === 'EDITOR') return <Editor onBack={() => setCurrentView('CONTENT_LIST')} onPublish={handlePublishNavigate} onNavigateUpgrade={() => setCurrentView('UPGRADE')} autoOpenAiModal={autoOpenAi} />;
  if (currentView === 'TEMPLATE_PREVIEW' && selectedTemplate) return <TemplatePreview template={selectedTemplate} onBack={() => setCurrentView('TEMPLATES')} onUse={handleApplyTemplate} />;
  if (currentView === 'PUBLISH') return <Publish content={publishingContent} title={publishingTitle} bg={publishingBg} brand={publishingBrand} onBack={() => setCurrentView('EDITOR')} onSuccess={() => setCurrentView('DASHBOARD')} />;
  if (currentView === 'BLOG') return <BlogView onBack={() => setCurrentView('LANDING')} />;
  if (currentView === 'DEMO_VIEW') return <DemoView onClose={() => setCurrentView('LANDING')} onJoin={() => setCurrentView('LOGIN')} />;

  return (
    <div className="min-h-screen flex bg-studio-bg overflow-x-hidden">
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        onLogout={handleLogout} 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        role={userRole}
      />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-56'} flex flex-col min-h-screen`}>
        <TopNav 
          title={getPageTitle()} 
          subtitle={userRole === 'ADMIN' ? '正在管理全局基础设施' : '继续您的内容创作之旅'}
          onNotificationClick={() => setCurrentView('ANNOUNCEMENTS')}
          onHelpClick={() => setCurrentView('HELP')}
          onStartCreation={showCreationButtons ? handleStartCreation : undefined}
          onTriggerAiCreation={showCreationButtons ? handleTriggerAiCreation : undefined}
          hasUnread={true}
        />
        
        <div className="flex-1 overflow-y-auto bg-studio-bg/50">
          {currentView === 'DASHBOARD' && (
            <Dashboard 
              onUpgrade={() => setCurrentView('UPGRADE')} 
              onNavigateAnnouncements={() => setCurrentView('ANNOUNCEMENTS')} 
            />
          )}
          {currentView === 'ADMIN_DASHBOARD' && <AdminDashboard />}
          {currentView === 'ANNOUNCEMENTS' && <Announcements />}
          {currentView === 'CALENDAR' && <CalendarView />}
          {currentView === 'MEDIA_LIBRARY' && <MediaLibrary />}
          {currentView === 'CONTENT_LIST' && (
            <ContentList 
              onEdit={() => setCurrentView('EDITOR')} 
              onCreate={handleStartCreation} 
            />
          )}
          {currentView === 'TEMPLATES' && <TemplateLibrary onPreview={handleTemplatePreview} />}
          {currentView === 'SETTINGS' && <Settings onConfigPlatform={(p) => { setActivePlatform(p); setCurrentView('PLATFORM_CONFIG'); }} />}
          {currentView === 'PLATFORM_CONFIG' && activePlatform && <PlatformConfig platformId={activePlatform} onBack={() => setCurrentView('SETTINGS')} />}
          {currentView === 'HELP' && <HelpPage />}
          
          {/* Admin Specific */}
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
