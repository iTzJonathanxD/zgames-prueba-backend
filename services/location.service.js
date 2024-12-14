const BaseService = require("./base.service");

let _location = null;

module.exports = class LocationService extends BaseService {
  constructor({ Location }) {
    super(Location);
    _location = Location;
  }

  async findByCityAndCountry(city, country) {
    if (!city || !country) {
      throw new AppError("City and country are required", 400);
    }

    const location = await _location.findOne({ city, country });
    if (!location) {
      throw new AppError("Location not found", 404);
    }

    return location;
  }

  async createOrFindLocation(data) {
    const { country, city, address } = data;

    if (!country || !city || !address) {
      throw new AppError("Country, city, and address are required", 400);
    }

    let location = await _location.findOne({ country, city, address });

    if (!location) {
      location = await this.create(data);
    }

    return location;
  }
};
