import React, {
  createContext,
  Dispatch, SetStateAction, useEffect, useMemo, useState
} from 'react';
import './TableOfContents.css';
import { SearchBar } from '../SearchBar';
import { Table } from '../Table';
import { buildTable } from '../buildTable.ts';
import { useParams } from 'react-router-dom';

interface IProps {
  table: IContents;
}

export interface ITOCContext {
  elements: IPageContent[];
  visibleElements: Record<number, boolean>;
  setVisibleElements: Dispatch<SetStateAction<Record<number, boolean>>>;
  filteredElements: IPageContent[];
  setFilteredElements: Dispatch<SetStateAction<IPageContent[]>>;
  activeElement: IPageContent | null;
  setActiveElement: Dispatch<SetStateAction<IPageContent | null>>;
}

export const TOCContext = createContext<ITOCContext>({
  elements: [],
  visibleElements: {},
  setVisibleElements: () => {},
  filteredElements: [],
  setFilteredElements: () => {},
  activeElement: null,
  setActiveElement: () => {}
});

export const TableOfContents: React.FC<IProps> = ({ table }: IProps) => {
  const { page } = useParams<{page: string}>();

  const elements: IPageContent[] = useMemo(() => buildTable(table), [table]);

  const [activeElement, setActiveElement] = useState<IPageContent | null>(null);

  useEffect(() => {
    setActiveElement(() => {
      return elements.find((element: IPageContent) => element.url === page);
    });
  }, [page]);

  const [visibleElements, setVisibleElements] = useState<Record<number, boolean>>(() => {
    const defaultVisibleElements = table.topLevelIds.reduce((acc: Record<string, boolean>, id: string) => {
      acc[id] = true;
      return acc;
    }, {});

    return elements.reduce((acc: Record<number, boolean>, element: IPageContent, index: number) => {
      acc[index] = element.id in defaultVisibleElements;
      return acc;
    }, {});
  });

  const [filteredElements, setFilteredElements] = useState<IPageContent[]>([]);

  useEffect(() => {
    setFilteredElements(() => {
      return elements.filter((_: IPageContent, index: number) => visibleElements[index]);
    });
  }, [elements, visibleElements]);

  const context: ITOCContext = {
    elements,
    visibleElements,
    setVisibleElements,
    filteredElements,
    setFilteredElements,
    activeElement,
    setActiveElement
  };

  // const onSearch = useCallback((query: string) => {
  //   const mapOfPresentElements: Record<string, boolean> = {};
  //
  //   elements.forEach((element: IPageContent) => {
  //     if (element.title.toLowerCase().includes(query.toLowerCase())) {
  //       mapOfPresentElements[element.id] = true;
  //
  //       let parentId = element.parentId;
  //
  //       while (parentId !== 'ij') {
  //         mapOfPresentElements[parentId] = true;
  //         parentId = table.entities.pages[parentId].parentId;
  //       }
  //     }
  //   });
  //
  //   const filteredElements: IPageContent[] = elements.filter((element: IPageContent) => {
  //     return mapOfPresentElements[element.id];
  //   });
  //
  //   setFilteredElements(filteredElements);
  // }, []);

  // -------------------------------------------------------------------------------------------------------------------


  return (
    <TOCContext.Provider value={context}>
      <div className='toc'>
        <SearchBar/>
        <Table/>
      </div>
    </TOCContext.Provider>
  );
};
