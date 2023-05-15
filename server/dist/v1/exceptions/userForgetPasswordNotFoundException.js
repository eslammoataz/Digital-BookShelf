"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class userForgetPasswordNotFoundException extends HttpException_1.default {
    constructor(email) {
        super(404, `User with this email ${email} not found`);
    }
}
exports.default = userForgetPasswordNotFoundException;
//# sourceMappingURL=userForgetPasswordNotFoundException.js.map