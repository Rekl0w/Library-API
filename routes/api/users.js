const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

router.post("/users", userController.create);

router.get("/users", userController.getAll);

router.get("/users/:id", userController.getOne);

module.exports = router;
