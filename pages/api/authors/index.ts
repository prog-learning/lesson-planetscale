import { Author } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  prismaAuthorCreate,
  prismaAuthorFindMany,
} from '../../../prisma/functions/authors';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Author[] | Author>,
) {
  const { method } = req;

  if (method === 'GET') {
    const authors = await prismaAuthorFindMany();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(authors);
  }

  if (method === 'POST') {
    console.log('authors POST');
    const json = req.body;
    const params = JSON.parse(json) as Omit<Author, 'id'>;
    const author = await prismaAuthorCreate(params);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(author);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${method} Not Allowed`);
}
