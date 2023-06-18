import React from 'react';

import { render } from '@testing-library/react';

import { Docs } from './Docs';

describe('Test Docs component', () => {

  it('should render Docs component', () => {
    const { container } = render(<Docs />);
  });

});
