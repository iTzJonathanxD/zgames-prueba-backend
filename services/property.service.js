const BaseService = require("./base.service");

let _property = null;

module.exports = class PropertyService extends BaseService {
  constructor({ Property }) {
    super(Property);
    _property = Property;
  }
  getPropertiesWithLocation = async () => {
    return await this.model.find().populate("location");
  };  
};
