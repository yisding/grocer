# Backend Architecture

This document describes the backend services used in the Grocer application. The
backend is primarily built with Next.js API routes but may also leverage
serverless functions for background processing.

## 1. Ad Retrieval Service

- **Purpose**: Periodically download weekly grocery ads from nearby stores.
- **Implementation**:
  - Use a scheduled job (e.g., cron job or serverless scheduler) that runs every
    week or day.
  - Fetch digital ads via open APIs or scrape PDF/HTML content using libraries
    like Cheerio.
  - Normalize ad sources into a consistent format before passing to the LLM.
- **Testing**:
  - Abstract network calls into their own modules so they can be mocked.
  - Write Jest tests for success and failure scenarios.

## 2. LLM Processing

- **Purpose**: Convert raw ad text or images into structured sale data.
- **Implementation**:
  - Send ad contents to a large language model API (e.g., OpenAI) with a prompt
    instructing it to output JSON containing product names, units, prices, and
    sale dates.
  - Validate the LLM output against TypeScript interfaces before writing to the
    database.
  - Log all requests and responses for debugging and cost monitoring.
- **Testing**:
  - Provide sample ads to the LLM wrapper in unit tests.
  - Mock LLM API calls to keep tests deterministic and inexpensive.

## 3. Database Layer

- **Purpose**: Store parsed deals, user profiles, and price comparison results in
  Firebase Firestore.
- **Implementation**:
  - Use the Firebase Admin SDK within API routes and serverless functions.
  - Centralize all database reads and writes in a dedicated module (see
    `architecture/DATABASE.md` for schema details).
  - Enforce strict TypeScript types to catch data inconsistencies.
- **Testing**:
  - Use the Firebase emulator for local development and tests.
  - Write integration tests that populate mock data and verify business logic.

## 4. Price Comparison Service

- **Purpose**: Determine whether local sale prices beat typical online pricing.
- **Implementation**:
  - Query third-party APIs or scrape major online retailers for current prices.
  - Compare those prices to the LLM-extracted sale data.
  - Tag deals that exceed a configured savings threshold.
- **Testing**:
  - Mock external API calls and validate the comparison logic with unit tests.

## 5. Recommendation Engine

- **Purpose**: Rank deals so users can quickly see worthwhile purchases.
- **Implementation**:
  - Calculate a score based on percentage savings, product popularity, and user
    preferences.
  - Sort deals and expose the results through an API endpoint consumed by the
    frontend.
- **Testing**:
  - Write tests for the scoring algorithm with various input conditions.

## 6. API Routes

- **Endpoints**:
  - `GET /api/deals` – Returns current deals with optional filters.
  - `POST /api/scan` – Triggers the ad retrieval and LLM processing pipeline.
  - `POST /api/compare` – Runs price comparison for existing deals.
- **Implementation Notes**:
  - Use TypeScript for all route handlers.
  - Authenticate sensitive routes using Firebase Auth tokens.

This backend design keeps core logic isolated and testable. Each service can be
worked on independently, making it straightforward for an SDE 1 to implement and
extend.

---

## Pseudocode Examples

```ts
// cron/adRetrieval.ts
export async function fetchAds() {
  const stores = await getNearbyStores()
  for (const store of stores) {
    const ad = await downloadAd(store.url)
    const deals = await parseAdWithLLM(ad)
    await saveDeals(store.name, deals)
  }
}
```

```ts
// llm/parseAd.ts
export async function parseAdWithLLM(ad: string): Promise<Deal[]> {
  const prompt = buildPrompt(ad)
  const res = await openai.chat(prompt)
  return parseResponse(res)
}
```

```ts
// db/deals.ts
export async function saveDeals(store: string, deals: Deal[]) {
  const batch = firestore.batch()
  deals.forEach(d => {
    const ref = firestore.collection('deals').doc()
    batch.set(ref, { ...d, store, createdAt: Date.now() })
  })
  await batch.commit()
}
```

```ts
// price/compare.ts
export async function comparePrices(deal: Deal): Promise<number> {
  const online = await lookupOnlinePrice(deal.product)
  const savingsPct = ((online - deal.price) / online) * 100
  await firestore.collection('priceChecks').add({
    dealId: deal.id,
    onlinePrice: online,
    savingsPct,
    checkedAt: Date.now()
  })
  return savingsPct
}
```

```ts
// api/deals.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const deals = await fetchDeals(req.query)
    res.status(200).json(deals)
  } else if (req.method === 'POST') {
    await fetchAds()
    res.status(202).end()
  }
}
```
