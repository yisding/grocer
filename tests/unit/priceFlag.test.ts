import { isWorthBuying } from '../../src/services/priceComparison';

describe('price comparison flag', () => {
  it('flags deals above threshold', () => {
    expect(isWorthBuying(5, 10, 40)).toBe(true);
  });
});
