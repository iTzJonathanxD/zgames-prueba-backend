const { Router } = require("express");

module.exports = function ({ ReviewController }) {
  const router = Router();

  router.get("/get-all", ReviewController.findAll);
  router.get("/get/:id", ReviewController.findById);
  router.post("/create", ReviewController.create);
  router.put("/update/:id", ReviewController.update);
  router.delete("/delete/:id", ReviewController.delete);

  router.get("/property", ReviewController.findReviewsByProperty);

  return router;
};
