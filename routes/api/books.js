const express = require("express");
const router = express.Router();
const bookController = require("../../controllers/bookController");

router.post("/books", bookController.create);

router.get("/books", bookController.getAll);

router.get("/books/:id", bookController.getOne);

module.exports = router;
