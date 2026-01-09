# FinderDev

A collaborative social platform designed to bridge the gap between software developers, designers, and project managers.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Backend:** Supabase
- **Language:** TypeScript

## Project Structure

```
finder-dev/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # Reusable components
│   │   └── layout/         # Layout components (SplashScreen, etc.)
│   ├── data/               # JSON content files
│   ├── config/             # Configuration files
│   └── utils/              # Utility functions
└── public/                 # Static assets
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Splash Screen:** Beautiful animated splash screen on app load
- **Content Management:** JSON-based content management system
- **Type Safety:** Full TypeScript support with type definitions
- **Dark Mode:** Built-in dark mode support

## Documentation

See [docs/analysis.md](./docs/analysis.md) for complete project specification.
