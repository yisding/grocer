export interface Deal {
  store: string;
  product: string;
  price: number;
  unit: string;
}

export function buildPrompt(adText: string): string {
  return `Extract deals from: ${adText}`;
}

export async function parseResponse(json: string): Promise<Deal[]> {
  return JSON.parse(json) as Deal[];
}

export async function processAd(adText: string): Promise<Deal[]> {
  const prompt = buildPrompt(adText);
  const fakeApiResponse = JSON.stringify([
    { store: 'Test Store', product: 'Milk', price: 1.99, unit: 'each' },
  ]);
  const deals = await parseResponse(fakeApiResponse);
  return deals;
}
