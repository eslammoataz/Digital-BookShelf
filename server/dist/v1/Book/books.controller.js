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
const books_service_1 = require("./books.service");
const uploadMiddleware_1 = require("../middlewares/uploadMiddleware");
const firebase_upload_1 = require("../../firebase.upload");
class BooksController {
    constructor() {
        this.path = '/books';
        this.router = express.Router();
        this.BookService = new books_service_1.default();
        this.createBook = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const BookData = request.body;
            const tagNames = BookData.tags;
            BookData.cover_book = request.body.downloadURL;
            const createdBook = yield this.BookService.createBook(BookData, tagNames);
            // // @ts-ignore
            // if (request.files && request.files.cover_book) {
            //   const imageCoverFileName = `book-${uuidv4()}-${Date.now()}-cover.webp`;
            //   try {
            //     // @ts-ignore
            //     await sharp(request.files.cover_book[0].buffer)
            //       .resize(600, 600)
            //       .toFormat('webp')
            //       .webp({ quality: 85 })
            //       .toFile(`uploads/products/${imageCoverFileName}`);
            //     request.body.imageCover = imageCoverFileName;
            //   } catch (error) {
            //     // Handle any errors that occurred during image processing or file saving.
            //     console.error(error);
            //     response.status(500).json({ error: 'Internal Server Error' });
            //     return;
            //   }
            // } else {
            //   // Handle the case where 'cover_book' property is missing in request.files
            //   response
            //     .status(400)
            //     .json({ error: 'Missing cover_book in request.files' });
            //   return;
            // }
            // const mailSender = new sendEmailWhenCreateBook().IntializeMail();
            // const Notify = new NotificationService();
            // Notify.Services = [mailSender];
            // Notify.Notify();
            response.send(createdBook);
        }));
        this.getAllBooks = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const page = Number(request.query.page) * 1 || 1;
            // const limit = this.queryString.limit * 1 || 12;
            // const skip = (page - 1) * limit;
            // const page = parseInt(request.query.page as string, 10);
            const Books = yield this.BookService.getAllBooks(page);
            response.status(200).json({ page: 'page1 fdfdfs', data: Books });
        }));
        this.getBookBySearch = asyncHandler((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const page = Number(req.query.page) * 1 || 1;
            const searchWord = req.query.searchWord;
            const books = yield this.BookService.getBooksBySearch(searchWord, page);
            res.status(200).json(books);
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
            // const mailSender = new sendEmailWhenUpdateBook().IntializeMail();
            // const Notify = new NotificationService();
            // Notify.Services = [mailSender];
            // Notify.Notify();
            response.sendStatus(204);
        }));
        this.deleteBook = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const Book = yield this.BookService.deleteBook(id);
            if (!Book)
                return next(new bookNotFoundException_1.default(id));
            // const mailSender = new sendEmailWhenDeleteBook().IntializeMail();
            // const Notify = new NotificationService();
            // Notify.Services = [mailSender];
            // Notify.Notify();
            response.sendStatus(200).send('Deleted successfully');
        }));
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(this.path, this.getAllBooks);
        this.router.get(this.path + '/search', this.getBookBySearch);
        this.router.get(`${this.path}/:id`, this.getBookById);
        this.router.patch(`${this.path}/:id`, auth_middleware_1.default, (0, validation_middleware_1.default)(Book_dto_1.default, true), this.modifyBook);
        this.router.delete(`${this.path}/:id`, auth_middleware_1.default, this.deleteBook);
        this.router.post(this.path, auth_middleware_1.default, (0, restrictTo_middleware_1.default)('admin'), (0, uploadMiddleware_1.uploadSingleImage)('image'), (0, validation_middleware_1.default)(Book_dto_1.default), firebase_upload_1.firebaseUpload, this.createBook);
    }
}
exports.default = BooksController;
//# sourceMappingURL=books.controller.js.map