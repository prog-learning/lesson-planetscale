import { FC } from 'react';

type Props = JSX.IntrinsicElements['button'] & {};

export const Button: FC<Props> = ({ children, ...rest }) => {
  return (
    <button
      className='bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded text-sm disabled:bg-slate-300 disabled:cursor-not-allowed'
      {...rest}
    >
      {children}
    </button>
  );
};
