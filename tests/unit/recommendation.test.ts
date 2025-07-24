import { scoreDeals } from '../../src/services/recommendation';
import { Deal } from '../../src/services/llm';

describe('recommendation engine', () => {
  it('scores and sorts deals', () => {
    const deals: Deal[] = [
      { store: 'S', product: 'A', price: 3, unit: 'each' },
      { store: 'S', product: 'B', price: 1, unit: 'each' },
    ];
    const sorted = scoreDeals(deals);
    expect(sorted[0].price).toBeLessThanOrEqual(sorted[1].price);
  });
});
