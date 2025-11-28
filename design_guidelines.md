# Ribbas News - Design Guidelines

## Design Approach
**System-Based Approach** inspired by modern news platforms (BBC News, The Guardian, Reuters) with emphasis on information hierarchy, scannability, and efficient content consumption. The design prioritizes readability and quick navigation over visual flair.

## Typography System

**Font Families** (Google Fonts):
- Headlines: `Inter` (700, 600 weights)
- Body Text: `Inter` (400, 500 weights)
- Category Labels: `Inter` (600 weight, uppercase, letter-spacing: 0.05em)

**Type Scale**:
- Hero Headlines: text-4xl md:text-5xl lg:text-6xl (bold)
- Section Titles: text-3xl md:text-4xl (semi-bold)
- Article Titles: text-xl md:text-2xl (semi-bold)
- Body/Description: text-base md:text-lg (regular)
- Meta Info (date/source): text-sm (medium)
- Category Tags: text-xs uppercase (semi-bold)

## Layout System

**Spacing Primitives**: Tailwind units of **4, 6, 8, 12, 16** (e.g., p-4, gap-6, mb-8, py-12, mt-16)

**Container Strategy**:
- Max-width: `max-w-7xl mx-auto px-4 md:px-6`
- Section Spacing: `py-12 md:py-16`
- Card Gaps: `gap-6 md:gap-8`

**Grid Layouts**:
- Mobile: Single column (grid-cols-1)
- Tablet: 2 columns (md:grid-cols-2)
- Desktop: 3 columns for news cards (lg:grid-cols-3)
- Featured/Hero: 2 columns (lg:grid-cols-2) for larger cards

## Component Library

### Navigation
- Sticky header with site logo, category links, search icon
- Hamburger menu for mobile (transforms to horizontal nav on desktop)
- Height: h-16 md:h-20
- Padding: px-4 md:px-6

### News Cards
**Standard Card**:
- Aspect ratio image: 16:9 (rounded corners: rounded-lg)
- Padding: p-4 md:p-6
- Border: border with subtle shadow on hover
- Structure: Image → Category tag → Title → Description → Meta (source, date) → Read More link

**Featured Card** (Homepage hero):
- Larger format: Two-column layout on desktop
- Image on left, content on right (or full-width image with overlay)
- Increased text sizes (title: text-3xl md:text-4xl)

### Category Section Headers
- Section title with "View All" link aligned right
- Bottom border separator (border-b)
- Margin: mb-8

### Article Meta Information
- Flexbox layout: source name • publish date
- Separator: bullet point or vertical bar between items
- Truncate source names with ellipsis

### Buttons & Links
- "Read More" as text link with arrow icon (→)
- "View All" category links (semi-bold with subtle hover underline)
- External link icon for article links

## Icons
**Heroicons** (via CDN) for:
- Navigation menu icon (bars-3)
- Search icon (magnifying-glass)
- Arrow right (arrow-right) for "Read More"
- Category icons (optional): globe, briefcase, cpu-chip, trophy, film, heart, beaker

## Page Layouts

### Homepage Structure
1. Hero Section: Featured top news story (large card or full-width)
2. Top News Grid: 6 cards in 3-column grid
3. Category Sections: Each with header + 4-6 cards in grid
4. Footer: Links, categories, about, copyright

### Category Pages
- Page header: Category name + icon
- Full news grid: 12-24 articles
- Pagination or "Load More" button

## Images

**Image Strategy**:
- Every news card includes thumbnail image (16:9 aspect ratio)
- Images load from RSS feed thumbnails
- Fallback: Placeholder gradient or category-specific default
- Hero section: Large featured image (full-width or 60% width in two-column layout)
- Object-fit: cover for all images
- Lazy loading for performance

**Hero Image**: YES - Homepage features a prominent hero section with large news image (either full-width with text overlay OR two-column split with image left, content right). Recommended: Two-column layout for better text readability.

## Responsive Behavior

**Breakpoints**:
- Mobile: < 768px (stack everything, single column)
- Tablet: 768px - 1024px (2-column grids)
- Desktop: 1024px+ (3-column grids, horizontal nav)

**Navigation**: Hamburger menu → Full horizontal navbar
**Cards**: Stack vertically → 2-col grid → 3-col grid
**Hero**: Stack → Side-by-side layout

## Animations
Minimal, performance-focused:
- Subtle card hover lift (transform: translateY(-2px))
- Smooth transitions (transition-all duration-200)
- Image fade-in on load
- No scroll-triggered animations

## Accessibility
- Semantic HTML5: `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`
- Alt text for all images
- ARIA labels for navigation and interactive elements
- Focus states for keyboard navigation
- Contrast ratios meeting WCAG AA standards