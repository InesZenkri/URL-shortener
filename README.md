# URL Shortener

A small web app that turns long URLs into short links, wrapped in a terminal-style neon UI. Paste a link, hit `SHORTEN_URL.exe`, and copy the result.

## Features

- Shortens URLs through the TinyURL API - no account or API key needed
- One-click copy to clipboard
- Loading and error states
- Dark, terminal-inspired interface; fully client-side, no backend

## Tech Stack

- React 18, TypeScript, Vite
- Tailwind CSS
- lucide-react icons

## Getting Started

```bash
git clone https://github.com/InesZenkri/URL-shortener.git
cd URL-shortener
npm install
npm run dev
```

## How It Works

The app calls TinyURL's public endpoint (`tinyurl.com/api-create.php`) directly from the browser, so the short links are created by and resolve through TinyURL.

## Scripts

- `npm run dev` - start the development server
- `npm run build` - build for production
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build
