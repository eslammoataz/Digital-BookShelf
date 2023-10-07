"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class UserWithThatEMailNotFound extends HttpException_1.default {
    constructor(email) {
        super(404, `User with email ${email} not found - you should register first`);
    }
}
exports.default = UserWithThatEMailNotFound;
//# sourceMappingURL=UserWithThatEmailNotFound.js.map