const User = require("../models/User");
const Borrow = require("../models/Borrow");

async function create(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(422).json({ message: "Please fill in all fields" });
  }

  try {
    await User.create({ name });
    return res.status(201).json({ message: "User created" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Could not create user" });
  }
}

async function getAll(req, res) {
  try {
    const users = await User.findAll();
    const formattedUsers = users.map((user) => ({
      name: user.name,
      id: user.id,
    }));
    return res.status(200).json(formattedUsers);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Could not get users" });
  }
}

async function getOne(req, res) {
  const { id } = req.params;

  try {
    const formatId = parseInt(id);
    const user = await User.findById(formatId);

    const borrowedBooks = await Borrow.findMany({
      where: { userId: formatId, status: "BORROWED" },
      include: { book: true },
    });

    const returnedBooks = await Borrow.findMany({
      where: { userId: formatId, status: "RETURNED" },
      include: { book: true },
    });

    const formattedUser = {
      name: user.name,
      id: user.id,
      books: {
        past: returnedBooks.map((borrow) => ({
          id: borrow.book.id,
          name: borrow.book.name,
        })),
        present: borrowedBooks.map((borrow) => ({
          id: borrow.book.id,
          name: borrow.book.name,
        })),
      },
    };

    return res.status(200).json(formattedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Could not get user" });
  }
}

module.exports = { create, getAll, getOne };
