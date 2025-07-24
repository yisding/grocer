import React from 'react';

export function Filters({ onSelect }: { onSelect: (value: string) => void }) {
  return (
    <select data-testid="filter" onChange={e => onSelect(e.target.value)}>
      <option value="all">All</option>
      <option value="fruit">Fruit</option>
    </select>
  );
}
