"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class PasswordNotMatchedException extends HttpException_1.default {
    constructor() {
        super(400, `password and password confirm not matched`);
    }
}
exports.default = PasswordNotMatchedException;
//# sourceMappingURL=passwordNotMatchedException.js.map