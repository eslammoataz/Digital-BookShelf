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
const sequelize_1 = require("sequelize");
const book_model_1 = require("./book.model");
const categories_model_1 = require("../categories/categories.model");
const tags_model_1 = require("../tags/tags.model");
class BookService {
    constructor() {
        this.Books = book_model_1.default;
        this.Category = categories_model_1.default;
        this.tags = tags_model_1.default;
        this.getAllBooks = (page) => {
            const booksPerPage = 20;
            const offset = (page - 1) * booksPerPage;
            const books = this.Books.findAll({
                include: [
                    {
                        model: this.Category,
                        attributes: ["name"],
                    },
                ],
                limit: booksPerPage,
                offset: offset,
            });
            return books;
        };
        this.getBooksBySearch = (searchWord, page) => __awaiter(this, void 0, void 0, function* () {
            const booksPerPage = 20;
            const offset = (page - 1) * booksPerPage;
            const books = yield this.Books.findAll({
                where: {
                    name: { [sequelize_1.Op.like]: `%${searchWord}%` },
                },
            });
            return books;
        });
        this.getBookById = (bookId) => __awaiter(this, void 0, void 0, function* () {
            const book = yield this.Books.findOne({
                where: { id: bookId },
                include: [
                    {
                        model: this.Category,
                        attributes: ["name"],
                    },
                ],
            });
            const tags = yield book.getTags({ attributes: ["name"] });
            const tagNames = tags.map((tag) => tag.name);
            book['tags'] = tagNames;
            return { book };
        });
        this.createBook = (BookData, tagNames) => __awaiter(this, void 0, void 0, function* () {
            const createdProject = this.Books.create(Object.assign({}, BookData));
            const tags = Promise.all(tagNames.map((name) => this.tags.findOrCreate({ where: { name } })));
            const data = yield Promise.all([createdProject, tags]);
            const tagIds = data[1].map((tag) => tag[0].id);
            yield Promise.all([tagIds.forEach((tagId) => data[0].setTags(tagId))]);
            return createdProject;
            return yield this.Books.create(BookData);
        });
        this.deleteBook = (id) => __awaiter(this, void 0, void 0, function* () {
            const deleteBook = yield this.Books.destroy({
                where: {
                    id: id,
                },
            });
            return deleteBook;
        });
        this.updateBook = (id, updateData) => __awaiter(this, void 0, void 0, function* () {
            const updateBook = yield this.Books.update(updateData, {
                where: {
                    id: id,
                },
            });
            return updateBook;
        });
    }
}
exports.default = BookService;
//# sourceMappingURL=books.service.js.map