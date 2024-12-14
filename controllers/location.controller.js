const BaseController = require("./base.controller");
const catchControllerAsync = require("../utils/catch-controller-async");
const { success, validation } = require("../utils/handleHttpResponse");

module.exports = class LocationController extends BaseController {
  constructor({ LocationService }) {
    super(LocationService);
  }

  
  findByCityAndCountry = catchControllerAsync(async (req, res) => {
    const { city, country } = req.query;

    if (!city || !country) {
      return validation({
        res,
        statusCode: 400,
        title: "Validation Error",
        message: "City and country are required",
      });
    }

    const result = await this.service.findByCityAndCountry(city, country);

    return success({
      res,
      statusCode: 200,
      title: "Location Retrieved",
      message: "Location details retrieved successfully",
      data: result,
    });
  });
};
