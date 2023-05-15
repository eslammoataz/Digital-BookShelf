"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class WrongCredentialsException extends HttpException_1.default {
    constructor() {
        super(404, `Email or your password Wrong credentials`);
    }
}
exports.default = WrongCredentialsException;
//# sourceMappingURL=WrongCredentialsException.js.map