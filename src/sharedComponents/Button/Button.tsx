import * as React from 'react';
import * as st from './Button.scss';

const Button = ({children, type, ...props}) => {
  props.className = [props.className? props.className : '', st[type]].join(' ');
  return (
    <button {...props}>
      {children}
    </button>
  )};

  export default Button;