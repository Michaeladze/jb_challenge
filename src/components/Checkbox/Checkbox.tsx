import React, { InputHTMLAttributes, ReactNode } from 'react';
import './Checkbox.css';
import { Check } from '../../assets/icons/Check.tsx';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
}

export const Checkbox: React.FC<IProps> = (props: IProps) => {


  // -------------------------------------------------------------------------------------------------------------------

  return (
    <label className='ui-checkbox'>
      <input
        {...props}
        type='checkbox'
        className='ui-checkbox__input'
        value={props.value}
      />

      <span className='ui-checkbox__check'>
        <span className='ui-checkbox__mark'>
          <Check />
        </span>
      </span>

      <div className='ui-checkbox__label text-16' tabIndex={-1}>{props.label}</div>
    </label>
  );
};
