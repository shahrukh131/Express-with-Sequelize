const express = require("express");
const {
  save,
  findAllUsers,
  findAllPaginatedUsers,
  findUserById,
  updateUser,
  deleteUser,
} = require("@controllers/UserController");
const { userValidator } = require("@validations/user");
const route = express.Router();

// Users Routes
route.route("/").post(save).get(findAllPaginatedUsers);
route.route("/:id").put(updateUser).get(findUserById).delete(deleteUser);

module.exports = route;
