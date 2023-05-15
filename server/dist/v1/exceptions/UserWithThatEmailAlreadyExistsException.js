"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class UserWithThatEmailAlreadyExistsException extends HttpException_1.default {
    constructor(id) {
        super(404, `User with email ${id} already exist`);
    }
}
exports.default = UserWithThatEmailAlreadyExistsException;
//# sourceMappingURL=UserWithThatEmailAlreadyExistsException.js.map