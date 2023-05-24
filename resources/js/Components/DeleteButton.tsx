import React, { ReactNode, MouseEventHandler } from 'react';

interface ButtonProps {
  onDelete: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onDelete, children }) => (
  <button className='text-red-600 focus:outline-none hover:underline' tabIndex={-1} type='button' onClick={onDelete}>
    {children}
  </button>
);

export default Button;