import React from 'react';

import { render } from '@testing-library/react';

import { TableOfContents } from './TableOfContents';

describe('Test TableOfContents component', () => {

  it('should render TableOfContents component', () => {
    const { container } = render(<TableOfContents />);
  });

});
