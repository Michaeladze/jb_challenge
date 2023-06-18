import React, { ReactNode } from 'react';
import './Card.css';

interface IProps {
    className?: string;
    children: ReactNode | ReactNode[];
}

export const Card: React.FC<IProps> = ({ children, className }: IProps) => {
  return (
    <div className={`ui-card text-16 ${className}`}>
      { children }
    </div>
  );
};
