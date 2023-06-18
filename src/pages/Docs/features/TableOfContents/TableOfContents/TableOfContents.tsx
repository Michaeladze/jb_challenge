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
  table: IContents;
  elements: IPageContent[];
  visibleElements: Record<string, boolean>;
  setVisibleElements: Dispatch<SetStateAction<Record<string, boolean>>>;
  filteredMap: Record<string, boolean>;
  setFilteredMap: Dispatch<SetStateAction<Record<string, boolean>>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  activeElement: IPageContent | null;
  setActiveElement: Dispatch<SetStateAction<IPageContent | null>>;
}

export const TOCContext = createContext<ITOCContext>({
  table: {} as IContents,
  elements: [],
  visibleElements: {},
  setVisibleElements: () => {},
  filteredMap: {},
  setFilteredMap: () => {},
  query: '',
  setQuery: () => {},
  activeElement: null,
  setActiveElement: () => {}
});

export const TableOfContents: React.FC<IProps> = ({ table }: IProps) => {
  const { page } = useParams<{page: string}>();

  const elements: IPageContent[] = useMemo(() => buildTable(table), [table]);

  const [query, setQuery] = useState<string>('');

  const [activeElement, setActiveElement] = useState<IPageContent | null>(null);

  useEffect(() => {
    setActiveElement(() => {
      return elements.find((element: IPageContent) => page && element.url === page);
    });
  }, [page]);

  const [visibleElements, setVisibleElements] = useState<Record<string, boolean>>(() => {
    return table.topLevelIds.reduce((acc: Record<string, boolean>, id: string) => {
      acc[id] = true;
      return acc;
    }, {});
  });

  const [filteredMap, setFilteredMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const next: Record<string, boolean> = {};

    for (let i = 0; i < elements.length; i++) {
      if (elements[i].title.toLowerCase().includes(query.toLowerCase())) {
        next[elements[i].id] = true;

        let parentId = elements[i].parentId;

        while (parentId !== undefined) {
          next[parentId] = true;
          parentId = table.entities.pages[parentId] ? table.entities.pages[parentId].parentId : undefined;
        }
      }
    }

    setFilteredMap(next);
    setVisibleElements((visibleElements) => {
      if (query === '') {
        return visibleElements;
      }

      return {
        ...visibleElements,
        ...next
      };
    });
  }, [elements, table, query]);

  const context: ITOCContext = {
    table,
    elements,
    visibleElements,
    setVisibleElements,
    filteredMap,
    setFilteredMap,
    query,
    setQuery,
    activeElement,
    setActiveElement
  };

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
