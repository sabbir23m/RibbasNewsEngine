import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { ArrowLeft, Loader2, Search } from "lucide-react";
import { NewsCard } from "@/components/NewsCard";
import { Button } from "@/components/ui/button";
import { searchNews, type NewsItem } from "@/lib/rss-service";

export default function SearchPage() {
  const [location] = useLocation();
  // URL থেকে query বের করা
  const queryParams = new URLSearchParams(window.location.search);
  const query = queryParams.get("q") || "";

  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const performSearch = async () => {
      if (!query) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setNews([]); // Clear previous
      const results = await searchNews(query);
      setNews(results);
      setIsLoading(false);
    };

    performSearch();
  }, [query]);

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-xl p-3">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Search Results for "{query}"
              </h1>
              <p className="text-muted-foreground mt-1">
                {isLoading ? "Searching..." : `Found ${news.length} articles`}
              </p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <NewsCard key={`search-${index}`} news={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">No results found for your query. Try a different keyword.</p>
          </div>
        )}
      </div>
    </main>
  );
}
