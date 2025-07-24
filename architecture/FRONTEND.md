# Frontend Architecture

This guide outlines how to build the user interface of Grocer using Next.js and
React. The goal is to make the code easy to read and extend, so new developers
can contribute quickly.

## 1. Project Setup

- Start the app using `npx create-next-app@latest --typescript`.
- Organize the `pages/` directory for routing, keeping API routes under
  `pages/api/`.
- Add ESLint and Prettier configurations for consistent style. Use Husky to run
  `npm run lint` on each commit.

## 2. Page Structure

- **Home Page (`/`)**
  - Introduces the app and prompts users to sign in.
  - Displays featured deals for quick access.
- **Deals Page (`/deals`)**
  - Shows a list of deals pulled from Firestore via server-side rendering (SSR)
    or React hooks.
  - Offers filters by store, category, and price range.
- **Account Page (`/account`)**
  - Lets users manage preferences and enable notifications.

## 3. Authentication

- Use Firebase Auth with Google or email/password providers.
- Protect sensitive pages with a higher-order component or middleware that checks
  the user's auth status.
- Store auth tokens in `localStorage` or cookies (using Next.js
  `getServerSideProps`) to keep sessions active across page loads.

## 4. State Management

- Start with React context or simple hooks to manage global state.
- For larger features, consider a state library like Redux Toolkit, but keep it
  minimal for the MVP.
- Use SWR or React Query for data fetching and caching.

## 5. Component Organization

- Place reusable UI components under `components/`.
- Keep components small and focused; break complex screens into smaller pieces.
- Write components in TypeScript with clearly defined props.

## 6. Styling

- Use CSS modules or a utility-first framework like Tailwind CSS for styling.
- Maintain a consistent color palette and spacing scale in a central file (e.g.,
  `styles/theme.ts`).

## 7. Testing

- Use Jest and React Testing Library for unit and integration tests.
- Test key user flows such as logging in and viewing deals.
- Run tests in CI to ensure new code doesn't break existing functionality.

## 8. Performance Considerations

- Use dynamic imports for heavy components to reduce bundle size.
- Enable image optimization for store logos and ad images with Next.js built-in
  features.
- Monitor performance using Lighthouse and fix any issues flagged by audits.

With these guidelines, the frontend remains maintainable and approachable for an
SDE 1. Clear separation of pages, components, and styles helps new developers
understand the project quickly.

---

## Pseudocode Examples

```tsx
// pages/index.tsx
export default function HomePage() {
  const { data: deals } = useFeaturedDeals()
  return (
    <Layout>
      <Hero />
      <DealList deals={deals} />
    </Layout>
  )
}
```

```tsx
// pages/deals.tsx
export default function DealsPage() {
  const [filters, setFilters] = useState<DealFilters>({})
  const { data: deals } = useDeals(filters)
  return (
    <Layout>
      <DealsFilter value={filters} onChange={setFilters} />
      <DealList deals={deals} />
    </Layout>
  )
}
```

```tsx
// components/DealCard.tsx
export function DealCard({ deal }: { deal: Deal }) {
  return (
    <div className="card">
      <h3>{deal.product}</h3>
      <p>{formatPrice(deal.price)}</p>
      {deal.worthBuying && <span>Worth buying!</span>}
    </div>
  )
}
```

```tsx
// context/AppProvider.tsx
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}
```
