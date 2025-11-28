import { Link } from "wouter";
import { ArrowRight, Loader2, Globe, Briefcase, Cpu, Trophy, Film, Heart, FlaskConical, Newspaper } from "lucide-react";
import { NewsCard } from "./NewsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { type NewsItem, type CategoryKey, CATEGORY_INFO } from "@/lib/rss-service";

interface CategorySectionProps {
  category: CategoryKey;
  news: NewsItem[];
  isLoading?: boolean;
  showViewAll?: boolean;
  maxItems?: number;
}

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

export function CategorySection({
  category,
  news,
  isLoading = false,
  showViewAll = true,
  maxItems = 6,
}: CategorySectionProps) {
  const displayNews = news.slice(0, maxItems);
  const categoryInfo = CATEGORY_INFO[category];
  const Icon = categoryIcons[category];

  return (
    <section className="py-8 md:py-12" aria-labelledby={`section-${category}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
        <div className="flex items-center gap-3">
          <div className={`${categoryColors[category]} rounded-lg p-2`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <h2
            id={`section-${category}`}
            className="text-2xl md:text-3xl font-bold"
            data-testid={`heading-section-${category}`}
          >
            {categoryInfo.name}
          </h2>
          <div className="hidden md:block flex-1 h-px bg-border ml-4" />
        </div>
        
        {showViewAll && (
          <Link
            href={`/category/${category}`}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline underline-offset-4 shrink-0"
            data-testid={`link-view-all-${category}`}
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      {/* News Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: maxItems }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[16/10] rounded-lg" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : displayNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayNews.map((item, index) => (
            <NewsCard
              key={`${category}-${index}`}
              news={item}
              category={category}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg bg-muted/20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Loading {categoryInfo.name} news...</p>
        </div>
      )}
    </section>
  );
}
