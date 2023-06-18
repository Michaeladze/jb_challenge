import React, { useContext } from 'react';
import './Table.css';
import { TableElement } from '../TableElement';
import { TOCContext } from '../TableOfContents/TableOfContents.tsx';

export const Table: React.FC = () => {

  const { elements, filterByQuery, filterByExpand } = useContext(TOCContext);

  const tableJSX = elements
    .filter((element: IPageMeta) => filterByQuery[element.id] && filterByExpand[element.id])
    .map((element: IPageMeta) => {
      return <TableElement key={element.id} element={element} />;
    });

  // -------------------------------------------------------------------------------------------------------------------


  return (
    <ul>
      {tableJSX}
    </ul>
  );
};
