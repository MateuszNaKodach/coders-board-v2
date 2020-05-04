import { Module, OnModuleInit } from '@nestjs/common';
import { InvitingApplicantsApplicationModule } from './application/inviting-applicants-application.module';
import { InvitingApplicantsInfrastructureModule } from './infrastructure/inviting-applicants-infrastructure.module';
import { ApplicantInvitationCommand } from '@coders-board-library/public-messages';
import InviteApplicantToAssociation = ApplicantInvitationCommand.InviteApplicantToAssociation;
import { CommandBus } from '@nestjs/cqrs';
import CancelApplicantInvitation = ApplicantInvitationCommand.CancelApplicantInvitation;

@Module({
  imports: [
    InvitingApplicantsApplicationModule,
    InvitingApplicantsInfrastructureModule,
  ],
})
export class InvitingApplicantsWriteSideModule implements OnModuleInit {
  constructor(private readonly commandBus: CommandBus) {}

  //FIXME: Delete. Just to init some data.
  async onModuleInit() {
    const person = {
      janKowalski: {
        personalEmail: 'jan.kowalski@gmail.com',
        firstName: 'Jan',
        lastName: 'Kowalski',
      },
    };
    const inviteCommand = new InviteApplicantToAssociation(
      person.janKowalski.personalEmail,
      person.janKowalski.firstName,
      person.janKowalski.lastName,
    );
    const invitationId = await this.commandBus.execute(inviteCommand);
    setTimeout(() => {
      this.commandBus.execute(new CancelApplicantInvitation(invitationId));
    }, 1000);
  }
}
