const Book = require("../models/Book");

async function create(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(422).json({ message: "Please fill in all fields" });
  }

  if (name === (await Book.findSameBook(name))?.name) {
    return res.status(422).json({ message: "Book already exists" });
  }

  try {
    await Book.create({ name });
    return res.status(201).json({ message: "Book created" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Could not create book" });
  }
}

async function getAll(req, res) {
  try {
    const books = await Book.findAll();
    const formattedBooks = books.map((book) => ({
      name: book.name,
      id: book.id,
    }));
    return res.status(200).json(formattedBooks);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Could not get books" });
  }
}

async function getOne(req, res) {
  const { id } = req.params;

  try {
    const book = await Book.findOne(id);
    const formattedBook = {
      name: book.name,
      id: book.id,
      score: book.score,
    };
    return res.status(200).json(formattedBook);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Could not get book" });
  }
}

module.exports = { create, getAll, getOne };
