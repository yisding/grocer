# Grocer

This project is a conceptual design for a Next.js application that automatically aggregates nearby grocery store ads, extracts sales information with a language model, stores the data in Firebase, and highlights deals that are cheaper than typical online prices.

## Architecture Overview

1. **Next.js Web Application**
   - Provides the user-facing interface with React components and server-side rendering.
   - Utilizes Next.js API routes or serverless functions to handle backend logic.

2. **Ad Retrieval Service**
   - Scheduled process (e.g., cron job or serverless function) that fetches digital or PDF ads from local grocery stores.
   - Location is determined from user preferences or IP geolocation to pull nearby stores only.

3. **LLM Processing**
   - Ads are fed into a large language model (via an external API such as OpenAI) to parse product names, quantities, and sale prices.
   - Extracted data is normalized into a structured format.

4. **Firebase Firestore Database**
   - Stores parsed sale information including store, product, price, and sale dates.
   - Facilitates real-time updates and synchronization for the Next.js client.

5. **Price Comparison Service**
   - Compares extracted sale prices to known online prices using third-party APIs or web scraping.
   - Determines which items are significantly cheaper locally and labels them as "worth buying."  

6. **Deal Recommendation Engine**
   - Uses business logic (e.g., historical prices or price drop percentage) to highlight top deals.
   - Results are surfaced in the user interface with filtering and sorting options.

## Key Features

- **Automatic Ad Aggregation**: Detects and downloads weekly ads from nearby grocery stores without user intervention.
- **LLM-Powered Extraction**: Leverages a language model to parse unstructured ad content into structured product entries.
- **Firebase Integration**: Stores and syncs deals across user sessions with secure authentication.
- **Deal Finder**: Compares local sale prices with online retailers to recommend cost-effective purchases.
- **Responsive Web UI**: Built with Next.js and React for a modern, mobile-friendly experience.

## Future Enhancements

- Push notifications for newly detected deals.
- Budget tracking and shopping list integration.
- User feedback loop for improving extraction accuracy.

## Development Plan

The following high-level roadmap outlines the steps required to implement the
project. Each stage should include code reviews, automated tests, and clear
documentation to meet professional engineering standards.

1. **Project Setup**
   - Initialize a Next.js application using TypeScript (`create-next-app` with
     the `--typescript` flag).
   - Configure ESLint and Prettier for consistent code style. Enforce formatting
     with a pre-commit hook via Husky.
   - Establish a monorepo or organized folder structure for "web" and
     serverless functions if needed.
   - Set up a GitHub Actions workflow (or similar CI) to run linting and tests
     on each pull request.

2. **Core Services**
   - **Ad Retrieval Service**: Build a module that periodically downloads ads
     from nearby stores. Start with open APIs or screen-scraping using libraries
     like Cheerio. Abstract network calls so they can be mocked in tests.
   - **LLM Processing**: Integrate with a language-model API. Create a thin
     wrapper that handles retries, logging, and cost monitoring. Unit-test the
     parsing logic using sample ad content.
   - **Database Layer**: Set up Firebase Firestore with strict security rules.
     Define TypeScript interfaces for stored objects and centralize all database
     interactions in a dedicated module.

3. **Backend Logic**
   - Implement Next.js API routes (or serverless functions) that coordinate ad
     retrieval, invoke the LLM, and write parsed data to Firestore.
   - Add a price comparison utility that looks up online prices from third-party
     APIs. Plan for rate limiting and potential API failures.
   - Develop a recommendation engine that scores each item based on price
     savings and user preferences.

4. **Frontend Features**
   - Build authentication flows using Firebase Auth. Protect sensitive routes
     and ensure users can manage their profile data.
   - Create responsive pages to display deals, using React components with
     TypeScript props and state. Provide filters for store, category, and price.
   - Surface "worth buying" recommendations with clear explanations of the
     savings.

5. **Testing and Quality Assurance**
   - Write unit tests with Jest and integration tests with React Testing Library
     or Cypress for critical user flows.
   - Use mock services for the LLM and external price APIs to keep tests fast and
     deterministic.
   - Maintain high test coverage and enforce it through the CI pipeline.

6. **Deployment and Monitoring**
   - Deploy the Next.js application to Vercel or a similar platform, storing
     API keys and Firebase credentials in environment variables.
   - Set up logging and error reporting (e.g., using Sentry) for serverless
     functions and client-side code.
   - Monitor Firestore usage and LLM costs, adding alerts for unusual spikes.

7. **Iteration and Future Work**
   - After the MVP is stable, implement the features listed in the "Future
     Enhancements" section.
   - Continuously refine extraction accuracy and recommendation rules based on
     real user feedback and metrics.

