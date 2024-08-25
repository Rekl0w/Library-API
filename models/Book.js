const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Book = {
  create: async (book) => {
    return await prisma.book.create({
      data: book,
    });
  },

  update: async (data) => {
    return await prisma.book.update(data);
  },

  findOne: async (id) => {
    return await prisma.book.findUnique({
      where: { id: parseInt(id) },
    });
  },

  findSameBook: async (name) => {
    return await prisma.book.findUnique({
      where: { name: name },
    });
  },

  findAll: async () => {
    return await prisma.book.findMany();
  },
};

module.exports = Book;
