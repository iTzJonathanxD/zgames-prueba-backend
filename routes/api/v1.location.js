const { Router } = require("express");

module.exports = function ({ LocationController }) {
  const router = Router();

  router.get("/get-all", LocationController.findAll);
  router.get("/get/:id", LocationController.findById);
  router.post("/create", LocationController.create);
  router.put("/update/:id", LocationController.update);
  router.delete("/delete/:id", LocationController.delete);

  router.get("/find", LocationController.findByCityAndCountry);

  return router;
};
