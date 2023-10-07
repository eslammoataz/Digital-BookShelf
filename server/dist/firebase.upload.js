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
exports.firebaseUpload = void 0;
const express = require("express");
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
const firebase_Config_1 = require("./firebase.Config");
const router = express.Router();
(0, app_1.initializeApp)(firebase_Config_1.default);
const storage = (0, storage_1.getStorage)();
const firebaseUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dateTime = giveCurrentDateTime();
        const storageRef = (0, storage_1.ref)(storage, `files/${req.file.originalname + '       ' + dateTime}`);
        const metadata = {
            contentType: req.file.mimetype,
        };
        const snapshot = yield (0, storage_1.uploadBytesResumable)(storageRef, req.file.buffer, metadata);
        const downloadURL = yield (0, storage_1.getDownloadURL)(snapshot.ref);
        console.log('File successfully uploaded.');
        req.body.downloadURL = downloadURL;
        next();
    }
    catch (error) {
        return next(res.status(400).send(error.message));
    }
});
exports.firebaseUpload = firebaseUpload;
const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
};
//# sourceMappingURL=firebase.upload.js.map