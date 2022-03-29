import type { NextPage } from 'next';
import { BookList } from 'src/components/BookList';
import { AuthorList } from 'src/components/AuthorList';

const Home: NextPage = () => {
  return (
    <div className='p-5'>
      <h1 className='text-2xl border-b pb-1 px-8'>
        Lesson PlanetScale with Prisma
      </h1>
      <div className='space-y-3 mt-3'>
        <BookList />
        <AuthorList />
      </div>
    </div>
  );
};

export default Home;
