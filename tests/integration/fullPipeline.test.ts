import { processAd } from '../../src/services/llm';
import { writeDeal, readDeal, __clearDb } from '../../src/services/database';

describe('full pipeline', () => {
  beforeEach(() => __clearDb());

  it('processes raw ad text and stores deals', async () => {
    const deals = await processAd('ad');
    await writeDeal('1', deals[0]);
    const stored = await readDeal('1');
    expect(stored?.product).toBe(deals[0].product);
  });
});
