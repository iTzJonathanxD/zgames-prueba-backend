const { Router } = require("express");

module.exports = function ({ PropertyController }) {
  const router = Router();

  router.get("/get-all", PropertyController.findAll);
  router.get("/get/:id", PropertyController.findById);
  router.post("/create", PropertyController.create);
  router.put("/update/:id", PropertyController.update);
  router.delete("/delete/:id", PropertyController.delete);

  router.get("/get-all-location", PropertyController.getWithLocation);

  return router;
};
