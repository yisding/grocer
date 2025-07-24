import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Filters } from '../../src/components/Filters';

describe('Filters', () => {
  it('calls onSelect when filter is chosen', () => {
    const onSelect = jest.fn();
    render(<Filters onSelect={onSelect} />);
    fireEvent.change(screen.getByTestId('filter'), { target: { value: 'fruit' } });
    expect(onSelect).toHaveBeenCalledWith('fruit');
  });
});
