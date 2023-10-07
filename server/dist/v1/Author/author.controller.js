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
const auth_middleware_1 = require("../middlewares/auth.middleware");
const author_service_1 = require("./author.service");
const restrictTo_middleware_1 = require("../middlewares/restrictTo.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const author_dto_1 = require("./dto/author.dto");
class AuthorController {
    constructor() {
        this.path = '/author';
        this.router = express.Router();
        this.AuthorService = new author_service_1.default();
        this.getAllAuthors = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const authors = yield this.AuthorService.getAllAuthors();
            response.status(200).send(authors);
        }));
        this.addAuthor = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const createdAuthor = yield this.AuthorService.addAuthor(request.body.email);
            response.send(createdAuthor);
        }));
        this.getAuthor = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const authorId = parseInt(request.params.id);
            const author = yield this.AuthorService.getAuthor(authorId);
            response.send(author);
        }));
        this.editAuthor = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const authorId = request.params.id;
            const AuthorData = request.body;
            const updatedAuthor = yield this.AuthorService.editAuthor(authorId, AuthorData);
            response.send(updatedAuthor);
        }));
        this.deleteAuthor = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const authorId = request.params.id;
            yield this.AuthorService.deleteAuthor(authorId);
            response.send('deleted successfully');
        }));
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(this.path, auth_middleware_1.default, (0, restrictTo_middleware_1.default)('admin'), this.getAllAuthors);
        this.router.get(`${this.path}/getauthor/:id`, auth_middleware_1.default, (0, restrictTo_middleware_1.default)('admin'), this.getAuthor);
        this.router.patch(`${this.path}/editauthor/:id`, auth_middleware_1.default, (0, restrictTo_middleware_1.default)('admin'), (0, validation_middleware_1.default)(author_dto_1.default, true), this.editAuthor);
        this.router.post(`${this.path}/addauthor`, auth_middleware_1.default, (0, restrictTo_middleware_1.default)('admin'), (0, validation_middleware_1.default)(author_dto_1.default), this.addAuthor);
        this.router.delete(`${this.path}/deleteauthor/:id`, auth_middleware_1.default, (0, restrictTo_middleware_1.default)('admin'), this.deleteAuthor);
    }
}
exports.default = AuthorController;
//# sourceMappingURL=author.controller.js.map