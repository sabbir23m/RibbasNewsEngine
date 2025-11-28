import { NewsCard } from "../NewsCard";
import { ThemeProvider } from "@/lib/theme-provider";

// todo: remove mock functionality
const mockNews = {
  title: "Breaking: Major Technology Breakthrough Announced at Global Summit",
  link: "https://example.com/news/tech-breakthrough",
  pubDate: new Date().toISOString(),
  description: "Scientists have unveiled a revolutionary new technology that promises to transform how we interact with digital devices in our daily lives.",
  thumbnail: "https://picsum.photos/seed/news1/800/450",
  source: "Tech Today",
};

export default function NewsCardExample() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="max-w-md">
        <NewsCard news={mockNews} category="technology" />
      </div>
    </ThemeProvider>
  );
}
