import { getNearbyStores } from '../../src/services/adRetrieval';

describe('getNearbyStores', () => {
  it('returns a list of stores for a location', async () => {
    const stores = await getNearbyStores('90210');
    expect(stores.length).toBeGreaterThan(0);
    expect(stores[0]).toHaveProperty('name');
    expect(stores[0]).toHaveProperty('url');
  });
});
