"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const authentication_controller_1 = require("./v1/authentication/authentication.controller");
const app_1 = require("./app");
const books_controller_1 = require("./v1/Book/books.controller");
const categories_controller_1 = require("./v1/categories/categories.controller");
const user_controller_1 = require("./v1/users/user.controller");
const author_controller_1 = require("./v1/Author/author.controller");
const reviews_controller_1 = require("./v1/Reviews/reviews.controller");
dotenv.config();
const app = new app_1.default([
    new user_controller_1.default(),
    new books_controller_1.default(),
    new authentication_controller_1.default(),
    new categories_controller_1.default(),
    new author_controller_1.default(),
    new reviews_controller_1.default(),
], process.env.PORT);
app.listen();
//# sourceMappingURL=server.js.map