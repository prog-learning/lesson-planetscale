import { Book } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  prismaBookDelete,
  prismaBookUpdate,
} from '../../../prisma/functions/books';
import { BookWithAuthor } from '../../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BookWithAuthor[] | Book>,
) {
  const {
    method,
    query: { id },
  } = req;

  if (method === 'PUT') {
    const json = req.body;
    const params = JSON.parse(json) as Book;
    const book = await prismaBookUpdate(params);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(book);
  }

  if (method === 'DELETE') {
    const bookId = Number(typeof id === 'string' ? id : id[0]);
    const books = await prismaBookDelete(bookId);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).end(`Method ${method} Not Allowed`);
}
