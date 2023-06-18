import React, { CSSProperties } from 'react';
import './Shimmer.css';

interface IProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Shimmer: React.FC<IProps> = ({ width = 100, height = 16, className }) => {

  const style: CSSProperties = {
    width: `${width}px`,
    height: `${height}px`
  };

  return (
    <div className={`ui-shimmer ${className}`} style={style}/>
  );
};
