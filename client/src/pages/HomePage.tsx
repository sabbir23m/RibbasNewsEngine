import { useEffect, useState } from "react";
import { FeaturedNews } from "@/components/FeaturedNews";
import { CategorySection } from "@/components/CategorySection";
import { fetchNews, type NewsItem, type CategoryKey } from "@/lib/rss-service";
import { Loader2 } from "lucide-react";

interface CategoryNewsState {
  [key: string]: {
    news: NewsItem[];
    isLoading: boolean;
  };
}

const homeCategories: CategoryKey[] = ["world", "technology", "business", "sports", "entertainment", "health", "science"];

export default function HomePage() {
  const [topNews, setTopNews] = useState<NewsItem[]>([]);
  const [topNewsLoading, setTopNewsLoading] = useState(true);
  const [categoryNews, setCategoryNews] = useState<CategoryNewsState>({});
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const loadAllNews = async () => {
      setInitialLoading(true);
      
      // Load top news first
      setTopNewsLoading(true);
      const news = await fetchNews("top", 8);
      setTopNews(news);
      setTopNewsLoading(false);

      // Initialize category news states
      const initialState: CategoryNewsState = {};
      homeCategories.forEach((cat) => {
        initialState[cat] = { news: [], isLoading: true };
      });
      setCategoryNews(initialState);

      // Load all categories in parallel
      const categoryPromises = homeCategories.map(async (category) => {
        const categoryNews = await fetchNews(category, 6);
        return { category, news: categoryNews };
      });

      const results = await Promise.all(categoryPromises);
      
      const newState: CategoryNewsState = {};
      results.forEach(({ category, news }) => {
        newState[category] = { news, isLoading: false };
      });
      
      setCategoryNews(newState);
      setInitialLoading(false);
    };

    loadAllNews();
  }, []);

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Loading Indicator */}
        {initialLoading && (
          <div className="fixed bottom-4 right-4 z-50 bg-card border rounded-lg shadow-lg p-3 flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">Loading news...</span>
          </div>
        )}

        {/* Featured/Hero Section */}
        <FeaturedNews news={topNews} isLoading={topNewsLoading} />

        {/* Category Sections */}
        {homeCategories.map((category) => (
          <CategorySection
            key={category}
            category={category}
            news={categoryNews[category]?.news || []}
            isLoading={categoryNews[category]?.isLoading ?? true}
            maxItems={6}
          />
        ))}
      </div>
    </main>
  );
}
