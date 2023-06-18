import React, { useContext } from 'react';
import './TableElement.css';
import { TOCContext } from '../TableOfContents/TableOfContents.tsx';
import { ChevronDown } from '../../../../../assets/icons/ChevronDown.tsx';
import { NavLink } from 'react-router-dom';

interface IProps {
  element: IPageMeta;
}
export const TableElement: React.FC<IProps> = ({ element }: IProps) => {

  const { elements,
    expandMap,
    setExpandMap,
    setFilterByExpand,
    activeElement,
    setActiveElement } = useContext(TOCContext);

  const expandClass = expandMap[element.id] ? 'toc__element-icon--rotate' : '';

  const style = { paddingLeft: `${(element.level + 1) * 24}px` };

  const hasChildren = element.pages && element.pages.length !== 0;

  const activeClass = activeElement?.id === element.id ? 'toc__element--active' : '';

  const onClick = (e: React.MouseEvent) => {
    setActiveElement(element);

    if (!hasChildren) {
      return;
    }

    if (element.url === undefined) {
      e.preventDefault();
    }

    setExpandMap((expandMap) => {
      return {
        ...expandMap,
        [element.id]: !expandMap[element.id]
      };
    });

    setFilterByExpand((filterByExpand) => {
      const next: Record<number, boolean> = { ...filterByExpand };
      const index = elements.findIndex((e: IPageMeta) => e.id === element.id);

      for (let i = index + 1; i < elements.length; i++) {
        if (elements[i].level <= element.level) {
          break;
        } else if (elements[i].level - element.level > 1 && !next[elements[i].id]) {
          continue;
        }

        next[elements[i].id] = !next[elements[i].id];
      }

      return next;
    });
  };

  // -------------------------------------------------------------------------------------------------------------------


  return (
    <li className={`toc__element ${activeClass}`}>
      <NavLink to={`${element.url}`} className='toc__element-inner' style={style} onClick={onClick}>
        <div className='toc__element-icon-wrapper'>
          {hasChildren && <ChevronDown className={`toc__element-icon ${expandClass}`}/>}
        </div>
        <span>{element.title}</span>
      </NavLink>
    </li>
  );
};
