const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const User = {
  create: async (user) => {
    return await prisma.user.create({
      data: user,
    });
  },

  findAll: async () => {
    return await prisma.user.findMany();
  },

  findById: async (id) => {
    return await prisma.user.findUnique({
      where: { id },
    });
  },
};

module.exports = User;
