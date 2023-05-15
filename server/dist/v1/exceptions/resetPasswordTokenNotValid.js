"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class resetPasswordTokenNotValid extends HttpException_1.default {
    constructor() {
        super(400, `Token not valid maybe expired`);
    }
}
exports.default = resetPasswordTokenNotValid;
//# sourceMappingURL=resetPasswordTokenNotValid.js.map