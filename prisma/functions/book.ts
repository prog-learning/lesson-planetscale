import { PrismaClient, Book } from '@prisma/client';

const prisma = new PrismaClient();

/* 本リストを取得 */
export const getBooks = async (): Promise<Book[]> => {
  const books = await prisma.book.findMany({
    /* 著者の情報も取得する */
    include: {
      author: true,
    },
  });
  return books;
};

/* 本を新規保存 */
export const createBook = async (param: Omit<Book, 'id'>): Promise<Book> => {
  const books = await prisma.book.create({
    data: param,
  });
  return books;
};

/* 本を更新 */
export const updateBook = async (param: Book): Promise<Book> => {
  const books = await prisma.book.update({
    where: {
      id: param.id,
    },
    data: param,
  });
  return books;
};
