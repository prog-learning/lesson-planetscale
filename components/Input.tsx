import { VFC } from 'react';

type Props = JSX.IntrinsicElements['input'] & {};

export const Input: VFC<Props> = ({ ...rest }) => {
  return (
    <div>
      <input
        className='border border-gray-500 px-2 py-1 rounded w-full'
        {...rest}
      />
    </div>
  );
};
