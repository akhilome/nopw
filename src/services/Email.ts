import mailgun from 'mailgun-js';

const {
  MAILGUN_API_KEY = '',
  NO_REPLY_EMAIL = '',
  MAILGUN_DOMAIN = ''
} = process.env;

const mailer = mailgun({
  apiKey: MAILGUN_API_KEY,
  domain: MAILGUN_DOMAIN
});

class EmailService {
  static async sendMail(
    emailAddress: string,
    subject: string,
    message: string
  ): Promise<void> {
    const msg = {
      to: emailAddress,
      from: `NOPW <${NO_REPLY_EMAIL}>`,
      subject: subject,
      html: message
    };

    await mailer.messages().send(msg);
  }
}

export default EmailService;
