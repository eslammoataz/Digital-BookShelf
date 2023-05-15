"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const authentication_controller_1 = require("./v1/authentication/authentication.controller");
const app_1 = require("./app");
const books_controller_1 = require("./v1/Book/books.controller");
const categories_controller_1 = require("./v1/categories/categories.controller");
dotenv.config();
const app = new app_1.default([
    new books_controller_1.default(),
    new authentication_controller_1.default(),
    new categories_controller_1.default()
], process.env.PORT);
app.listen();
//# sourceMappingURL=server.js.map