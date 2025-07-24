import { getNearbyStores, downloadAd } from './adRetrieval';
import { processAd, Deal } from './llm';
import { writeDeal } from './database';

export async function runScheduler() {
  const stores = await getNearbyStores('90210');
  for (const store of stores) {
    const ad = await downloadAd(store.url);
    const deals = await processAd(ad);
    for (const [i, deal] of deals.entries()) {
      await writeDeal(`${store.name}-${i}`, deal);
    }
  }
}
