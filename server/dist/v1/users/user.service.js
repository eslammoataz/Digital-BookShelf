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
const user_model_1 = require("./user.model");
const bcrypt = require("bcrypt");
class UserService {
    constructor() {
        this.User = user_model_1.default;
        this.getAllUsers = () => __awaiter(this, void 0, void 0, function* () {
            const users = yield this.User.findAll();
            return users;
        });
        this.createUser = (UserData) => __awaiter(this, void 0, void 0, function* () {
            const { password } = UserData;
            const hashedPw = yield bcrypt.hash(password, 12);
            UserData.password = hashedPw;
            const newUser = yield this.User.create(Object.assign({ UserData }));
            return newUser;
        });
        this.editUser = (id, updateUserData) => __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield this.User.update(updateUserData, {
                where: { id: id },
            });
            return updatedUser;
        });
        this.deleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield this.User.destroy({
                where: { id: id },
            });
            // send user a notification that his account was deleted
            return deletedUser;
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map