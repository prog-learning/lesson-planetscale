import { PrismaClient, Author } from '@prisma/client';

const prisma = new PrismaClient();

/* 著者リストを取得 */
export const getAuthors = async (): Promise<Author[]> => {
  const authors = await prisma.author.findMany();
  return authors;
};

/* 著者を新規作成 */
export const createAuthor = async (
  param: Omit<Author, 'id'>,
): Promise<Author> => {
  const authors = await prisma.author.create({
    data: param,
  });
  return authors;
};
