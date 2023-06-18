import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card.tsx';

describe('Test Card component', () => {

  it('should render with correct text', () => {
    const text = 'test text';
    render(<Card>{text}</Card>);
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
