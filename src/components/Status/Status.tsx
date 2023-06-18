import React, { ReactNode } from 'react';
import './Status.css';

interface IProps {
    variant: 'green' | 'yellow' | 'red' | 'blue' | 'gray';
    children: ReactNode | ReactNode[];
}

export const Status: React.FC<IProps> = ({ children, variant }: IProps) => {

  return (
    <div className='ui-status'>
      <div className={`ui-status__circle ${variant}`}/>
      <span className='ui-status__text text-16'>{children}</span>
    </div>
  );
};
