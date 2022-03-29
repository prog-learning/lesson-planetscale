import { useCallback } from 'react';
import useSWR from 'swr';
import { BookWithAuthor } from 'types';
import { fetcher } from './fetcher';

export const useBooks = () => {
  const { data, error, mutate } = useSWR<BookWithAuthor[]>(
    '/api/books',
    fetcher,
  );

  const refetch = useCallback(() => mutate(), [mutate]);

  return {
    books: data,
    isLoading: !error && !data,
    error,
    refetch,
  };
};
