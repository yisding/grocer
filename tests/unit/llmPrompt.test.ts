import { buildPrompt } from '../../src/services/llm';

describe('LLM prompt', () => {
  it('creates the correct template', () => {
    const text = buildPrompt('ad text');
    expect(text).toContain('Extract deals from: ad text');
  });
});
