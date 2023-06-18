import React, { lazy } from 'react';

import { RouteObject } from 'react-router-dom';

const Docs = lazy(() => import('../pages/Docs'));

export const routes: RouteObject[] = [
  {
    path: '/docs/*',
    element: <Docs />,
    children: [
      {
        path: ':page',
        element: <div />
      }
    ]
  },
];
