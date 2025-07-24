# Testing Strategy

This document outlines the test-driven development (TDD) plan for Grocer. Before implementing features we will write failing tests that describe the desired behaviour. The project uses TypeScript across the stack. A detailed list of planned tests can be found in `TEST_CASES.md`.

## 1. Tooling

- **Jest** – Unit tests for backend logic and React components. `ts-jest` will compile TypeScript.
- **React Testing Library** – Integration tests for React pages and components.
- **Supertest** – HTTP assertions against Next.js API routes.
- **Firebase Emulator** – Used in integration tests to verify database interactions.
- **Playwright** – End‑to‑end tests of critical user flows in a headless browser.

All tests will live under the `tests/` directory with subfolders for `unit`, `integration`, and `e2e`.

## 2. Backend Tests

### Ad Retrieval Service
- Unit test `getNearbyStores`, `downloadAd`, and ad normalization helpers using mocked HTTP requests.
- Integration test the scheduler that fetches multiple ads and stores deals in Firestore using the emulator.

### LLM Processing
- Unit test the LLM wrapper to ensure prompts are constructed correctly and responses are parsed into `Deal` objects. LLM API calls will be mocked.
- Integration test the full pipeline from raw ad text to stored deals.

### Database Layer
- Unit test CRUD helpers with the Firestore emulator to verify collections and fields match `architecture/DATABASE.md`.

### Price Comparison Service
- Unit test price comparison logic with mocked online price lookups.
- Integration test updating deals with savings percentages and flagging "worth buying" items.

### Recommendation Engine
- Unit tests for the scoring algorithm using various deal data scenarios.

### API Routes
- Integration tests for `/api/deals`, `/api/scan`, and `/api/compare` using Supertest. External dependencies (LLM, online price APIs) will be mocked.

## 3. Frontend Tests

### React Components
- Unit tests for small components such as `DealCard` and filters.

### Pages
- Integration tests with React Testing Library verifying that pages fetch and display deals correctly and respect filters.

### End-to-End
- Playwright scripts covering sign-in, viewing deals, and marking favorites. Runs against a local build using the Firebase emulator for data.

## 4. Continuous Integration

- GitHub Actions (or similar) will run `npm run lint` and all Jest/Playwright tests on each pull request.
- Coverage thresholds will be enforced to prevent regressions.

This plan ensures each feature starts with a clear set of tests, enabling TDD and giving confidence as the application grows.
