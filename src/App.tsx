import React, { useEffect, useState } from 'react';
import './App.css';
import Axios, { AxiosResponse } from 'axios';
import { TableOfContents } from './features/TableOfContents';

export const App = () => {

  const [table, setTable] = useState<IContents | null>(null);

  useEffect(() => {
    const url = 'http://localhost:3000/contents';

    Axios.get(url).then((response: AxiosResponse<IContents>) => {
      console.log(response.data);
      setTable(response.data);
    });

  }, []);

  return (
    <div className='app'>
      { table && <TableOfContents table={table}/> }
    </div>

  );
};
