import { PrismaClient, Book } from '@prisma/client';
import { BookWithAuthor } from '../../types';

const prisma = new PrismaClient();

/* 本リストを取得 */
export const prismaBookFindMany = async (): Promise<BookWithAuthor[]> => {
  const books = await prisma.book.findMany({
    /* 著者の情報も取得する */
    include: {
      author: true,
    },
  });
  return books;
};

/* 本を新規保存 */
export const prismaBookCreate = async (
  param: Omit<Book, 'id'>,
): Promise<Book> => {
  const books = await prisma.book.create({
    data: param,
  });
  return books;
};

/* 本を更新 */
export const prismaBookUpdate = async (param: Book): Promise<Book> => {
  const books = await prisma.book.update({
    where: {
      id: param.id,
    },
    data: param,
  });
  return books;
};

/* 本を削除 */
export const prismaBookDelete = async (id: number): Promise<Book> => {
  const books = await prisma.book.delete({
    where: {
      id,
    },
  });
  return books;
};
