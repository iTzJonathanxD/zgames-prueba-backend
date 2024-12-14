const { Router } = require("express");

module.exports = function ({ ReservationController }) {
  const router = Router();

  router.get("/get-all", ReservationController.findAll);
  router.get("/get/:id", ReservationController.findById);
  router.post("/create", ReservationController.create);
  router.put("/update/:id", ReservationController.update);
  router.delete("/delete/:id", ReservationController.delete);

  router.get("/get-all-reservacion", ReservationController.getWithReservacion);

  return router;
};
