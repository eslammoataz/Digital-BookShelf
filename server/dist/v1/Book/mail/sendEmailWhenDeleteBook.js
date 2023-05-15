"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmailService_1 = require("../../../Notifications/Email/EmailService");
const emailConfig_1 = require("../../../Notifications/Email/emailConfig");
const MailSetting_1 = require("../../../Notifications/Email/MailSetting");
class sendEmailWhenDeleteBook {
    constructor() {
        this.mailSettingBook = MailSetting_1.MailSetting;
    }
    IntializeMail() {
        const mailTransporter = new emailConfig_1.default(this.mailSettingBook);
        const mailSender = new EmailService_1.default(mailTransporter);
        mailSender.Email = {
            from: 'sender@example.com',
            to: 'waelelsafty07@gmail.com',
            subject: 'Warning Delete Book',
            html: `
            <div style="color:yellow; font-weight:bold">
                Hi Wael,
                Warning you delete Book.
                <hr>
                <span style="color:red;"> Review your operation in your website </span>
            </div>`,
        };
        return mailSender;
    }
}
exports.default = sendEmailWhenDeleteBook;
//# sourceMappingURL=sendEmailWhenDeleteBook.js.map