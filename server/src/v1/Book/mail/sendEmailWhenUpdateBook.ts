import MailSender from '../../../Notifications/Email/EmailService';
import NodemailerMailTransporter from '../../../Notifications/Email/emailConfig';
import { MailSetting } from '../../../Notifications/Email/MailSetting';
import { IIntializeMail } from '../../../Notifications/IIntializeMail';

class sendEmailWhenUpdateBook implements IIntializeMail {
    private readonly mailSettingBook = MailSetting
    constructor() {

    }
    public IntializeMail() {
        const mailTransporter = new NodemailerMailTransporter(this.mailSettingBook);
        const mailSender = new MailSender(mailTransporter);
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

export default sendEmailWhenUpdateBook