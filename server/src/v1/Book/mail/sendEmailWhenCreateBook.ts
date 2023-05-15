import MailSender from '../../../Notifications/Email/EmailService';
import NodemailerMailTransporter from '../../../Notifications/Email/emailConfig';
import { MailSetting } from '../../../Notifications/Email/MailSetting';
import { IIntializeMail } from '../../../Notifications/IIntializeMail';

class sendEmailWhenCreateBook implements IIntializeMail {
    private readonly mailSettingBook = MailSetting
    constructor() {


    }
    public IntializeMail() {
        const mailTransporter = new NodemailerMailTransporter(this.mailSettingBook);
        const mailSender = new MailSender(mailTransporter);
        mailSender.Email = {
            from: 'waelelsafty07@gmail.com',
            to: 'waelelsafty07@gmail.com',
            subject: 'Congratulation New Book Added',
            html: '<div style="color:green; font-weight:bold">Congratulation you added new Book succesfully</div>',
        };
        return mailSender;
    }
}

export default sendEmailWhenCreateBook