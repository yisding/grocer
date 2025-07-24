import { parseResponse } from '../../src/services/llm';

describe('LLM parse', () => {
  it('returns Deal objects', async () => {
    const json = JSON.stringify([{ store: 'S', product: 'P', price: 1, unit: 'each' }]);
    const deals = await parseResponse(json);
    expect(deals[0].product).toBe('P');
  });
});
