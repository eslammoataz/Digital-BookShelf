"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmailService_1 = require("../../../Notifications/Email/EmailService");
const emailConfig_1 = require("../../../Notifications/Email/emailConfig");
const MailSetting_1 = require("../../../Notifications/Email/MailSetting");
class sendEmailWhenUpdateBook {
    constructor() {
        this.mailSettingBook = MailSetting_1.MailSetting;
    }
    IntializeMail() {
        const mailTransporter = new emailConfig_1.default(this.mailSettingBook);
        const mailSender = new EmailService_1.default(mailTransporter);
        mailSender.Email = {
            from: 'sender@example.com',
            to: 'waelelsafty07@gmail.com',
            subject: 'Update Book',
            html: `
            <div style="font-weight:bold">
                Hi Wael,
                you Update Book.
                <hr>
                <span style="color:red;"> Review your operation in your website </span>
            </div>`,
        };
        return mailSender;
    }
}
exports.default = sendEmailWhenUpdateBook;
//# sourceMappingURL=sendEmailWhenUpdateBook.js.map