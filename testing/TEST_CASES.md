# Test Cases

This document enumerates individual test cases derived from the overall testing strategy. Each case should be implemented using Jest, React Testing Library, Supertest, or Playwright as appropriate.

## Backend

### Ad Retrieval Service
1. **Fetch nearby stores successfully**
   - *Given* a location
   - *When* `getNearbyStores` is called
   - *Then* it returns a list of stores
2. **Handle network failures during store lookup**
   - *When* the external API returns an error
   - *Then* the function throws or returns a controlled error
3. **Download and normalize ads**
   - *When* `downloadAd` receives an ad URL
   - *Then* the ad contents are saved in a normalized format
4. **Scheduler stores deals in Firestore**
   - *When* the scheduled job runs
   - *Then* deals are written to the emulator database

### LLM Processing
5. **Create correct prompt for LLM**
   - *Given* ad text
   - *When* the wrapper builds a prompt
   - *Then* the prompt matches the expected template
6. **Parse LLM response into Deal objects**
   - *Given* a mocked API response
   - *Then* the wrapper returns an array of `Deal` objects
7. **Process full pipeline**
   - *When* raw ad text is passed through the pipeline
   - *Then* structured deals are stored in Firestore

### Database Layer
8. **CRUD helpers create documents**
   - *When* a helper writes a deal
   - *Then* the document exists in the emulator with correct fields
9. **CRUD helpers read documents**
   - *When* a deal is requested
   - *Then* the correct data is returned

### Price Comparison Service
10. **Calculate savings percentage**
    - *Given* a local price and an online price
    - *Then* the service returns the correct savings percentage
11. **Flag worthwhile deals**
    - *When* savings exceed the threshold
    - *Then* the deal is marked as worth buying

### Recommendation Engine
12. **Score deals**
    - *When* deals with varying prices and popularity are scored
    - *Then* results are sorted from best to worst

### API Routes
13. **GET /api/deals returns deals**
    - *When* called without filters
    - *Then* it responds with a list of deals
14. **POST /api/scan triggers pipeline**
    - *Then* the endpoint responds with 202 and the scheduler runs
15. **POST /api/compare updates price checks**
    - *Then* the endpoint updates savings information for deals

## Frontend

### React Components
16. **DealCard renders basic info**
    - *Given* a deal object
    - *When* the component is rendered
    - *Then* product name and price are visible
17. **Filters component updates list**
    - *When* a filter is selected
    - *Then* only matching deals are displayed

### Pages
18. **Deals page fetches and displays data**
    - *When* the page loads
    - *Then* it fetches deals and shows them in a list

### End-to-End
19. **User can sign in and view deals**
    - *When* navigating through the sign-in flow
    - *Then* the deals page loads with user-specific data
20. **User can mark a deal as favorite**
    - *When* clicking the favorite button
    - *Then* the deal appears in the user's favorites list

