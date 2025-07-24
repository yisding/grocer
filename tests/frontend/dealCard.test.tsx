import React from 'react';
import { render, screen } from '@testing-library/react';
import { DealCard } from '../../src/components/DealCard';
import { Deal } from '../../src/services/llm';

describe('DealCard', () => {
  it('renders product name and price', () => {
    const deal: Deal = { store: 'A', product: 'Milk', price: 1.5, unit: 'each' };
    render(<DealCard deal={deal} />);
    expect(screen.getByText('Milk')).toBeInTheDocument();
    expect(screen.getByText('$1.50')).toBeInTheDocument();
  });
});
