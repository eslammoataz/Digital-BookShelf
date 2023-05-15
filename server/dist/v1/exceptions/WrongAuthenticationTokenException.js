"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class WrongAuthenticationTokenException extends HttpException_1.default {
    constructor() {
        super(401, `Wrong Auuthenticatin Token`);
    }
}
exports.default = WrongAuthenticationTokenException;
//# sourceMappingURL=WrongAuthenticationTokenException.js.map