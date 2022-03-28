import { FC } from 'react';

type Props = JSX.IntrinsicElements['select'] & {};

export const Select: FC<Props> = ({ children, ...rest }) => {
  return (
    <div>
      <select className='border border-gray-500 p-2 rounded w-full' {...rest}>
        {children}
      </select>
    </div>
  );
};
