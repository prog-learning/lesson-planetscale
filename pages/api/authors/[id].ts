import { Author } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  prismaAuthorDelete,
  prismaAuthorUpdate,
} from 'prisma/functions/authors';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Author>,
) {
  const {
    method,
    query: { id },
    body,
  } = req;

  switch (method) {
    case 'PUT':
      if (!body) return res.status(400).end('No body');
      const params = JSON.parse(body) as Author;
      const updatedAuthor = await prismaAuthorUpdate(params);

      res.status(200).json(updatedAuthor);
      break;

    case 'DELETE':
      const authorId = Number(typeof id === 'string' ? id : id[0]);
      const deletedAuthor = await prismaAuthorDelete(authorId);
      res.status(200).json(deletedAuthor);
      break;

    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
