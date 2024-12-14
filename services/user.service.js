const bcrypt = require("bcryptjs");
const AppError = require("../utils/app-error");

module.exports = class UserService {
  constructor({ User }) {
    this.User = User;
  }

  async createUser(data) {
    const { username, email, password } = data;

    if (!username || !email || !password) {
      throw new AppError("All fields (username, email, password) are required", 400);
    }

    const existingUser = await this.User.findOne({ email });
    if (existingUser) {
      throw new AppError("User with this email already exists", 400);
    }

    const user = await this.User.create({ username, email, password });

    return { id: user._id, username: user.username, email: user.email };
  }

  async loginUser(data) {
    const { email, password } = data;

    if (!email || !password) {
      throw new AppError("Both email and password are required", 400);
    }

    const user = await this.User.findOne({ email });
    if (!user || user.password !== password) {
      throw new AppError("Invalid credentials", 401);
    }

    return { id: user._id, email: user.email, username: user.username };
  }

  async getAllUsers(limit = 10, pageNum = 1) {
    const pagination = limit * (pageNum - 1);
    const totalCount = await this.User.countDocuments();
    const users = await this.User.find()
      .select("-password")
      .lean()
      .skip(pagination)
      .limit(limit);

    return { data: users, totalCount };
  }

  async getUserById(id) {
    if (!id) {
      throw new AppError("Id must be sent", 400);
    }

    const user = await this.User.findById(id).select("-password");
    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }

  async updateUser(id, data) {
    if (!id) {
      throw new AppError("Id must be sent", 400);
    }

    const updatedUser = await this.User.findByIdAndUpdate(id, data, { new: true });
    if (!updatedUser) {
      throw new AppError("User not found", 404);
    }

    return updatedUser;
  }

  async deleteUser(id) {
    if (!id) {
      throw new AppError("Id must be sent", 400);
    }

    const deletedUser = await this.User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new AppError("User not found", 404);
    }

    return deletedUser;
  }
};
