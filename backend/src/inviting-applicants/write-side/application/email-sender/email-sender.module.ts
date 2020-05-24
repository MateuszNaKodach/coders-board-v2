import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailSenderProvider } from './email-sender.provider';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.MAILDEV_HOST,
          auth: {
            user: process.env.MAILDEV_USER,
            pass: process.env.MAILDEV_PASS,
          },
        },
        defaults: {
          from: `"CodersBoard Mailer" <codersboard@mitax.pl>`,
        },
      }),
    }),
  ],
  controllers: [],
  providers: [EmailSenderProvider],
})
export class InvitingApplicantsMailerModule {}
