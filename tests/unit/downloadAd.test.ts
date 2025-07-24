import { downloadAd } from '../../src/services/adRetrieval';

describe('downloadAd', () => {
  it('returns ad text for a URL', async () => {
    const text = await downloadAd('https://example.com/ad');
    expect(text).toMatch('https://example.com/ad');
  });
});
