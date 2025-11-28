export const RSS_FEEDS = {
  top: "Top News",
  world: "World",
  business: "Business",
  technology: "Technology",
  sports: "Sports",
  entertainment: "Entertainment",
  health: "Health",
  science: "Science",
};

export type CategoryKey = keyof typeof RSS_FEEDS;

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail: string;
  source: string;
}

export async function fetchNews(category: CategoryKey, count: number = 12): Promise<NewsItem[]> {
  try {
    const response = await fetch(`/api/news/${category}?count=${count}`);
    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }
    const data = await response.json();
    return data.news || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

export async function searchNews(query: string): Promise<NewsItem[]> {
  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error("Failed to search news");
    }
    const data = await response.json();
    return data.news || [];
  } catch (error) {
    console.error("Error searching news:", error);
    return [];
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return "Just now";
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInHours < 48) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  }
}

export const CATEGORY_INFO: Record<CategoryKey, { name: string; slug: string; icon: string }> = {
  top: { name: "Top News", slug: "top", icon: "Newspaper" },
  world: { name: "World", slug: "world", icon: "Globe" },
  business: { name: "Business", slug: "business", icon: "Briefcase" },
  technology: { name: "Technology", slug: "technology", icon: "Cpu" },
  sports: { name: "Sports", slug: "sports", icon: "Trophy" },
  entertainment: { name: "Entertainment", slug: "entertainment", icon: "Film" },
  health: { name: "Health", slug: "health", icon: "Heart" },
  science: { name: "Science", slug: "science", icon: "FlaskConical" },
};
