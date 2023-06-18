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
  table: ITableOfContents;
}

export interface ITOCContext {
  table: ITableOfContents;
  elements: IPageMeta[];
  expandMap: Record<string, boolean>;
  setExpandMap: Dispatch<SetStateAction<Record<string, boolean>>>;
  filterByExpand: Record<string, boolean>;
  setFilterByExpand: Dispatch<SetStateAction<Record<string, boolean>>>;
  filterByQuery: Record<string, boolean>;
  setFilterByQuery: Dispatch<SetStateAction<Record<string, boolean>>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  activeElement: IPageMeta | null;
  setActiveElement: Dispatch<SetStateAction<IPageMeta | null>>;
}

export const TOCContext = createContext<ITOCContext>({
  table: {} as ITableOfContents,
  elements: [],
  expandMap: {},
  setExpandMap: () => {},
  filterByExpand: {},
  setFilterByExpand: () => {},
  filterByQuery: {},
  setFilterByQuery: () => {},
  query: '',
  setQuery: () => {},
  activeElement: null,
  setActiveElement: () => {}
});

export const TableOfContents: React.FC<IProps> = ({ table }: IProps) => {
  const { page } = useParams<{page: string}>();

  const elements: IPageMeta[] = useMemo(() => buildTable(table), [table]);

  const [query, setQuery] = useState<string>('');

  const [activeElement, setActiveElement] = useState<IPageMeta | null>(() => {
    return elements.find((element: IPageMeta) => page && element.url === page);
  });

  const [expandMap, setExpandMap] = useState<Record<string, boolean>>(() => {
    const next: Record<string, boolean> = {};

    for (let i = 0; i < elements.length; i++) {
      if (elements[i].url === page) {
        let parentId = elements[i].parentId;

        while (parentId !== undefined) {
          next[parentId] = true;
          parentId = table.entities.pages[parentId] ? table.entities.pages[parentId].parentId : undefined;
        }
        break;
      }
    }

    return next;
  });
  const [filterByQuery, setFilterByQuery] = useState<Record<string, boolean>>({});
  const [filterByExpand, setFilterByExpand] = useState<Record<string, boolean>>(() => {
    return table.topLevelIds.reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, {});
  });


  useEffect(() => {
    const filterByQuery: Record<string, boolean> = {};

    for (let i = 0; i < elements.length; i++) {
      if (elements[i].title.toLowerCase().includes(query.toLowerCase())) {
        filterByQuery[elements[i].id] = true;

        let parentId = elements[i].parentId;

        while (parentId !== undefined) {
          filterByQuery[parentId] = true;
          parentId = table.entities.pages[parentId] ? table.entities.pages[parentId].parentId : undefined;
        }
      }
    }

    setFilterByQuery(filterByQuery);
    setFilterByExpand((filterByExpand) => {
      if (query === '') {
        const next: Record<string, boolean> = { ...filterByExpand };

        for (let i = 0; i < elements.length; i++) {
          if (expandMap[elements[i].id]) {

            for (let j = i + 1; j < elements.length; j++) {
              if (elements[j].level <= elements[i].level) {
                break;
              } else if (elements[j].level - elements[i].level > 1 && !next[elements[j].id]) {
                continue;
              }

              next[elements[j].id] = true;
            }
          }
        }

        return next;
      }

      return {
        ...filterByExpand,
        ...filterByQuery
      };
    });
  }, [elements, table, query]);

  const context: ITOCContext = {
    table,
    elements,
    expandMap,
    setExpandMap,
    filterByExpand,
    setFilterByExpand,
    filterByQuery,
    setFilterByQuery,
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
