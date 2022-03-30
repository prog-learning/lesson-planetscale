import { Book } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prismaBookCreate, prismaBookFindMany } from 'prisma/functions/books';
import { BookWithAuthor } from 'types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BookWithAuthor[] | Book>,
) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      const books = await prismaBookFindMany();
      res.status(200).json(books);
      break;

    case 'POST':
      if (!body) return res.status(400).end('No body');
      const params = JSON.parse(body) as Omit<Book, 'id'>;
      params.price = Number(params.price);
      params.authorId = Number(params.authorId);
      const book = await prismaBookCreate(params);
      res.status(200).json(book);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
