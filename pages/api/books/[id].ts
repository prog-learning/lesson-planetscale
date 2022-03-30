import { Book } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prismaBookDelete, prismaBookUpdate } from 'prisma/functions/books';
import { BookWithAuthor } from 'types';

const allowMethods = ['PUT', 'DELETE'];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BookWithAuthor[] | Book>,
) {
  const {
    method = '',
    query: { id },
    body,
  } = req;

  if (method === 'PUT') {
    if (!body) return res.status(400).end('No body');
    const params = JSON.parse(body) as Book;
    const updatedBook = await prismaBookUpdate(params);
    res.status(200).json(updatedBook);
  }

  if (method === 'DELETE') {
    const bookId = Number(typeof id === 'string' ? id : id[0]);
    const deletedBook = await prismaBookDelete(bookId);
    res.status(200).json(deletedBook);
  }

  if (!allowMethods.includes(method)) {
    res.setHeader('Allow', allowMethods);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
