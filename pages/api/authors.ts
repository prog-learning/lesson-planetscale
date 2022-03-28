import { Author } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createAuthor, getAuthors } from '../../prisma/functions/author';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Author[] | Author>,
) {
  const { method } = req;

  if (method === 'GET') {
    const authors = await getAuthors();
    res.status(200).json(authors);
  }

  if (method === 'POST') {
    console.log('authors POST');
    const json = req.body;
    const params = JSON.parse(json) as Omit<Author, 'id'>;
    const author = await createAuthor(params);
    res.status(200).json(author);
  }
}
