import { Article, Announcement, BlogPost } from './types';

const STORAGE_KEY = 'creator_studio_db';

interface DBStore {
  articles: Article[];
  announcements: Announcement[];
  blogPosts: BlogPost[];
  settings: any;
  assets: any[];
}

const initialStore: DBStore = {
  articles: [
    {
      id: '1',
      title: 'AI 在创意写作中的未来',
      description: '本文探讨了生成式 AI 如何改变创意写作的底层逻辑...',
      status: 'published',
      platforms: ['chat', 'article'],
      lastEdited: '2024-03-20',
      coverImage: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=400',
      views: '12,500'
    }
  ],
  announcements: [
    {
      id: '1',
      title: '最新的 AI 模型现已深度集成',
      excerpt: '升级后的 AI 引擎支持更长文本理解与更细腻的创意润色，Pro 用户可立即体验。',
      date: '2024-03-24',
      type: 'feature',
      isNew: true
    },
    {
      id: '2',
      title: '系统维护预告：3月28日凌晨',
      excerpt: '为了优化分发节点的响应速度，我们将于 3月28日 02:00-04:00 进行例行停机维护。',
      date: '2024-03-22',
      type: 'maintenance'
    }
  ],
  blogPosts: [
    {
      id: 'b1',
      title: '如何利用 Genix Studio 打造个人品牌',
      excerpt: '在数字时代，个人品牌是每一位创作者的核心资产。本文将教你如何利用 Studio 的全栈工具...',
      content: '品牌建设是一个长期的过程。首先，你需要确定你的核心定位...',
      author: 'Genix Team',
      date: '2024-03-21',
      coverImage: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=800',
      category: '指南',
      status: 'published'
    },
    {
      id: 'b2',
      title: '2024 内容创作趋势报告',
      excerpt: '多模态 AI 与短视频的结合正在重塑我们的消费习惯，创作者应如何应对？',
      content: '根据最新数据统计，超过 60% 的流量流向了具备 AI 辅助生成的增强型内容...',
      author: 'Insights Dept',
      date: '2024-03-18',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bbdac8a28a80?auto=format&fit=crop&q=80&w=800',
      category: '行业',
      status: 'published'
    }
  ],
  settings: {},
  assets: []
};

export const db = {
  getStore: (): DBStore => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStore));
      return initialStore;
    }
    return JSON.parse(data);
  },

  saveStore: (store: DBStore) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  },

  getArticles: async (): Promise<Article[]> => {
    await new Promise(r => setTimeout(r, 500));
    return db.getStore().articles;
  },

  saveArticle: async (article: Article): Promise<void> => {
    const store = db.getStore();
    const index = store.articles.findIndex(a => a.id === article.id);
    if (index > -1) {
      store.articles[index] = { ...article, lastEdited: new Date().toISOString().split('T')[0] };
    } else {
      store.articles.push({ ...article, id: Date.now().toString(), lastEdited: new Date().toISOString().split('T')[0] });
    }
    db.saveStore(store);
  },

  deleteArticle: async (id: string): Promise<void> => {
    const store = db.getStore();
    store.articles = store.articles.filter(a => a.id !== id);
    db.saveStore(store);
  },

  getAnnouncements: async (): Promise<Announcement[]> => {
    return db.getStore().announcements;
  },

  saveAnnouncement: async (item: Announcement): Promise<void> => {
    const store = db.getStore();
    const index = store.announcements.findIndex(a => a.id === item.id);
    if (index > -1) {
      store.announcements[index] = item;
    } else {
      store.announcements.unshift({ ...item, id: Date.now().toString(), date: new Date().toISOString().split('T')[0] });
    }
    db.saveStore(store);
  },

  deleteAnnouncement: async (id: string): Promise<void> => {
    const store = db.getStore();
    store.announcements = store.announcements.filter(a => a.id !== id);
    db.saveStore(store);
  },

  getBlogPosts: async (): Promise<BlogPost[]> => {
    return db.getStore().blogPosts;
  },

  saveBlogPost: async (post: BlogPost): Promise<void> => {
    const store = db.getStore();
    const index = store.blogPosts.findIndex(p => p.id === post.id);
    if (index > -1) {
      store.blogPosts[index] = post;
    } else {
      store.blogPosts.unshift({ ...post, id: 'b-' + Date.now() });
    }
    db.saveStore(store);
  },

  deleteBlogPost: async (id: string): Promise<void> => {
    const store = db.getStore();
    store.blogPosts = store.blogPosts.filter(p => p.id !== id);
    db.saveStore(store);
  }
};