"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class AuthorAlreadyExists extends HttpException_1.default {
    constructor(email) {
        super(404, `Author with that ${email} Exists`);
    }
}
exports.default = AuthorAlreadyExists;
//# sourceMappingURL=AuthorAlreadyExists.js.map