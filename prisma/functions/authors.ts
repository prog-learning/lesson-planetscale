import { prisma } from './prisma';
import { Author } from '@prisma/client';

/* 著者リストを取得 */
export const prismaAuthorFindMany = async (): Promise<Author[]> => {
  const authors = await prisma.author.findMany({
    include: {
      books: true,
    },
  });
  return authors;
};

/* 著者を新規作成 */
export const prismaAuthorCreate = async (
  param: Omit<Author, 'id'>,
): Promise<Author> => {
  const authors = await prisma.author.create({
    data: param,
  });
  return authors;
};

/* 著者を更新 */
export const prismaAuthorUpdate = async (param: Author): Promise<Author> => {
  const authors = await prisma.author.update({
    where: {
      id: param.id,
    },
    data: param,
  });
  return authors;
};

/* 著者を削除 */
export const prismaAuthorDelete = async (id: number): Promise<Author> => {
  const authors = await prisma.author.delete({
    where: {
      id,
    },
  });
  return authors;
};
