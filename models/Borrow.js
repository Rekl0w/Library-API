const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Borrow = {
  create: async (borrow) => {
    return await prisma.borrow.create({
      data: borrow,
    });
  },

  findOne: async (bookId, userId) => {
    return await prisma.borrow.findFirst({
      where: {
        bookId: parseInt(bookId, 10),
        userId: parseInt(userId, 10),
      },
    });
  },

  findMany: async (params) => {
    return await prisma.borrow.findMany(params);
  },

  findAllReturnedScores: async (bookId) => {
    return await prisma.borrow.findMany({
      where: {
        bookId: parseInt(bookId, 10),
        status: "RETURNED",
      },
      select: {
        score: true,
      },
    });
  },

  update: async (id, borrow) => {
    return await prisma.borrow.update({
      where: { id: parseInt(id) },
      data: borrow,
    });
  },
};

module.exports = Borrow;
