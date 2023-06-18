import React from 'react';
import './Spinner.css';

interface IProps {
  size?: 's' | 'm' | 'l';
  variant?: 'primary' | 'light';
}

export const Spinner: React.FC<IProps> = ({ size = 'm', variant = 'primary' }: IProps) => {
  return (
    <div className={`ui-spinner ui-spinner ${size}`}>
      <div className={`ui-spinner__inner ${variant}`}/>
    </div>
  );
};
