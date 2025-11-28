import { FeaturedNews } from "../FeaturedNews";
import { ThemeProvider } from "@/lib/theme-provider";

// todo: remove mock functionality
const mockNews = [
  {
    title: "Breaking: Revolutionary AI System Transforms Healthcare Industry Worldwide",
    link: "https://example.com/news/main",
    pubDate: new Date().toISOString(),
    description: "A groundbreaking artificial intelligence system has been deployed across major hospitals, promising to revolutionize patient care and diagnosis accuracy.",
    thumbnail: "https://picsum.photos/seed/featured1/1200/675",
    source: "Health Tech Daily",
  },
  {
    title: "Stock Markets Reach Record Highs Amid Economic Optimism",
    link: "https://example.com/news/2",
    pubDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    description: "Global stock markets surge to all-time highs as investors respond positively to economic indicators.",
    thumbnail: "https://picsum.photos/seed/featured2/400/400",
    source: "Financial Times",
  },
  {
    title: "Scientists Discover New Species in Deep Ocean Expedition",
    link: "https://example.com/news/3",
    pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    description: "Marine researchers uncover previously unknown life forms in the deepest parts of the Pacific Ocean.",
    thumbnail: "https://picsum.photos/seed/featured3/400/400",
    source: "Science Weekly",
  },
  {
    title: "Major Sports League Announces Expansion to New Markets",
    link: "https://example.com/news/4",
    pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    description: "Popular sports league reveals plans to add teams in international cities.",
    thumbnail: "https://picsum.photos/seed/featured4/400/400",
    source: "Sports Network",
  },
];

export default function FeaturedNewsExample() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="max-w-7xl mx-auto px-4">
        <FeaturedNews news={mockNews} />
      </div>
    </ThemeProvider>
  );
}
