const Borrow = require("../models/Borrow");
const Book = require("../models/Book");
const User = require("../models/User");

async function create(req, res) {
  const { userId, bookId } = req.params;

  if (!userId || !bookId) {
    return res.status(422).json({ message: "Please fill in all fields" });
  }

  if ((await User.findById(parseInt(userId))) === null) {
    return res.status(404).json({ message: "User not found" });
  }

  console.log((await Borrow.findOne(bookId, userId))?.status);

  if ((await Borrow.findOne(bookId, userId))?.status === "BORROWED") {
    return res.status(400).json({ message: "Book already borrowed" });
  }

  try {
    await Borrow.create({
      userId: parseInt(userId),
      bookId: parseInt(bookId),
      status: "BORROWED",
    });
    return res.status(201).json({ message: "Borrow created" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Could not create borrow" });
  }
}

async function getBack(req, res) {
  const { userId, bookId } = req.params;
  const { score } = req.body;

  try {
    const borrow = await Borrow.findOne(bookId, userId);

    if (!borrow) {
      return res.status(404).json({ message: "Borrow record not found" });
    }

    if (!score) {
      return res.status(422).json({ message: "Please fill in all fields" });
    }

    if (borrow.status === "BORROWED") {
      await Borrow.update(borrow.id, {
        status: "RETURNED",
        score: parseInt(score, 10),
      });

      const allScores = await Borrow.findAllReturnedScores(bookId);

      const totalScore = allScores.reduce(
        (sum, record) => sum + record.score,
        0
      );
      const averageScore =
        allScores.length > 0 ? totalScore / allScores.length : 0;

      await Book.update({
        where: { id: parseInt(bookId, 10) },
        data: { score: averageScore },
      });

      return res.status(200).json({ message: "Book returned" });
    } else {
      return res.status(400).json({ message: "Book already returned" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Could not return book" });
  }
}

module.exports = { create, getBack };
