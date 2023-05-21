const { User } = require("@models");
const { sendError } = require("@utils/ErrorMessage");
const { sendSuccess } = require("@utils/SendSuccess");
const {
  getData,
  createData,
  updatedData,
  deletedData,
  getPaginatedData,
} = require("../utils/GenericMethods");

const save = async (req, res) => {
  //* Saves user into the database.
  const { email, firstName, lastName, password, age } = req.body;
  try {
    const data = await createData(User, { email, firstName, lastName, age });
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
      { email, firstName, lastName, password, age  }
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
  deleteUser
};