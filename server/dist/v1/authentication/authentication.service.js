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
const DBConfig_1 = require("../../DBConfig");
const user_model_1 = require("../../v1/users/user.model");
const crypto = require("crypto");
const sequelize_1 = require("sequelize");
const bcrypt = require("bcrypt");
class AuthenticationService {
    constructor() {
        this.User = user_model_1.default;
        this.generateToken = () => __awaiter(this, void 0, void 0, function* () {
            const reset = crypto.randomBytes(32).toString('hex');
            const tokenDatabase = crypto
                .createHash('sha256')
                .update(reset)
                .digest('hex');
            const passwordResetExpire = Date.now() + 10 * 60 * 1000;
            const date = new Date(passwordResetExpire);
            return { tokenDatabase, reset, date };
        });
        this.saveTokenToUserAccount = ((emailUser) => __awaiter(this, void 0, void 0, function* () {
            let user, resetToken;
            yield DBConfig_1.default.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                user = yield this.User.findOne({
                    where: { email: emailUser },
                    transaction: t,
                    lock: true
                });
                if (user) {
                    user.password = undefined;
                    const { reset, tokenDatabase, date } = yield this.generateToken();
                    resetToken = reset;
                    yield this.User.update({ token: tokenDatabase, passwordResetExpire: date }, { where: { id: user.id }, transaction: t });
                }
            }));
            yield user;
            return { user, resetToken };
        }));
        this.checkTokenIsCorrect = (token) => __awaiter(this, void 0, void 0, function* () {
            const hashedToken = crypto
                .createHash('sha256')
                .update(token)
                .digest('hex');
            const user = yield this.User.findOne({
                where: { token: hashedToken, passwordResetExpire: { [sequelize_1.Op.gt]: new Date() } },
            });
            return user;
        });
        this.saveNewPassword = (newPassword, user) => __awaiter(this, void 0, void 0, function* () {
            if (newPassword.password !== newPassword.passwordConfirm)
                return false;
            const hashedPassword = yield bcrypt.hash(newPassword.password, 10);
            const updatedUser = yield this.User.update({ password: hashedPassword, token: null, passwordResetExpire: null }, { where: { id: user.id } });
            return updatedUser;
        });
    }
}
exports.default = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map