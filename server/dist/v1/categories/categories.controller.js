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
const categories_dto_1 = require("./dto/categories.dto");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const restrictTo_middleware_1 = require("../middlewares/restrictTo.middleware");
const categories_service_1 = require("./categories.service");
class CategoriesController {
    constructor() {
        this.path = '/categories';
        this.router = express.Router();
        this.categoryService = new categories_service_1.default();
        this.getAllCategories = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryService.getAllCategories();
            response.status(200).send(category);
        }));
        this.getCategoryById = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const Book = yield this.categoryService.getBooksByCategoryId(id);
            console.log(Book);
            if (!Book.length)
                return next(new bookNotFoundException_1.default(id));
            response.status(200).json(Book);
        }));
        this.modifyCategory = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            // const id = request.params.id;
            // const bookData: Category = request.body;
            // const updateBook = await this.BookService.updateBook(id, bookData);
            // if (!updateBook) return next(new BookNotFoundException(id))
            // const mailSender = new sendEmailWhenUpdateBook().IntializeMail()
            // const Notify = new NotificationService()
            // Notify.Services = [mailSender]
            // Notify.Notify()
            // response.sendStatus(204);
        }));
        this.createCategory = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const CategoryData = request.body;
            const createdCategory = yield this.categoryService.createCategory(CategoryData);
            // const mailSender = new sendEmailWhenCreateBook().IntializeMail()
            // const Notify = new NotificationService()
            // Notify.Services = [mailSender]
            // Notify.Notify()
            response.send(createdCategory);
        }));
        this.deleteCategory = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            // const id = request.params.id;
            // const Book = await this.BookService.deleteBook(id)
            // if (!Book) return next(new BookNotFoundException(id))
            // const mailSender = new sendEmailWhenDeleteBook().IntializeMail()
            // const Notify = new NotificationService()
            // Notify.Services = [mailSender]
            // Notify.Notify()
            // response.sendStatus(204);
        }));
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(this.path, this.getAllCategories);
        this.router.get(`${this.path}/:id`, this.getCategoryById);
        this.router.patch(`${this.path}/:id`, auth_middleware_1.default, (0, validation_middleware_1.default)(categories_dto_1.default, true), this.modifyCategory);
        this.router.delete(`${this.path}/:id`, auth_middleware_1.default, this.deleteCategory);
        this.router.post(this.path, auth_middleware_1.default, (0, restrictTo_middleware_1.default)('admin'), (0, validation_middleware_1.default)(categories_dto_1.default), this.createCategory);
    }
}
exports.default = CategoriesController;
//# sourceMappingURL=categories.controller.js.map