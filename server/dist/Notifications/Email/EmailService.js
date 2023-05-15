"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MailSender {
    constructor(transporter) {
        this.transporter = transporter;
    }
    set Email(value) {
        this.mailOptions = value;
    }
    Send() {
        return this.transporter.sendMail(this.mailOptions);
    }
}
exports.default = MailSender;
//# sourceMappingURL=EmailService.js.map