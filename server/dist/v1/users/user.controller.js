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
const express = require("express");
const userNotFoundException_1 = require("../../v1/exceptions/userNotFoundException");
const asyncHandler = require("express-async-handler");
const user_service_1 = require("./user.service");
class UserController {
    constructor() {
        this.path = "/users";
        this.router = express.Router();
        this.UserService = new user_service_1.default();
        this.getAllUsers = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            console.log("in get all users");
            const Users = yield this.UserService.getAllUsers();
            response.status(200).json({ data: Users });
        }));
        this.createUser = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const userData = request.body;
            console.log(request.body);
            const createdUser = yield this.UserService.createUser(userData);
            response.send(createdUser);
        }));
        this.editUser = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const userData = request.body;
            const id = request.params.id;
            const updatedUser = yield this.UserService.editUser(id, userData);
            if (!updatedUser)
                return next(new userNotFoundException_1.default(id));
            response.sendStatus(204);
        }));
        this.deleteUser = asyncHandler((request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            const deletedUser = yield this.UserService.deleteUser(id);
            if (!deletedUser)
                return next(new userNotFoundException_1.default(id));
            response.sendStatus(204);
        }));
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.getAllUsers);
        this.router.post(`${this.path}/createuser`, this.createUser);
        this.router.patch(`${this.path}/:id`, this.editUser);
        this.router.delete(`${this.path}/:id`, this.deleteUser);
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map