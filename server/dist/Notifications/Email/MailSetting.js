"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailSetting = void 0;
exports.MailSetting = {
    host: 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
        user: String(process.env.EMAIL_USER),
        pass: String(process.env.EMAIL_PASSWORD),
    },
};
//# sourceMappingURL=MailSetting.js.map