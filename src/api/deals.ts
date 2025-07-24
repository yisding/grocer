import { Deal } from '../services/llm';

export async function getDeals(): Promise<Deal[]> {
  return [
    { store: 'Store A', product: 'Bread', price: 2.5, unit: 'each' },
  ];
}
