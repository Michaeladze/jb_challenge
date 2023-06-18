import React, { HTMLProps } from 'react';
import './Input.css';

type IProps = HTMLProps<HTMLInputElement>

export const Input: React.FC<IProps> = (props: IProps) => {
  return <input {...props} type='text' className='ui-input'/>;
};
