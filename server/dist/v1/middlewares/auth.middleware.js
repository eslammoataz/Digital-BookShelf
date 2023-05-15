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
function authMiddleware(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const cookies = request.cookies;
        if (cookies && cookies.Authorization) {
            const secret = "process.env.JWT_SECRET";
            try {
                const verificationResponse = jwt.verify(cookies.Authorization, secret);
                const id = verificationResponse._id;
                const user = yield user_model_1.default.findByPk(id);
                if (user) {
                    request.user = user;
                    next();
                }
                else {
                    next(new WrongAuthenticationTokenException_1.default());
                }
            }
            catch (error) {
                next(new WrongAuthenticationTokenException_1.default());
            }
        }
        else {
            next(new AuthenticationTokenMissingException_1.default());
        }
    });
}
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map