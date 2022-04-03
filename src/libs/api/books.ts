import { Book } from '../../../types';

/* 本を新規作成 */
export const createBook = async (param: Omit<Book, 'id'>): Promise<Book> => {
  const response = await fetch('/api/books', {
    method: 'POST',
    body: JSON.stringify(param),
  });
  return (await response.json()) as Book;
};

/* 本の編集 */
export const updateBook = async (param: Book): Promise<Book> => {
  try {
    const response = await fetch(`/api/books/${param.id}`, {
      method: 'PUT',
      body: JSON.stringify(param),
    });
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return (await response.json()) as Book;
  } catch (error) {
    throw error;
  }
};

/* 指定した本の削除 */
export const deleteBook = async (id: number): Promise<Book> => {
  const response = await fetch(`api/books/${id}`, {
    method: 'DELETE',
  });
  return (await response.json()) as Book;
};
