# Ribbas News

A fully responsive, SEO-optimized news aggregation website that displays worldwide news from Google News RSS feeds.

## Overview

Ribbas News is a modern news website built with React that fetches and displays real-time news from 8 categories:
- **Top News** - Global breaking news
- **World** - International news
- **Business** - Financial and business news
- **Technology** - Tech industry updates
- **Sports** - Sports news and updates
- **Entertainment** - Entertainment industry news
- **Health** - Health and wellness news
- **Science** - Scientific discoveries and research

## Project Architecture

```
client/
├── src/
│   ├── components/
│   │   ├── Header.tsx         # Sticky navigation with responsive menu
│   │   ├── Footer.tsx         # Site footer with links
│   │   ├── NewsCard.tsx       # Individual news article card
│   │   ├── CategorySection.tsx # News grid section per category
│   │   ├── FeaturedNews.tsx   # Hero section with featured articles
│   │   └── ThemeToggle.tsx    # Dark/light mode toggle
│   ├── pages/
│   │   ├── HomePage.tsx       # Main landing page
│   │   ├── CategoryPage.tsx   # Individual category page
│   │   └── not-found.tsx      # 404 page
│   ├── lib/
│   │   ├── rss-service.ts     # RSS feed types and utilities
│   │   ├── theme-provider.tsx # Theme context provider
│   │   └── queryClient.ts     # React Query client
│   └── App.tsx                # Main app with routing
server/
├── routes.ts                  # API endpoints for RSS proxy
└── index.ts                   # Express server setup
```

## Key Features

- **Real-time News**: Fetches live news from Google News RSS feeds via a backend proxy
- **Responsive Design**: Mobile-first design that adapts to all screen sizes
- **Dark Mode**: Toggle between light and dark themes with localStorage persistence
- **SEO Optimized**: Meta tags, Open Graph tags, and semantic HTML5
- **Category Navigation**: Browse news by 8 different categories
- **Featured Section**: Hero section highlighting top stories

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Express.js (RSS proxy)
- **Routing**: Wouter
- **State**: React Query
- **RSS Parsing**: rss2json.com API

## API Endpoints

- `GET /api/news/:category` - Fetch news for a category (top, world, business, technology, sports, entertainment, health, science)
  - Query params: `count` (default: 12)

## Recent Changes

- November 2025: Initial build with full news aggregation from 8 Google News categories

## User Preferences

- Modern, clean news website design
- Red accent color for branding
- Inter font family for readability
- Responsive grid layouts for news cards
