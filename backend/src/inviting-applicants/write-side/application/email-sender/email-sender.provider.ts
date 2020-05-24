import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailSenderProvider {
  constructor(private readonly mailerService: MailerService) {}
  public sendEmail(): void {
    this.mailerService
      .sendMail({
        to: 'marek.kustosz@gmail.com',
        subject: 'test ApplicantInvitation',
        text: 'Hi there!',
        html: '<b>Hi thete!</b>',
      })
      .then(res => {
        console.log('poszło...', res.response);
      })
      .catch(err => {
        console.log('jakiś błąd:', err.message);
      });
  }
}
