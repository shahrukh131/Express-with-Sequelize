const { User } = require("@models");
const { sendError } = require("@utils/ErrorMessage");
const { sendSuccess } = require("@utils/SendSuccess");
const bcrypt = require("bcrypt");
const {
  getData,
  createData,
  updatedData,
  deletedData,
  getPaginatedData,
} = require("../utils/GenericMethods");
const { Op } = require("sequelize");

const save = async (req, res) => {
  //* Saves user into the database.
  const { email, firstName, lastName, password, age } = req.body;
  const newData = {
    firstName,
    lastName,
    email,
    password: await bcrypt.hash(password, 10),
    age
  }
  try {
    const data = await createData(User, newData);
    sendSuccess(res, 200, "Successfully Created", data);
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const findAllUsers = async (req, res) => {
  //* Fetch all users from User table
  try {
    const data = await getData(User);
    sendSuccess(res, 200, "Successfully Fetched", data);
  } catch (error) {
    sendError(res, 404, error.message);
  }
};

const findAllPaginatedUsers = async (req, res) => {
  try {
    let query = req.query;
    let filterKey = query.key
    query.limit = parseInt(query.limit, 10) || 10;
    query.page = parseInt(query.page, 10)  || 1;
    query.offset = query.limit * (query.page - 1);
    query.where = {
      [filterKey]: {
        [Op.like]: `%${query.key}%`,
      },
    }
    
    const data = await getPaginatedData(User, { ...query });
    sendSuccess(res, 200, "Successfully Fetched", data);
  } catch (error) {
    sendError(res, 404, error.message);
  }
};

const findUserById = async (req, res) => {
  //* Fetch specific User from UserS table
  try {
    const id = req.params.id;
    const data = await getData(User, { id: id });
    sendSuccess(res, 200, "Successfully Fetched", data);
  } catch (error) {
    sendError(res, 404, error.message);
  }
};
const updateUser = async (req, res) => {
  //*Update User BY ID
  try {
    const id = req.params.id;
    const { email, firstName, lastName, password, age } = req.body;
    const data = await updatedData(
      User,
      { id: id },
      { email, firstName, lastName, password:await bcrypt.hash(password, 10), age }
    );
    sendSuccess(res, 200, "successfully updated!");
  } catch (error) {
    sendError(res, 404, error.message);
  }
};

const deleteUser = async (req, res) => {
  //*Delete User By ID
  try {
    const id = req.params.id;
    const data = await deletedData(User, { id: id });
    sendSuccess(res, 200, "successfully Deleted!");
  } catch (error) {
    sendError(res, 404, error.message);
  }
};

module.exports = {
  save,
  findAllUsers,
  findUserById,
  updateUser,
  findAllPaginatedUsers,
  deleteUser,
};
