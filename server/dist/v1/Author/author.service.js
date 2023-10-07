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
const author_model_1 = require("../Author/author.model");
const user_model_1 = require("../users/user.model");
const userNotFoundException_1 = require("../exceptions/userNotFoundException");
const AuthorAlreadyExists_1 = require("../exceptions/AuthorAlreadyExists");
const AuthorNotFound_1 = require("../exceptions/AuthorNotFound");
class AuthorService {
    constructor() {
        this.User = user_model_1.default;
        this.Author = author_model_1.default;
        this.getAllAuthors = () => __awaiter(this, void 0, void 0, function* () {
            const authors = yield this.Author.findAll();
            return authors;
        });
        this.addAuthor = (authorEmail) => __awaiter(this, void 0, void 0, function* () {
            const authorUser = yield this.User.findOne({
                where: { email: authorEmail },
            });
            if (!authorUser) {
                throw new userNotFoundException_1.default(authorEmail);
            }
            const authorExits = yield this.Author.findOne({
                where: { userId: authorUser.id },
            });
            if (authorExits) {
                throw new AuthorAlreadyExists_1.default(authorEmail);
            }
            const author = yield this.Author.create({
                name: authorUser.name,
                userId: authorUser.id,
            });
            return author;
        });
        this.deleteAuthor = (id) => __awaiter(this, void 0, void 0, function* () {
            const author = yield this.Author.findOne({ where: { id: id } });
            if (author == null) {
                throw new AuthorNotFound_1.default(id);
            }
            author.destroy();
            return author;
        });
        this.getAuthor = (id) => __awaiter(this, void 0, void 0, function* () {
            const author = yield this.Author.findOne({
                where: { id: id },
                include: [
                    {
                        model: this.User,
                        attributes: ['email', 'role'],
                    },
                ],
                raw: true,
            });
            if (!author) {
                throw new AuthorNotFound_1.default(id.toString());
            }
            return author;
        });
        this.editAuthor = (id, authorData) => __awaiter(this, void 0, void 0, function* () {
            let author = yield this.Author.findOne({
                where: { id: id },
            });
            if (!author) {
                throw new AuthorNotFound_1.default(id.toString());
            }
            const updatedAuthor = yield this.Author.update(authorData, {
                where: { id: id },
            });
            author = yield this.Author.findOne({
                where: { id: id },
            });
            return author;
        });
    }
}
exports.default = AuthorService;
//# sourceMappingURL=author.service.js.map