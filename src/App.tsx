import React from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import { routes } from './router';

export const App = () => {

  const router = useRoutes(routes);

  return (
    <div className='app'>
      { router }
    </div>

  );
};
