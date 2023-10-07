"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class AuthorNotFound extends HttpException_1.default {
    constructor(email) {
        super(404, `Author with that ${email} not found`);
    }
}
exports.default = AuthorNotFound;
//# sourceMappingURL=AuthorNotFound.js.map