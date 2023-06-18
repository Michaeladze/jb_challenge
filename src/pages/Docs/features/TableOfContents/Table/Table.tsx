import React, { useContext } from 'react';
import './Table.css';
import { TableElement } from '../TableElement';
import { TOCContext } from '../TableOfContents/TableOfContents.tsx';
export const Table: React.FC = () => {

  const { filteredElements } = useContext(TOCContext);

  const tableJSX = filteredElements.map((element: IPageContent) => {
    return <TableElement key={element.id} element={element} />;
  });

  // -------------------------------------------------------------------------------------------------------------------


  return (
    <ul>
      {tableJSX}
    </ul>
  );
};
