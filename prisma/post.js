const { PrismaClient } = require('@prisma/client');

void (async () => {
  try {
    const prisma = new PrismaClient();
    await prisma.book.createMany({
      data: {
        title: 'Prisma2',
        description: 'Prisma is a database client for Node.js',
        authorId: 2,
      },
    });
    console.log('Created!!');
  } catch (e) {
    console.error(e);
  }
})();
