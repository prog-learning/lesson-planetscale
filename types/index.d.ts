import { Author, Book } from '@prisma/client';

type Book = Book;

type BookWithAuthor = Book & {
  author: Author;
};

type Author = Author;

type AuthorWithBooks = Author & {
  books: Book[];
};
