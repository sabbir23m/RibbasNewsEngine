import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { ArrowLeft, Loader2, Globe, Briefcase, Cpu, Trophy, Film, Heart, FlaskConical, Newspaper, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { NewsCard } from "@/components/NewsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { fetchNews, CATEGORY_INFO, type NewsItem, type CategoryKey } from "@/lib/rss-service";

const categoryIcons: Record<CategoryKey, any> = {
  top: Newspaper,
  world: Globe,
  business: Briefcase,
  technology: Cpu,
  sports: Trophy,
  entertainment: Film,
  health: Heart,
  science: FlaskConical,
};

const categoryColors: Record<CategoryKey, string> = {
  top: "bg-primary",
  world: "bg-blue-600",
  business: "bg-emerald-600",
  technology: "bg-purple-600",
  sports: "bg-orange-600",
  entertainment: "bg-pink-600",
  health: "bg-teal-600",
  science: "bg-indigo-600",
};

export default function CategoryPage() {
  const [, params] = useRoute("/category/:slug");
  const slug = params?.slug as CategoryKey | undefined;
  
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(12);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const categoryInfo = slug && CATEGORY_INFO[slug] ? CATEGORY_INFO[slug] : null;
  const Icon = slug ? categoryIcons[slug] : Newspaper;

  const loadNews = async () => {
    if (!slug || !CATEGORY_INFO[slug]) return;

    setIsLoading(true);
    setDisplayCount(12);
    const fetchedNews = await fetchNews(slug, 24);
    setNews(fetchedNews);
    setIsLoading(false);
  };

  const handleRefresh = async () => {
    if (!slug) return;
    setIsRefreshing(true);
    const fetchedNews = await fetchNews(slug, 24);
    setNews(fetchedNews);
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadNews();
  }, [slug]);

  if (!categoryInfo) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The category you're looking for doesn't exist.
          </p>
          <Link href="/">
            <Button data-testid="button-go-home">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 6, news.length));
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
            data-testid="link-back-home"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className={`${categoryColors[slug!]} rounded-xl p-3`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1
                  className="text-3xl md:text-4xl lg:text-5xl font-bold"
                  data-testid="heading-category-title"
                >
                  {categoryInfo.name}
                </h1>
                <p className="text-muted-foreground mt-1">
                  Latest {categoryInfo.name.toLowerCase()} news from around the world
                </p>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
              data-testid="button-refresh"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* News Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[16/10] rounded-lg" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : news.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.slice(0, displayCount).map((item, index) => (
                <NewsCard
                  key={`${slug}-${index}`}
                  news={item}
                  category={slug}
                  featured={index === 0}
                />
              ))}
            </div>

            {/* Load More Button */}
            {displayCount < news.length && (
              <div className="flex justify-center mt-8">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLoadMore}
                  data-testid="button-load-more"
                >
                  Load More News ({news.length - displayCount} remaining)
                </Button>
              </div>
            )}

            {/* News Count */}
            <div className="text-center mt-6 text-sm text-muted-foreground">
              Showing {Math.min(displayCount, news.length)} of {news.length} articles
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center border rounded-lg bg-muted/20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No news available for this category at the moment.
            </p>
            <Button variant="outline" className="mt-4" onClick={loadNews}>
              Try Again
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
