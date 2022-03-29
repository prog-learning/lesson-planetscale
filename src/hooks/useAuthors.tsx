import { useCallback } from 'react';
import useSWR from 'swr';
import { AuthorWithBooks } from 'types';
import { fetcher } from './fetcher';

export const useAuthors = () => {
  const { data, error, mutate } = useSWR<AuthorWithBooks[]>(
    '/api/authors',
    fetcher,
  );

  const refetch = useCallback(() => mutate(), [mutate]);

  return {
    authors: data,
    isLoading: !error && !data,
    error,
    refetch,
  };
};
