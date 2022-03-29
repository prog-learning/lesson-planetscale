import type { NextPage } from 'next';

import { Author, Book } from '@prisma/client';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useEffect, useMemo, useState } from 'react';
import { Select } from '../components/Select';

const Home: NextPage = () => {
  const [inputBookState, setInputBookState] = useState<Omit<Book, 'id'>>({
    title: '',
    description: '',
    authorId: 0,
  });
  const [inputAuthorState, setInputAuthorState] = useState<Omit<Author, 'id'>>({
    name: '',
  });
  const [authors, setAuthors] = useState<Author[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch('/api/authors', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then(setAuthors);
  }, []);

  /* Select Options */
  const authorOptions = useMemo(() => {
    return authors.map((author) => ({
      value: author.id,
      label: author.name,
    }));
  }, [authors]);

  /* handleChange */
  const handleChangeBook = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setInputBookState({ ...inputBookState, [name]: value });
  };
  const handleChangeAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputAuthorState({ ...inputAuthorState, [name]: value });
  };

  /* 本の追加 */
  const postBook = async () => {
    try {
      await fetch('/api/books', {
        method: 'POST',
        body: JSON.stringify(inputBookState),
      });
    } catch (e) {
      console.error(e);
    }
  };

  /* 著者の追加 */
  const postAuthor = async () => {
    console.log(inputAuthorState);
    try {
      await fetch('/api/authors', {
        method: 'POST',
        body: JSON.stringify(inputAuthorState),
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='p-5'>
      <h1 className='text-2xl border-b pb-1 px-8'>
        Lesson PlanetScale with Prisma
      </h1>

      <div className='p-4 space-y-2 w-60'>
        <h2 className='text-xl'>本を登録する</h2>
        <Input
          name='title'
          placeholder='タイトル'
          value={inputBookState.title}
          onChange={(e) => handleChangeBook(e)}
        />
        <Input
          name='description'
          placeholder='説明'
          value={inputBookState.description}
          onChange={(e) => handleChangeBook(e)}
        />
        <Select
          name='authorId'
          value={inputBookState.authorId}
          onChange={(e) => handleChangeBook(e)}
        >
          <option value={0} disabled>
            著者を選択
          </option>
          {authorOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <div className='text-right'>
          <Button onClick={postBook}>送信</Button>
        </div>
      </div>

      <div className='p-4 space-y-2 w-60'>
        <h2 className='text-xl'>著者を登録する</h2>
        <Input
          name='name'
          placeholder='著者'
          value={inputAuthorState.name}
          onChange={(e) => handleChangeAuthor(e)}
        />
        <div className='text-right'>
          <Button onClick={postAuthor}>送信</Button>
        </div>
      </div>

      <div className='p-4 space-y-2'>
        <h2 className='text-xl'>著者一覧</h2>
        {authors.map((author) => (
          <div key={author.id}>{author.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Home;
