
export type UserRole = 'CREATOR' | 'ADMIN';

export type ViewState = 
  | 'LANDING' | 'LOGIN' | 'DASHBOARD' | 'EDITOR' | 'TEMPLATES' | 'TEMPLATE_PREVIEW' 
  | 'SETTINGS' | 'PUBLISH' | 'CONTENT_LIST' | 'PLATFORM_CONFIG' | 'TERMS' | 'PRIVACY'
  | 'ADMIN_DASHBOARD' | 'ADMIN_ASSETS' | 'ADMIN_SUBSCRIBERS' | 'ADMIN_BILLING' | 'ADMIN_ANNOUNCEMENTS' | 'ADMIN_PLANS' | 'ADMIN_BLOG'
  | 'UPGRADE' | 'PAYMENT' | 'ANNOUNCEMENTS' | 'CALENDAR' | 'MEDIA_LIBRARY' | 'IDEA_BOARD' | 'HELP' | 'BLOG' | 'DEMO_VIEW';

export interface KPI {
  label: string;
  value: string;
  trend?: string;
  trendType?: 'up' | 'down' | 'neutral';
  icon: string;
  color: string;
}

export interface Announcement {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  type: 'update' | 'maintenance' | 'feature' | 'news';
  isNew?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  coverImage: string;
  category: string;
  status: 'published' | 'draft';
}

export interface Article {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'published' | 'scheduled';
  platforms: string[];
  lastEdited: string;
  coverImage?: string;
  views?: string;
  scheduledDate?: string;
}

export interface Template {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  usageCount: string;
  description?: string;
  author?: string;
}

export interface LinkedPlatform {
  id: string;
  name: string;
  icon: string;
  status: 'Connected' | 'Disconnected' | 'Experimental';
  color: string;
  lastSync?: string;
}

export interface SystemHealth {
  service: string;
  status: 'healthy' | 'degraded' | 'down';
  latency: string;
}

export interface UserSubscriber {
  id: string;
  name: string;
  email: string;
  tier: 'Free' | 'Pro' | 'Admin';
  joinedDate: string;
  status: 'Active' | 'Suspended';
}
