"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmailService_1 = require("../../../Notifications/Email/EmailService");
const emailConfig_1 = require("../../../Notifications/Email/emailConfig");
const MailSetting_1 = require("../../../Notifications/Email/MailSetting");
class sendEmailWhenCreateBook {
    constructor() {
        this.mailSettingBook = MailSetting_1.MailSetting;
    }
    IntializeMail() {
        const mailTransporter = new emailConfig_1.default(this.mailSettingBook);
        const mailSender = new EmailService_1.default(mailTransporter);
        mailSender.Email = {
            from: 'waelelsafty07@gmail.com',
            to: 'waelelsafty07@gmail.com',
            subject: 'Congratulation New Book Added',
            html: '<div style="color:green; font-weight:bold">Congratulation you added new Book succesfully</div>',
        };
        return mailSender;
    }
}
exports.default = sendEmailWhenCreateBook;
//# sourceMappingURL=sendEmailWhenCreateBook.js.map