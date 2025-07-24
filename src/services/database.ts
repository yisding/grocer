import { Deal } from './llm';

const db: Record<string, Deal> = {};

export function __clearDb() {
  for (const key of Object.keys(db)) {
    delete db[key];
  }
}

export function __getDb() {
  return db;
}

export async function writeDeal(id: string, deal: Deal): Promise<void> {
  db[id] = deal;
}

export async function readDeal(id: string): Promise<Deal | null> {
  return db[id] || null;
}
