export default () => {
    return {
        init: `import React, {
  FC, PropsWithChildren, ReactElement, ReactNode
} from 'react';

import { EnhancedStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { Route, Routes } from 'react-router-dom';

export const renderWithStore = (store: EnhancedStore, ui: ReactElement) => {
  const Wrapper: FC<PropsWithChildren<Record<string, unknown>>> = ({ children }) => (
    <Provider store={store}>
      { children }
    </Provider>
  );

  // @ts-ignore
  const utils = render(ui, { wrapper: Wrapper });
  return { ...utils, };
};

/** For testing within setup function */
export const testWithRouter = (path: string, initialEntries: string, element: ReactNode) => {
  return (
    <MemoryRouter initialEntries={[initialEntries]}>
      <Routes>
        <Route element={element} path={path}/>
      </Routes>
    </MemoryRouter>
  );
};

/** For testing without setup function */
export const renderWithRouter = (path: string, initialEntries: string, element: ReactNode) => {
  return render(testWithRouter(path, initialEntries, element));
};
`,
        updates: []
    };
};
