import { Link } from "wouter";
import { Newspaper, Github, Twitter, Linkedin, Mail, Globe, Briefcase, Cpu, Trophy, Film, Heart, FlaskConical } from "lucide-react";
import { CATEGORY_INFO, type CategoryKey } from "@/lib/rss-service";

const categories: CategoryKey[] = ["world", "business", "technology", "sports", "entertainment", "health", "science"];

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

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card mt-12">
      {/* Newsletter Section */}
      <div className="bg-primary/5 border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Stay Updated</h3>
              <p className="text-sm text-muted-foreground">Get the latest news delivered to your inbox</p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 rounded-md border bg-background text-sm"
                data-testid="input-newsletter-email"
              />
              <button
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover-elevate active-elevate-2"
                data-testid="button-subscribe"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="bg-primary rounded-lg p-2">
                <Newspaper className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                Ribbas <span className="text-primary">News</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Your gateway to worldwide news. Stay informed with the latest stories from around the globe, covering all major categories.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-muted hover-elevate text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
                data-testid="link-social-twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-muted hover-elevate text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
                data-testid="link-social-github"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-muted hover-elevate text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
                data-testid="link-social-linkedin"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:contact@ribbasnews.com"
                className="p-2 rounded-md bg-muted hover-elevate text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
                data-testid="link-social-email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <nav className="flex flex-col gap-2" aria-label="Footer categories">
              {categories.slice(0, 4).map((category) => {
                const Icon = categoryIcons[category];
                return (
                  <Link
                    key={category}
                    href={`/category/${category}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`footer-link-${category}`}
                  >
                    <Icon className="h-4 w-4" />
                    {CATEGORY_INFO[category].name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* More Categories */}
          <div>
            <h3 className="font-semibold mb-4">More Categories</h3>
            <nav className="flex flex-col gap-2" aria-label="Footer more categories">
              {categories.slice(4).map((category) => {
                const Icon = categoryIcons[category];
                return (
                  <Link
                    key={category}
                    href={`/category/${category}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`footer-link-${category}`}
                  >
                    <Icon className="h-4 w-4" />
                    {CATEGORY_INFO[category].name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <nav className="flex flex-col gap-2" aria-label="Footer about">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-link-about"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-link-contact"
              >
                Contact
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-link-privacy"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-link-terms"
              >
                Terms of Service
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Ribbas News. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <Globe className="h-3.5 w-3.5" />
            Powered by Google News RSS Feeds
          </p>
        </div>
      </div>
    </footer>
  );
}
