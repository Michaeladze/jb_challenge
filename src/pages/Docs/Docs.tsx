import React from 'react';

import './Docs.css';
import { useQuery } from '@tanstack/react-query';
import { getTableOfContents } from '../../services/documentation.ts';
import { TableOfContents, TableShimmer } from './features/TableOfContents';
import Content from './features/TableOfContents/Content';


export const Docs: React.FC = () => {

  const { data, error, isLoading } = useQuery(['getTableOfContents'], getTableOfContents);

  // -------------------------------------------------------------------------------------------------------------------


  return (
    <div className='docs'>
      <aside className='docs__aside'>
        { isLoading ? <TableShimmer/> : <TableOfContents table={data}/> }
      </aside>
      <div className='docs__outlet'>
        <Content/>
      </div>
    </div>
  );
};
