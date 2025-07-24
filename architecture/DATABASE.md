# Database Structure

Grocer uses Firebase Firestore to store sales data, user profiles, and price
comparison results. This document outlines the collections and fields so new
developers can work with the database confidently.

## 1. Collections Overview

- `users` – Registered users and their preferences.
- `deals` – Individual sale items extracted from grocery ads.
- `priceChecks` – Records of online price comparisons for each deal.

## 2. `users` Collection

| Field          | Type     | Description                                   |
|----------------|----------|-----------------------------------------------|
| `uid`          | string   | Firebase Auth user ID (document ID)           |
| `email`        | string   | User email address                            |
| `favorites`    | string[] | Optional list of favorite stores or products  |
| `createdAt`    | timestamp| Account creation time                         |

### Security Rules

- Users can read and write only their own document (`request.auth.uid ==
  resource.id`).
- Validate that `favorites` is an array of strings.

## 3. `deals` Collection

| Field        | Type      | Description                                    |
|--------------|-----------|------------------------------------------------|
| `store`      | string    | Name of the grocery store                      |
| `product`    | string    | Product name                                   |
| `price`      | number    | Sale price (e.g., 2.99)                        |
| `unit`       | string    | Unit of measure (e.g., per pound, per item)    |
| `validFrom`  | timestamp | Start date of the sale                         |
| `validTo`    | timestamp | End date of the sale                           |
| `createdAt`  | timestamp | When this deal was added                       |

### Suggested Indexes

- Index on `store` and `validTo` for quick queries by store and current sales.
- Composite index on `product` and `price` to enable price-based filtering.

## 4. `priceChecks` Collection

| Field       | Type      | Description                                    |
|-------------|-----------|------------------------------------------------|
| `dealId`    | string    | Reference to the related deal document         |
| `onlineUrl` | string    | URL of the online listing used for comparison  |
| `onlinePrice` | number  | Price found online                             |
| `savingsPct` | number   | Percentage savings compared to online price    |
| `checkedAt` | timestamp | When the price comparison ran                   |

### Data Relationships

- Use the `dealId` field to link `priceChecks` with items in the `deals`
  collection. This allows for easy lookups when displaying "worth buying" tags.

## 5. Usage Tips

- Use server timestamps (`FieldValue.serverTimestamp()`) to populate `createdAt`
  and other date fields automatically.
- Keep document sizes small; if a deal has a lot of historical price checks,
  store them in a separate subcollection rather than a long array.
- Regularly review Firestore usage metrics to stay within free tier limits or
  adjust indexes as needed.

This schema provides a clear structure while leaving room to expand as new
features are introduced.
