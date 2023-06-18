import React, { ReactNode } from 'react';

import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router';
import {
  Route,
  Routes
} from 'react-router-dom';


export const testWithRouter = (path: string, initialEntries: string, element: ReactNode) => {
  return (
    <MemoryRouter initialEntries={[initialEntries]}>
      <Routes>
        <Route element={element} path={path}/>
      </Routes>
    </MemoryRouter>
  );
};

export const renderWithRouter = (path: string, initialEntries: string, element: ReactNode) => {
  return render(testWithRouter(path, initialEntries, element));
};
