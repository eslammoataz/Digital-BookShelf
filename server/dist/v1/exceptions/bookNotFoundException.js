"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class BookNotFoundException extends HttpException_1.default {
    constructor(id) {
        super(404, `Book with id ${id} not found`);
    }
}
exports.default = BookNotFoundException;
//# sourceMappingURL=bookNotFoundException.js.map