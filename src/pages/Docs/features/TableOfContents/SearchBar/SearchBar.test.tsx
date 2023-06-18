import React from 'react';

import { render } from '@testing-library/react';

import { SearchBar } from './SearchBar';

describe('Test SearchBar component', () => {

  it('should render SearchBar component', () => {
    const { container } = render(<SearchBar />);
  });

});
