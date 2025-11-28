import { CategorySection } from "../CategorySection";
import { ThemeProvider } from "@/lib/theme-provider";

// todo: remove mock functionality
const mockNews = [
  {
    title: "Global Leaders Meet to Discuss Climate Change Solutions",
    link: "https://example.com/news/1",
    pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    description: "World leaders gathered today to address pressing environmental concerns and outline new strategies for sustainable development.",
    thumbnail: "https://picsum.photos/seed/world1/800/450",
    source: "World News Daily",
  },
  {
    title: "Historic Peace Agreement Signed Between Nations",
    link: "https://example.com/news/2",
    pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    description: "A landmark peace agreement has been signed, marking the end of decades of conflict in the region.",
    thumbnail: "https://picsum.photos/seed/world2/800/450",
    source: "Global Times",
  },
  {
    title: "Economic Summit Addresses Global Trade Challenges",
    link: "https://example.com/news/3",
    pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    description: "Finance ministers from major economies discussed new trade policies and economic cooperation frameworks.",
    thumbnail: "https://picsum.photos/seed/world3/800/450",
    source: "Economic Review",
  },
];

export default function CategorySectionExample() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="max-w-7xl mx-auto px-4">
        <CategorySection 
          category="world" 
          news={mockNews} 
          maxItems={3}
        />
      </div>
    </ThemeProvider>
  );
}
