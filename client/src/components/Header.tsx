import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Newspaper, Search, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { CATEGORY_INFO, type CategoryKey } from "@/lib/rss-service";
import { Input } from "@/components/ui/input";

const navCategories: CategoryKey[] = ["world", "business", "technology", "sports", "entertainment", "health", "science"];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      setIsMenuOpen(false);
      setLocation(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-1.5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <TrendingUp className="h-3.5 w-3.5" />
            <span className="font-medium">Breaking News</span>
            <span className="hidden md:inline text-primary-foreground/80">|</span>
            <span className="hidden md:inline text-primary-foreground/80">Stay updated with worldwide news</span>
          </div>
          <div className="text-xs text-primary-foreground/80">
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex h-16 md:h-20 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" data-testid="link-logo" className="flex items-center gap-3 hover-elevate rounded-md px-2 py-1">
              <div className="bg-primary rounded-lg p-2">
                <Newspaper className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight leading-none">
                  Ribbas <span className="text-primary">News</span>
                </span>
                <span className="text-[10px] text-muted-foreground tracking-wider uppercase">Worldwide Coverage</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              <Link
                href="/"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover-elevate ${
                  isActive("/") && location === "/" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
                data-testid="nav-link-home"
              >
                Home
              </Link>
              {navCategories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category}`}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover-elevate ${
                    isActive(`/category/${category}`) ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                  data-testid={`nav-link-${category}`}
                >
                  {CATEGORY_INFO[category].name}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Search - Desktop */}
              <div className="hidden md:flex items-center">
                {isSearchOpen ? (
                  <form onSubmit={handleSearch} className="flex items-center gap-2">
                    <Input
                      type="search"
                      placeholder="Search news..."
                      className="w-48 lg:w-64"
                      data-testid="input-search"
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                    />
                  </form>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(true)}
                    data-testid="button-search"
                    aria-label="Open search"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                )}
              </div>

              <ThemeToggle />

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                data-testid="button-mobile-menu"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden py-4 border-t" aria-label="Mobile navigation">
              {/* Mobile Search */}
              <div className="mb-4 px-2">
                <form onSubmit={handleSearch}>
                  <Input
                    type="search"
                    placeholder="Search news..."
                    className="w-full"
                    data-testid="input-search-mobile"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>
              
              <div className="flex flex-col gap-1">
                <Link
                  href="/"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover-elevate ${
                    isActive("/") && location === "/" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  data-testid="mobile-nav-link-home"
                >
                  Home
                </Link>
                {navCategories.map((category) => (
                  <Link
                    key={category}
                    href={`/category/${category}`}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover-elevate ${
                      isActive(`/category/${category}`) ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    data-testid={`mobile-nav-link-${category}`}
                  >
                    {CATEGORY_INFO[category].name}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
                                                 }
