"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class NotAllowedToDoThisAction extends HttpException_1.default {
    constructor() {
        super(403, `You do not have permission to perform this action`);
    }
}
exports.default = NotAllowedToDoThisAction;
//# sourceMappingURL=NotAllowedToDoThisAction.js.map