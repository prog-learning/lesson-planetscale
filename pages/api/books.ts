import { Book } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createBook, getBooks } from '../../prisma/functions/book';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Book[] | Book>,
) {
  const { method } = req;

  if (method === 'GET') {
    const books = await getBooks();
    res.status(200).json(books);
  }

  if (method === 'POST') {
    const json = req.body;
    const params = JSON.parse(json) as Omit<Book, 'id'>;
    params.authorId = Number(params.authorId);
    const book = await createBook(params);
    res.status(200).json(book);
  }
}
