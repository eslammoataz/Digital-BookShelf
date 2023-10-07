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
const express = require("express");
const asyncHandler = require("express-async-handler");
const reviews_service_1 = require("./reviews.service");
const auth_middleware_1 = require("../middlewares/auth.middleware");
class ReviewsController {
    constructor() {
        this.path = '/reviews';
        this.router = express.Router();
        this.ReviewService = new reviews_service_1.default();
        this.addReview = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const reviewData = request.body;
            reviewData.bookId = parseInt(request.params.bookId);
            const userId = request.user.id;
            reviewData.userId = userId;
            const review = yield this.ReviewService.addReview(reviewData);
            response.json(review);
        }));
        this.getReviews = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const bookId = parseInt(request.params.bookId);
            console.log(request.params.bookId);
            const review = yield this.ReviewService.getReviews(bookId);
            response.json(review);
        }));
        this.deleteReview = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const reviewId = parseInt(request.params.reviewId);
            const review = yield this.ReviewService.deleteReview(reviewId);
            response.send('Review deleted successfully');
        }));
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/:bookId`, auth_middleware_1.default, this.addReview);
        this.router.get(`${this.path}/:bookId`, auth_middleware_1.default, this.getReviews);
        this.router.delete(`${this.path}/:reviewId`, auth_middleware_1.default, this.deleteReview);
    }
}
exports.default = ReviewsController;
//# sourceMappingURL=reviews.controller.js.map