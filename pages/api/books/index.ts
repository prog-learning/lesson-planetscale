import { Book } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  prismaBookCreate,
  prismaBookFindMany,
} from '../../../prisma/functions/books';
import { BookWithAuthor } from '../../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BookWithAuthor[] | Book>,
) {
  const { method } = req;

  if (method === 'GET') {
    const books = await prismaBookFindMany();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  }

  if (method === 'POST') {
    const json = req.body;
    const params = JSON.parse(json) as Omit<Book, 'id'>;
    params.price = Number(params.price);
    params.authorId = Number(params.authorId);
    const book = await prismaBookCreate(params);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(book);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${method} Not Allowed`);
}
