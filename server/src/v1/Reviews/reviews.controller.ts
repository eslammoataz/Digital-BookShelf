import * as express from 'express';
// import UserData from './user.interface';
import UserNotFoundException from '../exceptions/userNotFoundException';
import NotAllowedToDoThisAction from '../exceptions/NotAllowedToDoThisAction';
import * as asyncHandler from 'express-async-handler';
import Controller from '../interfaces/controller.interface';
// import UserService from './user.service';
// import { Request } from 'express';
import RequestWithUser from '../interfaces/requestWithUser.interface';
// import User from '../user.model';
import Reviews from './reviews.model';
import ReviewService from './reviews.service';
import ReviewInterface from './reviews.interface';
import authMiddleware from '../middlewares/auth.middleware';

class ReviewsController implements Controller {
  public path = '/reviews';
  public router = express.Router();
  public ReviewService = new ReviewService();
  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.post(`${this.path}/:bookId`, authMiddleware, this.addReview);
    this.router.get(`${this.path}/:bookId`, authMiddleware, this.getReviews);
    this.router.delete(
      `${this.path}/:reviewId`,
      authMiddleware,
      this.deleteReview
    );
  }

  private addReview = asyncHandler(
    async (
      request: RequestWithUser,
      response: express.Response,
      next: express.NextFunction
    ) => {
      const reviewData: ReviewInterface = request.body;
      reviewData.bookId = parseInt(request.params.bookId);
      const userId = request.user.id;
      reviewData.userId = userId;
      const review = await this.ReviewService.addReview(reviewData);
      response.json(review);
    }
  );

  private getReviews = asyncHandler(
    async (
      request: RequestWithUser,
      response: express.Response,
      next: express.NextFunction
    ) => {
      const bookId = parseInt(request.params.bookId);
      console.log(request.params.bookId);
      const review = await this.ReviewService.getReviews(bookId);
      response.json(review);
    }
  );

  private deleteReview = asyncHandler(
    async (
      request: RequestWithUser,
      response: express.Response,
      next: express.NextFunction
    ) => {
      const reviewId = parseInt(request.params.reviewId);

      const review = await this.ReviewService.deleteReview(reviewId);

      response.send('Review deleted successfully');
    }
  );
}

export default ReviewsController;
