"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmailService_1 = require("../../../Notifications/Email/EmailService");
const emailConfig_1 = require("../../../Notifications/Email/emailConfig");
const MailSetting_1 = require("../../../Notifications/Email/MailSetting");
class sendEmailWhenForgetPassword {
    constructor(value) {
        this.mailSettingProject = MailSetting_1.MailSetting;
        this.token = value;
    }
    IntializeMail() {
        const mailTransporter = new emailConfig_1.default(this.mailSettingProject);
        const mailSender = new EmailService_1.default(mailTransporter);
        mailSender.Email = {
            from: 'sender@example.com',
            to: 'waelelsafty07@gmail.com',
            subject: 'Forget Password',
            html: `<div style="color:green; font-weight:bold">Click this link ${this.token}</div>`,
        };
        return mailSender;
    }
}
exports.default = sendEmailWhenForgetPassword;
//# sourceMappingURL=sendEmailWhenForgetPassword.js.map