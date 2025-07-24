import { savingsPercentage } from '../../src/services/priceComparison';

describe('price comparison', () => {
  it('calculates savings percentage', () => {
    expect(savingsPercentage(5, 10)).toBe(50);
  });
});
