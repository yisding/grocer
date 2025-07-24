import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { DealsPage } from '../../src/pages/DealsPage';

jest.mock('../../src/api/deals', () => ({
  getDeals: () => Promise.resolve([{ store: 'S', product: 'Eggs', price: 2, unit: 'each' }]),
}));

describe('DealsPage', () => {
  it('fetches and displays deals', async () => {
    render(<DealsPage />);
    await waitFor(() => screen.getByText('Eggs'));
    expect(screen.getByText('Eggs')).toBeInTheDocument();
  });
});
