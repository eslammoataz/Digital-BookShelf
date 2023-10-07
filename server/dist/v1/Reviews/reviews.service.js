"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const reviews_model_1 = require("./reviews.model");
const user_model_1 = require("../users/user.model");
class ReviewService {
    constructor() {
        this.Review = reviews_model_1.default;
        this.getReviews = (bookId) => __awaiter(this, void 0, void 0, function* () {
            const reviews = this.Review.findAll({
                where: {
                    bookId: bookId,
                },
                include: [user_model_1.default],
            });
            return reviews;
        });
        this.addReview = (ReviewData) => __awaiter(this, void 0, void 0, function* () {
            const review = yield this.Review.create(ReviewData);
            return review;
        });
        this.deleteReview = (reviewID) => __awaiter(this, void 0, void 0, function* () {
            const review = yield this.Review.findOne({ where: { id: reviewID } });
            if (!review)
                throw new Error('Review not found');
            review.destroy();
            return;
        });
    }
}
exports.default = ReviewService;
//# sourceMappingURL=reviews.service.js.map