import React, { useContext } from 'react';
import './SearchBar.css';
import { Input } from '../../../../../components/Input';
import { TOCContext } from '../TableOfContents/TableOfContents.tsx';
import { debounce } from '../../../../../utils/debounce.ts';


export const SearchBar: React.FC = () => {

  const { setQuery } = useContext(TOCContext);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // -------------------------------------------------------------------------------------------------------------------


  return (
    <div className='toc__search'>
      <Input placeholder='Search...' onChange={debounce(onChange)}/>
    </div>
  );
};
