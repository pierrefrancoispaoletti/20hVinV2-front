# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Development server
npm run build      # Production build
npm test           # Run tests
npm run deploy     # Build and deploy to GitHub Pages (gh-pages on master branch)
```

## Architecture Overview

This is a **Create React App** (React 17) frontend for **20hVin**, a wine/food menu app. It uses HashRouter for routing and is deployed as a static site.

### State Management

Redux with Redux-Persist, split into two domain modules under `src/redux/reducers/`:

- **Products/** — product list, modal state, editing state. Fetched from Heroku backend per location.
- **User/** — authentication, role-based access, user messages.

Each domain module follows a consistent file pattern: `actions.js`, `reducer.js`, `types.js`, `selectors.js`, `querries.js` (async thunks using Axios).

### Data Flow

1. `useFetchProducts` custom hook dispatches `getProductsByLocation` thunk on mount/category change.
2. Thunks in `querries.js` call the Heroku API (`src/_const.js` → `serverURI`).
3. Reselect selectors in `selectors.js` filter and sort products before rendering.
4. Admin CRUD operations require a Bearer token (stored via redux-persist).

### Routing

HashRouter with three routes:
- `/` and `/products/:category` → `ProductsPage` (lazy loaded)
- `/connexion` → Login page (redirects if already authenticated)

### Styling

Styled-Components. Style definitions live alongside components as `*.style.js` files.

### Key Constants

`src/_const.js` contains the backend URL, color palette, contact info, social links, product categories, and a Google API key. No `.env` files — all config is hardcoded here.

### PWA

Service worker registered in `src/index.js` with Workbox caching strategies. `public/manifest.json` defines the app manifest.
