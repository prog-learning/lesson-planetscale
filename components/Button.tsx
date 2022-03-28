import { FC } from 'react';

type Props = JSX.IntrinsicElements['button'] & {};

export const Button: FC<Props> = ({ children, ...rest }) => {
  return (
    <button
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      {...rest}
    >
      {children}
    </button>
  );
};
