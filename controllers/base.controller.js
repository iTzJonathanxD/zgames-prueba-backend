const catchControllerAsync = require("../utils/catch-controller-async");
const { appResponse } = require("../utils/app-response");

module.exports = class BaseController {
  constructor(service) {
    this.service = service;
  }

  findAll = catchControllerAsync(async (req, res) => {
    const { page, limit, ...filter } = req.query;
    const result = await this.service.getAll(filter, { limit, page });
    return appResponse(res, {
      statusCode: 200,
      status: "success",
      message: "Entities fetched successfully",
      data: result.data,
      totalCount: result.total,
    });
  });

  findById = catchControllerAsync(async (req, res) => {
    const { id } = req.params;
    const result = await this.service.getOne(id);
    if (!result) {
      return appResponse(res, {
        statusCode: 404,
        status: "fail",
        message: "Entity not found",
      });
    }
    return appResponse(res, {
      statusCode: 200,
      status: "success",
      message: "Entity fetched successfully",
      data: result,
    });
  });

  create = catchControllerAsync(async (req, res) => {
    const { body } = req;
    const result = await this.service.create(body);
    return appResponse(res, {
      statusCode: 201,
      status: "success",
      message: "Entity created successfully",
      data: result,
    });
  });

  update = catchControllerAsync(async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const result = await this.service.update(id, body);
    if (!result) {
      return appResponse(res, {
        statusCode: 404,
        status: "fail",
        message: "Entity not found for update",
      });
    }
    return appResponse(res, {
      statusCode: 200,
      status: "success",
      message: "Entity updated successfully",
      data: result,
    });
  });

  delete = catchControllerAsync(async (req, res) => {
    const { id } = req.params;
    const result = await this.service.delete(id);
    if (!result) {
      return appResponse(res, {
        statusCode: 404,
        status: "fail",
        message: "Entity not found for deletion",
      });
    }
    return appResponse(res, {
      statusCode: 200,
      status: "success",
      message: "Entity deleted successfully",
      data: null,
    });
  });
};
