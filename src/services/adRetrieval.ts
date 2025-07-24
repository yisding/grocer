export interface Store {
  name: string;
  url: string;
}

/**
 * Fetch a list of nearby grocery stores. This is a placeholder
 * implementation that would normally call an external API.
 */
export async function getNearbyStores(_location: string, fail = false): Promise<Store[]> {
  if (fail) {
    throw new Error('network error');
  }
  // TODO: replace with real HTTP call
  return [
    { name: 'Store A', url: 'https://example.com/adA' },
    { name: 'Store B', url: 'https://example.com/adB' },
  ];
}

/**
 * Download an advertisement from the provided URL.
 * This stub simply returns placeholder text.
 */
export async function downloadAd(url: string): Promise<string> {
  // TODO: replace with HTTP download logic
  return `ad text for ${url}`;
}
