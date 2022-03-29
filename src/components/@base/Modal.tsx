import { FC } from 'react';

type Props = {
  isOpen: boolean;
  closeHandler: () => void;
};

export const Modal: FC<Props> = ({ isOpen, closeHandler, children }) => {
  if (isOpen) {
    return (
      <div className='fixed inset-0 z-50 bg-gray-900/50 backdrop-blur'>
        <div className='absolute z-50 w-full h-full flex justify-center items-center cursor-pointer'>
          <div className='relative z-50 shadow'>{children}</div>
          {/* Overlay */}
          <div
            className='absolute z-40 w-full h-full cursor-pointer'
            onClick={closeHandler}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
};
