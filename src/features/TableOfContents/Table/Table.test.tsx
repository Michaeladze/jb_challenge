import React from 'react';

import { render } from '@testing-library/react';

import { Table } from './Table';

describe('Test Table component', () => {

  it('should render Table component', () => {
    const { container } = render(<Table />);
  });

});
