import { Author } from '../../../types';

/* 著者を新規作成 */
export const createAuthor = async (
  param: Omit<Author, 'id'>,
): Promise<Author> => {
  const response = await fetch('/api/authors', {
    method: 'POST',
    body: JSON.stringify(param),
  });
  return (await response.json()) as Author;
};

/* 著者を編集 */
export const updateAuthor = async (param: Author): Promise<Author> => {
  const response = await fetch(`/api/authors/${param.id}`, {
    method: 'PUT',
    body: JSON.stringify(param),
  });
  return (await response.json()) as Author;
};

/* 著者を削除 */
export const deleteAuthor = async (id: number): Promise<Author> => {
  const response = await fetch(`api/authors/${id}`, {
    method: 'DELETE',
  });
  return (await response.json()) as Author;
};
