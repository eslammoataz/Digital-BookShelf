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
const book_model_1 = require("../Book/book.model");
const categories_model_1 = require("./categories.model");
class CategoryService {
    constructor() {
        this.Books = book_model_1.default;
        this.Category = categories_model_1.default;
        this.getAllCategories = () => {
            const categories = this.Category.findAll({
                include: this.Books
            });
            return categories;
        };
        this.getBooksByCategoryId = ((categoryId) => __awaiter(this, void 0, void 0, function* () {
            const books = yield this.Books.findAll({
                where: { categoryId: categoryId },
            });
            return books;
        }));
        this.createCategory = (CategoryData) => __awaiter(this, void 0, void 0, function* () {
            return yield this.Category.create(CategoryData);
        });
        this.deleteCategory = (id) => __awaiter(this, void 0, void 0, function* () {
            const deleteCategory = yield this.Category.destroy({
                where: {
                    id: id
                }
            });
            return deleteCategory;
        });
        this.updateCategory = (id, updateData) => __awaiter(this, void 0, void 0, function* () {
            const updateCategory = yield this.Category.update(updateData, {
                where: {
                    id: id
                }
            });
            return updateCategory;
        });
    }
}
exports.default = CategoryService;
//# sourceMappingURL=categories.service.js.map