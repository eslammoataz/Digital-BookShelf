import { where } from 'sequelize';
import ReviewData from './reviews.interface';
import ReviewModel from './reviews.model';
import * as bcrypt from 'bcrypt';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import User from '../users/user.model';
import Book from '../Book/book.model';

class ReviewService {
  private Review = ReviewModel;

  public getReviews = async (bookId: number) => {
    const reviews = this.Review.findAll({
      where: {
        bookId: bookId,
      },
      include: [User],
    });

    return reviews;
  };

  public addReview = async (ReviewData: ReviewData) => {
    const review = await this.Review.create(ReviewData as any);
    return review;
  };

  public deleteReview = async (reviewID: number) => {
    const review = await this.Review.findOne({ where: { id: reviewID } });

    if (!review) throw new Error('Review not found');

    review.destroy();
    return;
  };
}

export default ReviewService;
