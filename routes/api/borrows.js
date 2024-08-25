const express = require("express");
const router = express.Router();
const borrowController = require("../../controllers/borrowController");

router.post("/users/:userId/borrow/:bookId", borrowController.create);

router.post("/users/:userId/return/:bookId", borrowController.getBack);

module.exports = router;
