import { Author } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  prismaAuthorDelete,
  prismaAuthorUpdate,
} from '../../../prisma/functions/authors';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Author>,
) {
  const {
    method,
    query: { id },
  } = req;

  if (method === 'PUT') {
    const json = req.body;
    const params = JSON.parse(json) as Author;
    const author = await prismaAuthorUpdate(params);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(author);
  }

  if (method === 'DELETE') {
    const authorId = Number(typeof id === 'string' ? id : id[0]);
    const author = await prismaAuthorDelete(authorId);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(author);
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).end(`Method ${method} Not Allowed`);
}
