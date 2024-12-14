const { Router } = require("express");

module.exports = function ({ UserController }) {
  const router = Router();

  router.post("/create", UserController.createUser);
  router.post("/login", UserController.loginUser);
  router.get("/get-all", UserController.getAllUsers);
  router.get("/get/:id", UserController.getUserById);
  router.put("/update/:id", UserController.updateUser);
  router.delete("/delete/:id", UserController.deleteUser);

  return router;
};
