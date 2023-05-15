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
const nodemailer = require("nodemailer");
class NodemailerMailTransporter {
    constructor(settingMail) {
        this.transporter = nodemailer.createTransport(settingMail);
        this.transporter.verify().then(() => {
            console.log('Connection established successfully');
        }).catch((err) => {
            console.error(err);
        });
    }
    sendMail(mailOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transporter.sendMail(mailOptions);
        });
    }
}
exports.default = NodemailerMailTransporter;
//# sourceMappingURL=emailConfig.js.map