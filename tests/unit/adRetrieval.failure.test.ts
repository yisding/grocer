import { getNearbyStores } from '../../src/services/adRetrieval';

describe('getNearbyStores failure', () => {
  it('throws on network error', async () => {
    await expect(getNearbyStores('90210', true)).rejects.toThrow('network error');
  });
});
