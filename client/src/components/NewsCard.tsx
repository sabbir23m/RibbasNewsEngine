import { ExternalLink, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, type NewsItem, type CategoryKey, CATEGORY_INFO } from "@/lib/rss-service";

interface NewsCardProps {
  news: NewsItem;
  category?: CategoryKey;
  featured?: boolean;
  variant?: "default" | "compact" | "horizontal";
}

const categoryColors: Record<CategoryKey, string> = {
  top: "bg-primary text-primary-foreground",
  world: "bg-blue-600 text-white",
  business: "bg-emerald-600 text-white",
  technology: "bg-purple-600 text-white",
  sports: "bg-orange-600 text-white",
  entertainment: "bg-pink-600 text-white",
  health: "bg-teal-600 text-white",
  science: "bg-indigo-600 text-white",
};

export function NewsCard({ news, category, featured = false, variant = "default" }: NewsCardProps) {
  const placeholderGradients: Record<CategoryKey, string> = {
    top: "from-primary/30 to-primary/10",
    world: "from-blue-600/30 to-blue-600/10",
    business: "from-emerald-600/30 to-emerald-600/10",
    technology: "from-purple-600/30 to-purple-600/10",
    sports: "from-orange-600/30 to-orange-600/10",
    entertainment: "from-pink-600/30 to-pink-600/10",
    health: "from-teal-600/30 to-teal-600/10",
    science: "from-indigo-600/30 to-indigo-600/10",
  };

  const gradient = category ? placeholderGradients[category] : "from-primary/30 to-primary/10";

  if (variant === "horizontal") {
    return (
      <Card
        className="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-200"
        data-testid={`card-news-horizontal-${news.title.substring(0, 20).replace(/\s+/g, "-").toLowerCase()}`}
      >
        <a
          href={news.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-full gap-4 p-3"
          data-testid="link-news-article"
        >
          <div className="relative w-28 md:w-36 shrink-0 overflow-hidden rounded-md">
            {news.thumbnail ? (
              <img
                src={news.thumbnail}
                alt={news.title}
                className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className={`w-full h-full aspect-square bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                <span className="text-2xl font-bold text-muted-foreground/40">
                  {category ? CATEGORY_INFO[category].name.charAt(0) : "N"}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col justify-center min-w-0">
            {category && (
              <Badge className={`w-fit mb-2 text-[10px] uppercase tracking-wide ${categoryColors[category]}`}>
                {CATEGORY_INFO[category].name}
              </Badge>
            )}
            <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-1 group-hover:text-primary transition-colors">
              {news.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="truncate">{news.source}</span>
              <span className="text-muted-foreground/50">|</span>
              <span className="flex items-center gap-1 shrink-0">
                <Clock className="h-3 w-3" />
                {formatDate(news.pubDate)}
              </span>
            </div>
          </div>
        </a>
      </Card>
    );
  }

  return (
    <Card
      className={`group overflow-hidden hover-elevate active-elevate-2 transition-all duration-200 ${
        featured ? "md:col-span-2 lg:col-span-2" : ""
      }`}
      data-testid={`card-news-${news.title.substring(0, 20).replace(/\s+/g, "-").toLowerCase()}`}
    >
      <a
        href={news.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
        data-testid="link-news-article"
      >
        {/* Image Container */}
        <div className={`relative overflow-hidden ${featured ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
          {news.thumbnail ? (
            <img
              src={news.thumbnail}
              alt={news.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
              <span className="text-5xl font-bold text-muted-foreground/30">
                {category ? CATEGORY_INFO[category].name.charAt(0) : "N"}
              </span>
            </div>
          )}
          
          {/* Category Badge */}
          {category && (
            <Badge
              className={`absolute top-3 left-3 text-[10px] uppercase tracking-wide ${categoryColors[category]}`}
              data-testid={`badge-category-${category}`}
            >
              {CATEGORY_INFO[category].name}
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className={`p-4 ${featured ? "md:p-6" : ""}`}>
          {/* Title */}
          <h3
            className={`font-semibold leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors ${
              featured ? "text-xl md:text-2xl lg:text-3xl" : "text-base md:text-lg"
            }`}
            data-testid="text-news-title"
          >
            {news.title}
          </h3>

          {/* Description */}
          <p
            className={`text-muted-foreground mb-3 line-clamp-2 ${
              featured ? "text-base md:text-lg" : "text-sm"
            }`}
            data-testid="text-news-description"
          >
            {news.description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-medium truncate max-w-[120px]" data-testid="text-news-source">
                {news.source}
              </span>
              <span className="text-muted-foreground/50">|</span>
              <span className="flex items-center gap-1" data-testid="text-news-date">
                <Clock className="h-3 w-3" />
                {formatDate(news.pubDate)}
              </span>
            </div>
            
            <span className="flex items-center gap-1 text-primary font-medium shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              Read <ExternalLink className="h-3 w-3" />
            </span>
          </div>
        </div>
      </a>
    </Card>
  );
}
