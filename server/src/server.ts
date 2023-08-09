import * as dotenv from "dotenv";
import AuthenticationController from "./v1/authentication/authentication.controller";
import App from "./app";
import BookController from "./v1/Book/books.controller";
import CategoriesController from "./v1/categories/categories.controller";
import UserController from "./v1/users/user.controller";
dotenv.config();
const app = new App(
  [
    new UserController(),
    new BookController(),
    new AuthenticationController(),
    new CategoriesController(),
  ],
  process.env.PORT
);

app.listen();
