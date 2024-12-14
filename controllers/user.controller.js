const AppError = require("../utils/app-error");

module.exports = class UserController {
  constructor({ UserService }) {
    this.userService = UserService;
  }

  createUser = async (req, res, next) => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      next(error);
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const result = await this.userService.loginUser(req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  getAllUsers = async (req, res, next) => {
    try {
      const { page, limit } = req.query;
      const users = await this.userService.getAllUsers(limit, page);
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedUser = await this.userService.updateUser(id, req.body);
      res.status(200).send(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedUser = await this.userService.deleteUser(id);
      res.status(200).send(deletedUser);
    } catch (error) {
      next(error);
    }
  };
};
