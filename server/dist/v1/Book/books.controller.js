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
const bookNotFoundException_1 = require("../exceptions/bookNotFoundException");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const Book_dto_1 = require("./dto/Book.dto");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const restrictTo_middleware_1 = require("../middlewares/restrictTo.middleware");
const sendEmailWhenCreateBook_1 = require("./mail/sendEmailWhenCreateBook");
const sendEmailWhenDeleteBook_1 = require("./mail/sendEmailWhenDeleteBook");
const sendEmailWhenUpdateBook_1 = require("./mail/sendEmailWhenUpdateBook");
const NotificationService_1 = require("../../Notifications/NotificationService");
const books_service_1 = require("./books.service");
class BooksController {
    constructor() {
        this.path = '/books';
        this.router = express.Router();
        this.BookService = new books_service_1.default();
        this.getAllBooks = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const Books = yield this.BookService.getAllBooks();
            response.status(200).json({ page: 'page1 fdfdfs', data: Books });
        }));
        this.getBookById = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const Book = yield this.BookService.getBookById(id);
            if (!Book)
                return next(new bookNotFoundException_1.default(id));
            response.status(200).json(Book);
        }));
        this.modifyBook = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const bookData = request.body;
            const updateBook = yield this.BookService.updateBook(id, bookData);
            if (!updateBook)
                return next(new bookNotFoundException_1.default(id));
            const mailSender = new sendEmailWhenUpdateBook_1.default().IntializeMail();
            const Notify = new NotificationService_1.default();
            Notify.Services = [mailSender];
            Notify.Notify();
            response.sendStatus(204);
        }));
        this.createBook = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const BookData = request.body;
            const createdBook = yield this.BookService.createBook(BookData);
            const mailSender = new sendEmailWhenCreateBook_1.default().IntializeMail();
            const Notify = new NotificationService_1.default();
            Notify.Services = [mailSender];
            Notify.Notify();
            response.send(createdBook);
        }));
        this.deleteBook = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const Book = yield this.BookService.deleteBook(id);
            if (!Book)
                return next(new bookNotFoundException_1.default(id));
            const mailSender = new sendEmailWhenDeleteBook_1.default().IntializeMail();
            const Notify = new NotificationService_1.default();
            Notify.Services = [mailSender];
            Notify.Notify();
            response.sendStatus(204);
        }));
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(this.path, this.getAllBooks);
        this.router.get(`${this.path}/:id`, this.getBookById);
        this.router.patch(`${this.path}/:id`, auth_middleware_1.default, (0, validation_middleware_1.default)(Book_dto_1.default, true), this.modifyBook);
        this.router.delete(`${this.path}/:id`, auth_middleware_1.default, this.deleteBook);
        this.router.post(this.path, auth_middleware_1.default, (0, restrictTo_middleware_1.default)('admin'), (0, validation_middleware_1.default)(Book_dto_1.default), this.createBook);
    }
}
exports.default = BooksController;
//# sourceMappingURL=books.controller.js.map