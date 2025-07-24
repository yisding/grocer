import { getDeals } from '../../src/api/deals';
import { triggerScan } from '../../src/api/scan';
import { comparePrices } from '../../src/api/compare';

describe('api routes', () => {
  it('GET /api/deals returns deals', async () => {
    const deals = await getDeals();
    expect(deals.length).toBeGreaterThan(0);
  });

  it('POST /api/scan triggers pipeline', async () => {
    const status = await triggerScan();
    expect(status).toBe(202);
  });

  it('POST /api/compare updates price checks', async () => {
    const result = await comparePrices();
    expect(result.updated).toBe(true);
  });
});
