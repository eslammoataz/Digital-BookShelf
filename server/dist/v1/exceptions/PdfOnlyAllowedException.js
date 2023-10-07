"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class PdfOnlyAllowedException extends HttpException_1.default {
    constructor() {
        super(400, `Only PDF Allowed`);
    }
}
exports.default = PdfOnlyAllowedException;
//# sourceMappingURL=PdfOnlyAllowedException.js.map