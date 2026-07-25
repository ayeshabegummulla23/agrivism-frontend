# AgriVISM — Frontend

**AI-powered agriculture platform helping farmers with land management, weather forecasting, irrigation planning, market prices, and crop intelligence.**

Live Demo: https://ayeshabegummulla23.github.io/agrivism-frontend/

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI library |
| Vite 8 | Build tool & dev server |
| Tailwind CSS v4 | Utility-first styling |
| React Router DOM | Client-side routing |
| Framer Motion | Animations |
| Recharts | Analytics charts |
| React Icons | Icon library |
| Leaflet | Map UI (placeholder) |

---

## Project Structure

```
client/
├── public/
│   ├── favicon.svg              # App favicon
│   └── 404.html                 # GitHub Pages SPA redirect
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Navbar.jsx           # Landing page navigation
│   │   ├── Footer.jsx           # Landing page footer
│   │   ├── Hero.jsx             # Hero section with CTA
│   │   ├── FeatureCard.jsx      # Feature card with hover animation
│   │   ├── Sidebar.jsx          # Dashboard sidebar navigation
│   │   ├── DashboardHeader.jsx  # Top bar with search & profile
│   │   ├── DashboardCard.jsx    # Clickable stat card
│   │   ├── StatsCard.jsx        # Stats display card
│   │   ├── UploadCard.jsx       # File upload area
│   │   ├── OCRPreviewCard.jsx   # OCR extracted data display
│   │   ├── MapPlaceholder.jsx   # Leaflet map placeholder
│   │   ├── WeatherCard.jsx      # Weather widget
│   │   ├── WaterCard.jsx        # Water usage widget
│   │   ├── MarketPriceCard.jsx  # Market price card
│   │   ├── AIAvatarCard.jsx     # VALI assistant widget
│   │   └── NotificationCard.jsx # Notifications list
│   ├── pages/                   # Route-level pages
│   │   ├── Landing.jsx          # Full landing page (10 sections)
│   │   ├── Login.jsx            # Login form
│   │   ├── Register.jsx         # Farmer registration form
│   │   ├── Dashboard.jsx        # Main dashboard
│   │   ├── RegisterFarm.jsx     # 4-step farm registration wizard
│   │   ├── FarmProfile.jsx      # Farm details & map
│   │   ├── Weather.jsx          # Weather forecast & alerts
│   │   ├── WaterManagement.jsx  # Irrigation planning
│   │   ├── MarketPrices.jsx     # Mandi prices & trends
│   │   ├── ProblemSolver.jsx    # Crop problem diagnosis
│   │   ├── DiseaseDetection.jsx # AI disease detection
│   │   ├── CropRecommendation.jsx # AI crop suggestions
│   │   ├── FertilizerRecommendation.jsx # Fertilizer guide
│   │   ├── AIAssistant.jsx      # VALI AI chat interface
│   │   ├── Analytics.jsx        # Charts & farm analytics
│   │   └── Settings.jsx         # Profile & preferences
│   ├── hooks/                   # Custom React hooks
│   ├── services/                # API service layer (ready for backend)
│   ├── assets/                  # Static assets
│   ├── App.jsx                  # Root component with routes
│   ├── main.jsx                 # Entry point with BrowserRouter
│   └── index.css                # Tailwind CSS config & global styles
├── .github/workflows/
│   └── deploy.yml               # GitHub Actions CI/CD
├── index.html                   # HTML entry point
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind configuration
├── package.json                 # Dependencies & scripts
└── render.yaml                  # Render deployment config
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
cd client
npm install
```

### Development Server

```bash
npm run dev
```

Opens at `http://localhost:5173` with hot reload.

### Production Build

```bash
npm run build
```

