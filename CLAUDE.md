# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server at http://localhost:5173
npm run build     # TypeScript check + production build (output: dist/)
npm run preview   # Preview production build locally
npm run lint      # ESLint check across all .ts/.tsx files
```

## Architecture Overview

**SkillMatrix Pro** is a React 18 + TypeScript enterprise SaaS frontend for talent assessments (iMocha-inspired).

### Data Flow
```
Pages → Hooks (TanStack Query) → API layer (mock delay) → Mock data (src/api/mock/data.ts)
Pages → Components → Zustand stores (auth, ui, notifications)
```

### Key Directories

| Path | Purpose |
|------|---------|
| `src/api/` | All API calls; `mock/data.ts` holds all static seed data; `client.ts` has shared `applyFilters` / `paginatedResult` helpers |
| `src/store/` | Three Zustand stores: `authStore` (session), `uiStore` (sidebar, dark mode), `notificationStore` |
| `src/hooks/` | TanStack Query wrappers per domain (`useDashboard`, `useAssessments`, `useCandidates`, `useAnalytics`) + `use-toast` |
| `src/components/ui/` | ShadCN-style primitive components built on Radix UI |
| `src/components/layout/` | `AppLayout` (auth guard + sidebar + topnav), `AuthLayout` (guest guard) |
| `src/pages/` | Route-level page components (lazy loaded) |
| `src/types/index.ts` | All TypeScript interfaces/types |

### Authentication
- Zustand `authStore` persists user + token to `localStorage` via the `persist` middleware.
- Demo credentials: **admin@skillmatrix.pro / Admin123!** (defined in `src/lib/constants.ts`).
- `AppLayout` redirects to `/login` if no user; `AuthLayout` redirects to `/dashboard` if logged in.

### Mock API Layer
All API functions in `src/api/*.ts` call `mockDelay()` (random 300–700ms) then operate on in-memory arrays cloned from `src/api/mock/data.ts`. Mutating functions (`createAssessment`, `deleteAssessment`, etc.) update the local module-level array so data persists for the session.

### Dark Mode
Managed by `useUIStore.darkMode`. Toggling calls `document.documentElement.classList.toggle('dark', value)`. Tailwind uses `darkMode: ['class']`. State is persisted via `zustand/middleware/persist`; the `onRehydrateStorage` callback re-applies the class on page load.

### Routing
`src/router/index.tsx` — all page components are lazy-loaded via `React.lazy`. The router tree is:
- `/` → redirect to `/dashboard`
- `/login` — public (AuthLayout)
- `/dashboard`, `/assessments`, `/candidates`, `/analytics`, `/settings`, `/status` — protected (AppLayout)

### Charts
All charts use **Recharts**. `useUIStore` dark mode state is read inside chart components to switch `gridColor` and `textColor`. Chart color constants live in `src/lib/constants.ts → CHART_COLORS`.

### Component Patterns
- `PageHeader` — consistent title/description + action buttons, animated with Framer Motion.
- `StatusBadge` — maps status strings to `Badge` variants via `STATUS_MAP`.
- `EmptyState` — used when queries return empty results.
- `LoadingSpinner` / `PageLoader` / `SkeletonCard` — three loading state variants.
- Toasts: call `toast({ title, description, variant })` from `@/hooks/use-toast` anywhere.
