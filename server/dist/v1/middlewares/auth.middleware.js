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
const jwt = require("jsonwebtoken");
const AuthenticationTokenMissingException_1 = require("../../v1/exceptions/AuthenticationTokenMissingException");
const WrongAuthenticationTokenException_1 = require("../../v1/exceptions/WrongAuthenticationTokenException");
const user_model_1 = require("../users/user.model");
const expressAsyncHandler = require("express-async-handler");
const authMiddleware = expressAsyncHandler((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = request.cookies;
    let token;
    if (request.headers.authorization &&
        request.headers.authorization.startsWith("Bearer")) {
        token = request.headers.authorization.split(" ")[1];
    }
    else if (cookies && cookies.Authorization) {
        token = cookies.Authorization;
    }
    if (!token) {
        next(new AuthenticationTokenMissingException_1.default());
    }
    const secret = process.env.JWT_SECRET_KEY;
    const verificationResponse = jwt.verify(token, secret);
    console.log(verificationResponse);
    const id = verificationResponse._id;
    const user = yield user_model_1.default.findByPk(id);
    if (!user) {
        next(new WrongAuthenticationTokenException_1.default());
    }
    request.user = user;
    next();
}));
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map