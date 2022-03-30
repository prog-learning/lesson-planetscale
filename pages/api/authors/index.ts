import { Author } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  prismaAuthorCreate,
  prismaAuthorFindMany,
} from 'prisma/functions/authors';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Author[] | Author>,
) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      const authors = await prismaAuthorFindMany();
      res.status(200).json(authors);
      break;

    case 'POST':
      if (!body) return res.status(400).end('No body');
      const params = JSON.parse(body) as Omit<Author, 'id'>;
      const author = await prismaAuthorCreate(params);
      res.status(200).json(author);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
