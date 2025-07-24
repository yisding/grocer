import { writeDeal, readDeal, __clearDb } from '../../src/services/database';
import { Deal } from '../../src/services/llm';

describe('database helpers', () => {
  beforeEach(() => __clearDb());

  it('creates documents', async () => {
    const deal: Deal = { store: 'S', product: 'P', price: 1, unit: 'each' };
    await writeDeal('1', deal);
    const stored = await readDeal('1');
    expect(stored).toEqual(deal);
  });
});
