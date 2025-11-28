import { Link } from "wouter";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, type NewsItem } from "@/lib/rss-service";

interface FeaturedNewsProps {
  news: NewsItem[];
  isLoading?: boolean;
}

export function FeaturedNews({ news, isLoading = false }: FeaturedNewsProps) {
  if (isLoading) {
    return (
      <section className="py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Skeleton className="aspect-[16/9] rounded-lg" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="w-24 h-24 rounded-md shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return null;
  }

  const mainStory = news[0];
  const secondaryStories = news.slice(1, 5);

  return (
    <section className="py-6 md:py-8" aria-label="Featured news">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary rounded-lg p-2">
          <TrendingUp className="h-5 w-5 text-primary-foreground" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">Top Stories</h2>
        <div className="flex-1 h-px bg-border ml-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Featured Story */}
        <Card
          className="lg:col-span-2 group overflow-hidden hover-elevate active-elevate-2 transition-all"
          data-testid="card-featured-main"
        >
          <a
            href={mainStory.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              {mainStory.thumbnail ? (
                <img
                  src={mainStory.thumbnail}
                  alt={mainStory.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                  <span className="text-8xl font-bold text-muted-foreground/20">R</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                <Badge className="mb-3 bg-primary text-primary-foreground text-xs uppercase tracking-wide">
                  Breaking News
                </Badge>
                <h2
                  className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 line-clamp-3"
                  data-testid="text-featured-title"
                >
                  {mainStory.title}
                </h2>
                <p className="text-white/80 text-sm md:text-base line-clamp-2 mb-4 max-w-2xl">
                  {mainStory.description}
                </p>
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <span className="font-medium">{mainStory.source}</span>
                  <span>|</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {formatDate(mainStory.pubDate)}
                  </span>
                </div>
              </div>
            </div>
          </a>
        </Card>

        {/* Secondary Stories */}
        <div className="flex flex-col gap-4">
          {secondaryStories.map((story, index) => (
            <Card
              key={index}
              className="group flex-1 overflow-hidden hover-elevate active-elevate-2 transition-all"
              data-testid={`card-featured-secondary-${index}`}
            >
              <a
                href={story.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full gap-3 p-3"
              >
                {/* Thumbnail */}
                <div className="relative w-24 md:w-28 shrink-0 overflow-hidden rounded-md">
                  {story.thumbnail ? (
                    <img
                      src={story.thumbnail}
                      alt={story.title}
                      className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full aspect-square bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-xl font-bold text-muted-foreground/30">R</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <h3
                    className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors"
                    data-testid={`text-secondary-title-${index}`}
                  >
                    {story.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="truncate">{story.source}</span>
                    <span className="text-muted-foreground/50">|</span>
                    <span className="flex items-center gap-1 shrink-0">
                      <Clock className="h-3 w-3" />
                      {formatDate(story.pubDate)}
                    </span>
                  </div>
                </div>
              </a>
            </Card>
          ))}
          
          {/* View More Link */}
          <Link
            href="/category/top"
            className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-primary hover:underline underline-offset-4 mt-auto"
            data-testid="link-view-more-top"
          >
            View All Top Stories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
