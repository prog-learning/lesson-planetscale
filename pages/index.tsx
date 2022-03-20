import type { NextPage } from 'next';

import { PrismaClient } from '@prisma/client';

const Home: NextPage = () => {
  const post = async () => {
    const prisma = new PrismaClient();
    try {
      await prisma.book.createMany({
        data: {
          title: 'Prisma',
          description: 'Prisma is a database client for Node.js',
          authorId: 1,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1>Lesson PlanetScale with Prisma</h1>
      <button onClick={post}>post</button>
    </div>
  );
};

export default Home;
