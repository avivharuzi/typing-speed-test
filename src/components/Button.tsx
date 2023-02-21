import { MouseEventHandler, PropsWithChildren } from 'react';

export interface ButtonProps extends PropsWithChildren {
  onClick?: MouseEventHandler;
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={(event) => onClick && onClick(event)}
      className="rounded-lg bg-purple-500 text-white px-3 py-2 hover:bg-purple-600"
    >
      {children}
    </button>
  );
};

export default Button;
