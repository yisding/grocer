import { runScheduler } from '../../src/services/scheduler';
import { __getDb, __clearDb } from '../../src/services/database';

describe('scheduler', () => {
  beforeEach(() => __clearDb());

  it('stores deals in the database', async () => {
    await runScheduler();
    const db = __getDb();
    const keys = Object.keys(db);
    expect(keys.length).toBeGreaterThan(0);
  });
});
