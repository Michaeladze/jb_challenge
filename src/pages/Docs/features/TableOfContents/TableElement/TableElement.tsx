import React, {
  useContext, useEffect, useState
} from 'react';
import './TableElement.css';
import { TOCContext } from '../TableOfContents/TableOfContents.tsx';
import { ChevronDown } from '../../../../../assets/icons/ChevronDown.tsx';
import { NavLink } from 'react-router-dom';

interface IProps {
  element: IPageContent;
}
export const TableElement: React.FC<IProps> = ({ element }: IProps) => {

  const { elements, visibleElements,
    setVisibleElements,
    activeElement } = useContext(TOCContext);
  const index = elements.findIndex((e: IPageContent) => element.id === e.id);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    let isExpanded = false;

    for (let i = index + 1; i < elements.length; i++) {
      if (elements[i].level <= elements[index].level) {
        break;
      }

      if (visibleElements[elements[i].id]) {
        isExpanded = true;
        break;
      }
    }

    setIsExpanded(isExpanded);
  }, [elements, index, visibleElements]);

  const expandClass = isExpanded ? 'toc__element-icon--rotate' : '';

  const style = { paddingLeft: `${(element.level + 1) * 24}px` };

  const hasChildren = element.pages && element.pages.length !== 0;

  const activeClass = activeElement?.id === element.id ? 'toc__element--active' : '';

  const onClick = (e: React.MouseEvent) => {
    if (!hasChildren) {
      return;
    }

    if (element.url === undefined) {
      e.preventDefault();
    }

    setVisibleElements((visibleElements: Record<number, boolean>) => {
      const next: Record<number, boolean> = { ...visibleElements };

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
