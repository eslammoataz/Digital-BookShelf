import * as dotenv from 'dotenv';
import AuthenticationController from './v1/authentication/authentication.controller';
import App from './app';
import BookController from './v1/Book/books.controller';
import CategoriesController from './v1/categories/categories.controller';
import UserController from './v1/users/user.controller';
import AuthorController from './v1/Author/author.controller';
import ReviewsController from './v1/Reviews/reviews.controller';

dotenv.config();
const app = new App(
  [
    new UserController(),
    new BookController(),
    new AuthenticationController(),
    new CategoriesController(),
    new AuthorController(),
    new ReviewsController(),
  ],
  process.env.PORT
);

app.listen();
