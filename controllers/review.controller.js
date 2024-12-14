const BaseController = require("./base.controller");
const catchControllerAsync = require("../utils/catch-controller-async");
const { success, validation } = require("../utils/handleHttpResponse");

module.exports = class ReviewController extends BaseController {
  constructor({ ReviewService }) {
    super(ReviewService);
  }

  findReviewsByProperty = catchControllerAsync(async (req, res) => {
    const { propertyId } = req.query;

    if (!propertyId) {
      return validation({
        res,
        statusCode: 400,
        title: "Validation Error",
        message: "Property ID is required",
      });
    }

    const result = await this.service.findByProperty(propertyId);

    return success({
      res,
      statusCode: 200,
      title: "Reviews Retrieved",
      message: "Reviews for the property retrieved successfully",
      data: result,
    });
  });
};
