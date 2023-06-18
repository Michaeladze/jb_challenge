import React, {
  forwardRef, HTMLProps, ReactNode
} from 'react';
import './Button.css';
import { Spinner } from '../Spinner';

interface IProps extends HTMLProps<HTMLButtonElement> {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  buttonType?: 'primary' | 'outline';
  spinner?: boolean;
}

export const Button: React.FC<IProps> = forwardRef((props: IProps, ref) => {

  const spinnerClass = props.spinner ? 'ui-button--spinner' : '';
  const buttonTypeClass = `ui-button--${props.buttonType || 'primary'}`;

  return (
    <button {...props} className={`ui-button text-16 ${spinnerClass} ${buttonTypeClass}`} ref={ref}>
      <span className='ui-button__text'>{props.children}</span>
      { props.spinner && <Spinner variant='light' size='s'/> }
    </button>
  );
});
