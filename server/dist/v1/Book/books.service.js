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
const book_model_1 = require("./book.model");
const categories_model_1 = require("../categories/categories.model");
class BookService {
    constructor() {
        this.Books = book_model_1.default;
        this.Category = categories_model_1.default;
        this.getAllBooks = () => {
            const books = this.Books.findAll({
                include: [{
                        model: this.Category,
                        attributes: ['name']
                    }]
            });
            return books;
        };
        this.getBookById = ((bookId) => __awaiter(this, void 0, void 0, function* () {
            return this.Books.findOne({
                where: { id: bookId },
                include: [{
                        model: this.Category,
                        attributes: ['name']
                    }]
            });
        }));
        this.createBook = (BookData) => __awaiter(this, void 0, void 0, function* () {
            return yield this.Books.create(BookData);
        });
        this.deleteBook = (id) => __awaiter(this, void 0, void 0, function* () {
            const deleteBook = yield this.Books.destroy({
                where: {
                    id: id
                }
            });
            return deleteBook;
        });
        this.updateBook = (id, updateData) => __awaiter(this, void 0, void 0, function* () {
            const updateBook = yield this.Books.update(updateData, {
                where: {
                    id: id
                }
            });
            return updateBook;
        });
    }
}
exports.default = BookService;
//# sourceMappingURL=books.service.js.map