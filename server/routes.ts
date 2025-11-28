import type { Express } from "express";
import { createServer, type Server } from "http";
import Parser from "rss-parser";

const parser = new Parser({
  customFields: {
    item: ['media:content', 'media:group', 'content', 'contentSnippet'],
  },
});

const BASE_RSS_URL = "https://news.google.com/rss";
const REGION_PARAMS = "hl=en-BD&gl=BD&ceid=BD:en"; 

const RSS_FEEDS: Record<string, string> = {
  top: `${BASE_RSS_URL}?${REGION_PARAMS}`,
  world: `${BASE_RSS_URL}/headlines/section/topic/WORLD?${REGION_PARAMS}`,
  business: `${BASE_RSS_URL}/headlines/section/topic/BUSINESS?${REGION_PARAMS}`,
  technology: `${BASE_RSS_URL}/headlines/section/topic/TECHNOLOGY?${REGION_PARAMS}`,
  sports: `${BASE_RSS_URL}/headlines/section/topic/SPORTS?${REGION_PARAMS}`,
  entertainment: `${BASE_RSS_URL}/headlines/section/topic/ENTERTAINMENT?${REGION_PARAMS}`,
  health: `${BASE_RSS_URL}/headlines/section/topic/HEALTH?${REGION_PARAMS}`,
  science: `${BASE_RSS_URL}/headlines/section/topic/SCIENCE?${REGION_PARAMS}`,
};

// Helper to extract image from HTML content
function extractImage(content: string): string {
  if (!content) return "";
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  const match = content.match(imgRegex);
  return match ? match[1] : "";
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // 1. Get News by Category
  app.get("/api/news/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const count = parseInt(req.query.count as string) || 12;

      // Handle search via category route gracefully
      if (category === 'search') {
         return res.status(400).json({ error: "Use /api/search endpoint for searching" });
      }

      let feedUrl = RSS_FEEDS[category];
      if (!feedUrl) {
        return res.status(404).json({ error: "Category not found" });
      }

      const feed = await parser.parseURL(feedUrl);

      const news = feed.items.slice(0, count).map((item: any) => {
        const rawContent = item.content || item['content:encoded'] || item.description || "";
        const thumbnail = extractImage(rawContent);
        
        // Clean description text
        const cleanDesc = (item.contentSnippet || item.description || "")
          .replace(/<[^>]*>/g, "") // Remove HTML tags
          .substring(0, 150)
          .trim();

        return {
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          description: cleanDesc ? cleanDesc + "..." : "Click to read full story.",
          thumbnail: thumbnail,
          source: item.creator || item.source?.title || "Google News",
        };
      });

      res.json({ news });
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  // 2. Search Endpoint
  app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
      }

      const searchUrl = `${BASE_RSS_URL}/search?q=${encodeURIComponent(query)}&${REGION_PARAMS}`;
      const feed = await parser.parseURL(searchUrl);

      const news = feed.items.map((item: any) => {
        const rawContent = item.content || item.description || "";
        const thumbnail = extractImage(rawContent);
        
        const cleanDesc = (item.contentSnippet || item.description || "")
          .replace(/<[^>]*>/g, "")
          .substring(0, 150);

        return {
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          description: cleanDesc + "...",
          thumbnail: thumbnail,
          source: item.source?.title || "Google News",
        };
      });

      res.json({ news });
    } catch (error) {
      console.error("Search Error:", error);
      res.status(500).json({ error: "Search failed" });
    }
  });

  return httpServer;
}
