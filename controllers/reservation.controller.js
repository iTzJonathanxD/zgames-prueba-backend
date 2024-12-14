const BaseController = require("./base.controller");
const catchControllerAsync = require("../utils/catch-controller-async");
const { success, error, validation } = require("../utils/handleHttpResponse");

module.exports = class ReservationController extends BaseController {
  constructor({ ReservationService }) {
    super(ReservationService);
  }

  getWithReservacion = catchControllerAsync(async (req, res) => {
    const result = await this.service.getReservacionWithLocation();
    res.status(200).send(result);
  });

  findReservationsByGuest = catchControllerAsync(async (req, res) => {
    const guestId = req.user ? req.user._id : req.query.guestId;

    if (!guestId) {
      return appResponse(res, {
        statusCode: 400,
        status: "fail",
        message: "Guest ID is required",
      });
    }

    const result = await this.service.findAll({ guest: guestId });

    return appResponse(res, {
      statusCode: 200,
      status: "success",
      data: result,
    });
  });
};
