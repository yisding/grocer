import React from 'react';
import { Deal } from '../services/llm';

export function DealCard({ deal }: { deal: Deal }) {
  return (
    <div>
      <h2>{deal.product}</h2>
      <span>${deal.price.toFixed(2)}</span>
    </div>
  );
}
