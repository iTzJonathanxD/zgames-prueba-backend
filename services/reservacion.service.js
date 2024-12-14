const BaseService = require("./base.service");

let _reservation = null;

module.exports = class ReservationService extends BaseService {
  constructor({ Reservation }) {
    super(Reservation);
    _reservation = Reservation;
  }
  getReservacionWithLocation = async () => {
    return await this.model.find().populate("property", "user");
  };  

};
