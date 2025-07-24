import React, { useEffect, useState } from 'react';
import { getDeals } from '../api/deals';
import { Deal } from '../services/llm';
import { DealCard } from '../components/DealCard';

export function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    getDeals().then(setDeals);
  }, []);

  return (
    <div>
      {deals.map((d, i) => (
        <DealCard key={i} deal={d} />
      ))}
    </div>
  );
}
