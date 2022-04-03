import { useEffect, VFC } from 'react';

type Props = {
  isOpen: boolean;
  closeHandler: () => void;
  messages: string[];
};

export const Snackbar: VFC<Props> = ({ isOpen, closeHandler, messages }) => {
  /* 自動で非表示に */
  useEffect(() => {
    const timer = setTimeout(() => {
      closeHandler();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [closeHandler]);

  if (isOpen) {
    return (
      <div className='fixed top-4 inset-x-1/2 z-50 w-fit h-fit bg-red-500 rounded p-4 -translate-x-1/2 text-white'>
        <span className='whitespace-pre-wrap'>{messages.join('\n')}</span>
        <button className='ml-2 cursor-pointer' onClick={closeHandler}>
          ×
        </button>
      </div>
    );
  } else {
    return null;
  }
};
