import Reviews from './reviews.model';

interface Review {
  comment: string;
  rating: number;
  userId: number;
  bookId: number;
}

export default Review;