Output goes to `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Landing | Hero, About, Features, How It Works, Stats, Testimonials, FAQ, Contact, Footer |
| `/login` | Login | Email/mobile + password authentication |
| `/register` | Register | Farmer registration with personal details |
| `/dashboard` | Dashboard | Stats cards, weather, water usage, market prices, charts, activities |
| `/register-farm` | Smart Land Registration | 4-step wizard: Upload → OCR → Map → Registration Form |
| `/farm-profile` | Farm Profile | Farm details, weather summary, map preview |
| `/weather` | Weather Forecast | Current weather, 7-day forecast, alerts, detail cards |
| `/water-management` | Water Management | Crop info, water requirements, irrigation timing, saving tips |
| `/market-prices` | Market Prices | Nearby markets, today's prices, weekly trends, price chart |
| `/problem-solver` | Problem Solver | Symptom selection → Upload → AI Diagnosis with weather alerts |
| `/disease-detection` | Disease Detection | Image upload → AI Prediction → Treatment → Weather-based spray alerts |
| `/crop-recommendation` | Crop Recommendation | Soil conditions, ranked crop suggestions with match scores |
| `/fertilizer` | Fertilizer Guide | Weather-aware spray alerts, fertilizer plan, spray safety, organic options |
| `/ai-assistant` | VALI AI Assistant | Chat interface with typing animation, suggested questions |
| `/analytics` | Farm Analytics | Monthly expenses, water usage, crop growth, weather & market trends |
| `/settings` | Settings | Profile, notifications, language, dark mode, account |

---

## Components

### Layout Components

**`Navbar`** — Responsive navigation bar with mobile hamburger menu. Glass effect styling. Links to Login/Register on landing page.

**`Sidebar`** — Collapsible dashboard sidebar with 13 menu items. Active route highlighting with green accent. Collapse/expand toggle.

**`DashboardHeader`** — Top bar with page title, search input, notification bell, and user avatar.

**`Footer`** — Four-column footer with brand info, quick links, services, and contact details.

### Card Components

**`FeatureCard`** — Feature display card with icon, title, description. Framer Motion hover animation (lift + scale). Icon transitions to filled on hover.

**`DashboardCard`** — Clickable card with icon, value, title, subtitle. Color variants (primary, blue, orange, purple, red, teal). Wraps in React Router Link when `link` prop provided.

**`StatsCard`** — Statistics card with label, value, icon, and optional trend indicator.

**`MarketPriceCard`** — Crop price display with market name, price per quintal, and trend arrow (up/down with color).

### Functional Components

**`UploadCard`** — Dashed border upload area with icon, title, subtitle, and "Choose File" button.

**`OCRPreviewCard`** — Grid display of key-value pairs extracted from OCR. Green checkmark header.

**`MapPlaceholder`** — Styled gradient background with SVG landscape illustration. Ready for Leaflet integration.

**`WeatherCard`** — Blue gradient card with temperature, weather icon, humidity, wind speed, and sunrise time.

**`WaterCard`** — Cyan gradient card with usage percentage, progress bar, used/remaining liters.

**`AIAvatarCard`** — VALI assistant widget with avatar, online status, welcome message, chat input, and voice button.

**`NotificationCard`** — Notification list with alert/success/info icons and timestamps.

---

## Key Features

### Weather-Based Treatment Alerts

Disease Detection, Problem Solver, and Fertilizer pages include context-aware weather alerts:

- **Red alerts** — "Do NOT Spray Today" when rain is expected
- **Orange warnings** — Humidity/moisture conditions worsening the problem
- **Blue recommendations** — Best spraying window for the week
- **Weekly spray schedule** — Day-by-day plan with SAFE / NO SPRAY / MONITOR badges

### VALI AI Assistant

Virtual Agriculture & Land Intelligence assistant with:
- Smart keyword-based responses (water, weather, crops, market, disease)
- Typing animation with bouncing dots
- Suggested question chips
- Voice button UI (placeholder for Web Speech API)

### Smart Land Registration Wizard

4-step guided flow:
1. Upload ROR 1B and FMB Sketch documents
2. Review AI-extracted information (Owner, Survey, Khata, Village, Area, District, State)
3. Pin farm location on interactive map
4. Complete farm registration form

### Fertilizer Guide

- Weather-aware spray alerts with real-time conditions
- Crop-specific fertilizer plan (Urea, DAP, MOP, Zinc)
- Spray safety guide (SAFE vs DO NOT SPRAY for each chemical)
- Organic alternatives (Vermicompost, Neem Cake, Panchagavya, Jeevamrutham)

---

## Design System

### Theme

- **Primary**: `#16a34a` (Green)
- **Primary Dark**: `#15803d`
- **Primary Light**: `#22c55e`
- **Accent**: `#86efac` (Light Green)
- **Surface**: `#f0fdf4`

### Design Tokens (Tailwind)

```css
--color-primary: #16a34a;
--color-primary-dark: #15803d;
--color-primary-light: #22c55e;
--color-accent: #86efac;
--color-surface: #f0fdf4;
--color-surface-dark: #dcfce7;
```

### Design Principles

- Glassmorphism (semi-transparent backgrounds with blur)
- Rounded cards (`rounded-2xl`)
- Soft shadows (`shadow-sm`, `shadow-lg`)
- Smooth hover transitions
- Responsive grid layouts (mobile-first)
- Framer Motion page animations

---

## Deployment

### GitHub Pages (Current)

- **URL**: https://ayeshabegummulla23.github.io/agrivism-frontend/
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`)
- **Trigger**: Push to `main` branch
- **Config**: `base: '/agrivism-frontend/'` in `vite.config.js`

### Render

- `render.yaml` configured for static site deployment
- Build command: `npm install && npm run build`
- Publish directory: `dist`

### Local Build & Serve

```bash
npm install
npm run build
npx serve dist
```

---

## Future Integration Points

The frontend is structured for easy backend integration:

| Service | Directory | Status |
|---|---|---|
| FastAPI Backend | `src/services/` | Ready for API calls |
| OCR Engine | `src/pages/RegisterFarm.jsx` | Mock data in place |
| AI/ML Models | `src/pages/DiseaseDetection.jsx`, `ProblemSolver.jsx` | Mock predictions |
| Leaflet Maps | `src/components/MapPlaceholder.jsx` | Placeholder ready |
| Weather API | `src/pages/Weather.jsx` | Mock data in place |
| Market API | `src/pages/MarketPrices.jsx` | Mock data in place |
| Gemini AI Chat | `src/pages/AIAssistant.jsx` | Keyword responses ready |

All mock data is clearly marked with comments for easy replacement with real API calls.

---

## License

Built by **VimSha AI**. All rights reserved.
