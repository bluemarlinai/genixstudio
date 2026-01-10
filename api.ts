
import { db } from './db';
import { Article, KPI, Announcement, BlogPost } from './types';

export const ApiService = {
  async fetchArticles(): Promise<Article[]> {
    try {
      return await db.getArticles();
    } catch (error) {
      console.error("Failed to fetch articles", error);
      throw error;
    }
  },

  async saveArticle(article: Article): Promise<void> {
    try {
      return await db.saveArticle(article);
    } catch (error) {
      console.error("Failed to save article", error);
      throw error;
    }
  },

  async deleteArticle(id: string): Promise<void> {
    try {
      return await db.deleteArticle(id);
    } catch (error) {
      console.error("Failed to delete article", error);
      throw error;
    }
  },

  async fetchAnnouncements(): Promise<Announcement[]> {
    return await db.getAnnouncements();
  },

  async saveAnnouncement(item: Announcement): Promise<void> {
    return await db.saveAnnouncement(item);
  },

  async deleteAnnouncement(id: string): Promise<void> {
    return await db.deleteAnnouncement(id);
  },

  async fetchBlogPosts(): Promise<BlogPost[]> {
    return await db.getBlogPosts();
  },

  async saveBlogPost(post: BlogPost): Promise<void> {
    return await db.saveBlogPost(post);
  },

  async deleteBlogPost(id: string): Promise<void> {
    return await db.deleteBlogPost(id);
  },

  async fetchDashboardStats(): Promise<KPI[]> {
    const articles = await db.getArticles();
    const totalViews = articles.reduce((acc, curr) => acc + parseInt((curr.views || '0').replace(/,/g, '')), 0);
    
    return [
      { label: '总阅读量', value: totalViews.toLocaleString(), trend: '+12%', trendType: 'up', icon: 'visibility', color: 'bg-blue-50 text-blue-600' },
      { label: '文章发布数', value: articles.length.toString(), trend: '持平', trendType: 'neutral', icon: 'article', color: 'bg-orange-50 text-orange-600' },
      { label: '总互动量', value: '3,400', trend: '+5.4%', trendType: 'up', icon: 'forum', color: 'bg-purple-50 text-purple-600' },
      { label: '粉丝净增', value: '+450', trend: '+2.1%', trendType: 'up', icon: 'group_add', color: 'bg-pink-50 text-pink-600' },
    ];
  }
};
