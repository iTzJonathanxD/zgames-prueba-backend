const BaseService = require("./base.service");
const AppError = require("../utils/app-error");

let _review = null;

module.exports = class ReviewService extends BaseService {
  constructor({ Review }) {
    super(Review);
    _review = Review;
  }

  async findByProperty(propertyId) {
    if (!propertyId) {
      throw new AppError("Property ID is required", 400);
    }

    const reviews = await _review.find({ property: propertyId }).populate("guest", "username");
    return reviews;
  }

  async createReview(data) {
    const { guest, property, rating, comment } = data;

    if (!guest || !property || !rating) {
      throw new AppError("Guest, property, and rating are required", 400);
    }

    const existingReview = await _review.findOne({ guest, property });

    if (existingReview) {
      throw new AppError("Guest has already reviewed this property", 400);
    }

    const review = await this.create({ guest, property, rating, comment });
    return review;
  }

  async updateReview(reviewId, data) {
    const { rating, comment } = data;

    if (!rating && !comment) {
      throw new AppError("At least one field (rating or comment) is required", 400);
    }

    const updatedReview = await this.updateById(reviewId, data);
    return updatedReview;
  }

  async deleteReviewByPropertyAndGuest(propertyId, guestId) {
    if (!propertyId || !guestId) {
      throw new AppError("Property ID and Guest ID are required", 400);
    }

    const deletedReview = await _review.findOneAndDelete({ property: propertyId, guest: guestId });
    if (!deletedReview) {
      throw new AppError("Review not found", 404);
    }

    return { message: "Review deleted successfully" };
  }
};
