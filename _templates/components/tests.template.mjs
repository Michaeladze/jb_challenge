/** @type {import('../index').CreatorAnswersFunction} */
const template = ({ components: { componentName, componentDetails }, redux, components_reducer }) => {

  const hasChildren = componentDetails.includes('children');

  const component = hasChildren ? `<${componentName}> 
<div/>
</${componentName}>` : `<${componentName} />`;

  const imports = [
  `import React from 'react'`,
  `import { render } from '@testing-library/react'`,
  `import { ${componentName} } from './${componentName}'`,
  ];

  if (redux) {
    imports.push(
    `import { renderWithStore } from '../../redux/test-utils';`,
    `import { configureStore, EnhancedStore } from '@reduxjs/toolkit';`,
    `import { ${redux.sliceName}Slice, initialState } from './redux/${redux.sliceName}/slice';`,
    )
  }



  const basicRenderTest = `it('should render ${componentName} component', () => {
    const { container } = render(${component});
  });`;

  const reduxRenderTest = !redux ? '' : `it('should render ${componentName} component', () => {
  const store: EnhancedStore = configureStore({
    reducer: ${redux.sliceName}Slice.reducer,
    preloadedState: initialState
  });

  renderWithStore(store, ${component});
});`

  const tests = [];

  if (redux) {
    tests.push(reduxRenderTest);
  } else {
    tests.push(basicRenderTest);
  }

  const importsString = imports.join('\n');
  const testsString = tests.filter((s) => s !== '').join('\n\n');

  return {
    init: `${importsString}

describe('Test ${componentName} component', () => {

  ${testsString}
 
});
`
  };
};

export default template;
