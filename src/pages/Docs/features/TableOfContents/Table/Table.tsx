import React, {
  useContext, useEffect, useState
} from 'react';
import './Table.css';
import { TableElement } from '../TableElement';
import { TOCContext } from '../TableOfContents/TableOfContents.tsx';

export const Table: React.FC = () => {

  const { elements, visibleElements, filteredMap } = useContext(TOCContext);

  const [filteredElements, setFilteredElements] = useState<IPageContent[]>([]);

  useEffect(() => {
    setFilteredElements(elements.filter((element: IPageContent) => visibleElements[element.id] && filteredMap[element.id]));
  }, [elements, filteredMap, visibleElements]);

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
