const express = require("express");
const {
  save,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
} = require("@controllers/UserController");
const route = express.Router();

// Users Routes
route.route("/").post(save).get(findAllUsers);
route.route("/:id").put(updateUser).get(findUserById).delete(deleteUser);

module.exports = route;
