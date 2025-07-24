import { Deal } from './llm';

export function scoreDeals(deals: Deal[]): Deal[] {
  return deals.slice().sort((a, b) => a.price - b.price);
}
