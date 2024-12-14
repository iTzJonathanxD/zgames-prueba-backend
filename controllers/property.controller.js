const BaseController = require("./base.controller");
const catchControllerAsync = require("../utils/catch-controller-async");
const { appResponse } = require("../utils/handleHttpResponse");

let _propertyService = null;

module.exports = class PropertyController extends BaseController {
  constructor({ PropertyService }) {
    super(PropertyService);
    _propertyService = PropertyService;
  }
  getWithLocation = catchControllerAsync(async (req, res) => {
    const result = await this.service.getPropertiesWithLocation();
    res.status(200).send(result);
  });

  findPropertiesByOwner = catchControllerAsync(async (req, res) => {
    const { ownerId } = req.params;
    try {
      const properties = await _propertyService.findAll({ owner: ownerId });

      if (!properties || properties.length === 0) {
        return appResponse(res, {
          statusCode: 404,
          status: "fail",
          message: `No properties found for owner with ID ${ownerId}`,
        });
      }

      return appResponse(res, {
        statusCode: 200,
        status: "success",
        message: "Properties retrieved successfully",
        data: { properties },
      });
    } catch (error) {
      return appResponse(res, {
        statusCode: 500,
        status: "error",
        message: error.message,
      });
    }
  });
};
