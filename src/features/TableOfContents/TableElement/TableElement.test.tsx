import React from 'react';

import { render } from '@testing-library/react';

import { TableElement } from './TableElement';

describe('Test TableElement component', () => {

  it('should render TableElement component', () => {
    const { container } = render(<TableElement />);
  });

});
