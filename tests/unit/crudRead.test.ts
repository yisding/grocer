import { readDeal, __clearDb } from '../../src/services/database';

describe('database read', () => {
  beforeEach(() => __clearDb());

  it('returns null for missing deal', async () => {
    const deal = await readDeal('missing');
    expect(deal).toBeNull();
  });
});
