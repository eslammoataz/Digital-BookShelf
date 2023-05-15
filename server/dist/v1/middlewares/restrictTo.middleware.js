"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const expressAsyncHandler = require("express-async-handler");
const NotAllowedToDoThisAction_1 = require("../../v1/exceptions/NotAllowedToDoThisAction");
const restrictTo = (...roles) => expressAsyncHandler((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(request.user.role)) {
        return next(new NotAllowedToDoThisAction_1.default());
    }
    next();
}));
exports.default = restrictTo;
//# sourceMappingURL=restrictTo.middleware.js.map