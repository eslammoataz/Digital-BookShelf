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
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const validation_middleware_1 = require("../../v1/middlewares/validation.middleware");
const user_dto_1 = require("../../v1/users/dto/user.dto");
const UserWithThatEmailAlreadyExistsException_1 = require("../exceptions/UserWithThatEmailAlreadyExistsException");
const WrongCredentialsException_1 = require("../exceptions/WrongCredentialsException");
const user_model_1 = require("./../users/user.model");
const logIn_dto_1 = require("./dto/logIn.dto");
const authentication_service_1 = require("./authentication.service");
const forgetPassword_dto_1 = require("./dto/forgetPassword.dto");
const expressAsyncHandler = require("express-async-handler");
const userForgetPasswordNotFoundException_1 = require("../../v1/exceptions/userForgetPasswordNotFoundException");
const sendEmailWhenForgetPassword_1 = require("./mail/sendEmailWhenForgetPassword");
const NotificationService_1 = require("../../Notifications/NotificationService");
const resetPasswordDto_1 = require("./dto/resetPasswordDto");
const passwordNotMatchedException_1 = require("../../v1/exceptions/passwordNotMatchedException");
const resetPasswordTokenNotValid_1 = require("../../v1/exceptions/resetPasswordTokenNotValid");
class AuthenticationController {
    constructor() {
        this.path = '/auth';
        this.router = express.Router();
        this.user = user_model_1.default;
        this.AuthenticationService = new authentication_service_1.default();
        this.registration = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const userData = request.body;
            if (yield this.user.findOne({ where: { email: userData.email } })) {
                next(new UserWithThatEmailAlreadyExistsException_1.default(userData.email));
            }
            else {
                const hashedPassword = yield bcrypt.hash(userData.password, 10);
                const user = yield this.user.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
                user.password = undefined;
                const tokenData = this.createToken(user);
                response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
                response.send(user);
            }
        });
        this.loggingIn = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const logInData = request.body;
            const user = yield this.user.findOne({ where: { email: logInData.email } });
            if (user) {
                const isPasswordMatching = yield bcrypt.compare(logInData.password, user.password);
                if (isPasswordMatching) {
                    user.password = undefined;
                    const tokenData = this.createToken(user);
                    response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
                    response.json({ tokenData, user });
                }
                else {
                    next(new WrongCredentialsException_1.default());
                }
            }
            else {
                next(new WrongCredentialsException_1.default());
            }
        });
        this.forgetPassword = expressAsyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            // TODO: Validate the email address and make sure it belongs to a registered user
            const emailUser = request.body;
            // TODO: Generate a unique token and save it to the user's account
            const { user, resetToken } = yield this.AuthenticationService.saveTokenToUserAccount(emailUser.email);
            if (!user)
                return next(new userForgetPasswordNotFoundException_1.default(emailUser.email));
            // TODO: Send an email to the user with a link to reset their password
            const mailSender = new sendEmailWhenForgetPassword_1.default(resetToken).IntializeMail();
            const Notify = new NotificationService_1.default();
            Notify.Services = [mailSender];
            Notify.Notify();
            response.send(user);
        }));
        this.resetPassword = expressAsyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const token = request.params.token;
            if (!token)
                return next(new resetPasswordTokenNotValid_1.default());
            let user = yield this.AuthenticationService.checkTokenIsCorrect(token);
            if (!user)
                return next(new resetPasswordTokenNotValid_1.default());
            const newPassword = request.body;
            const success = yield this.AuthenticationService.saveNewPassword(newPassword, user);
            if (!success)
                return next(new passwordNotMatchedException_1.default());
            user.password = undefined;
            response.send(user);
        }));
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, (0, validation_middleware_1.default)(user_dto_1.default), this.registration);
        this.router.post(`${this.path}/login`, (0, validation_middleware_1.default)(logIn_dto_1.default), this.loggingIn);
        this.router.post(`${this.path}/forgetpassword`, (0, validation_middleware_1.default)(forgetPassword_dto_1.default), this.forgetPassword);
        this.router.post(`${this.path}/resetpassword/:token`, (0, validation_middleware_1.default)(resetPasswordDto_1.default), this.resetPassword);
    }
    createToken(user) {
        const expiresIn = 60 * 60; // an hour
        const secret = process.env.JWT_SECRET_KEY;
        const dataStoredInToken = {
            _id: String(user.id),
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }
    createCookie(tokenData) {
        return `Authorization=${tokenData.token};ww HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }
}
exports.default = AuthenticationController;
//# sourceMappingURL=authentication.controller.js.map