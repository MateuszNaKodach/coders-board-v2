import { Module, OnModuleInit } from '@nestjs/common';
import { InvitingApplicantsApplicationModule } from './application/inviting-applicants-application.module';
import { InvitingApplicantsInfrastructureModule } from './infrastructure/inviting-applicants-infrastructure.module';
import { ApplicantInvitationPublicCommand } from '@coders-board-library/public-messages';
import InviteApplicantToAssociation = ApplicantInvitationPublicCommand.InviteApplicantCommand;
import { CommandBus } from '@nestjs/cqrs';
import CancelApplicantInvitation = ApplicantInvitationPublicCommand.CancelApplicantInvitationCommand;
import { InvitingApplicantsExternalCommandHandlersModule } from './presentation/external-command-handlers/inviting-applicants-external-command-handlers.module';
import { InvitingApplicantsWriteSideRestApiModule } from './presentation/rest-api/inviting-applicants-write-side-rest-api.module';

const writeRestApi = InvitingApplicantsWriteSideRestApiModule;
const externalCommandHandlers = InvitingApplicantsExternalCommandHandlersModule;

@Module({
  imports: [
    writeRestApi,
    externalCommandHandlers,
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
    if (randomInt(0, 1) === 0) {
      setTimeout(() => {
        this.commandBus.execute(new CancelApplicantInvitation(invitationId));
      }, 2000);
      setTimeout(() => {
        this.commandBus.execute(new CancelApplicantInvitation(invitationId));
      }, 10000);
    }
  }
}

function randomInt(min, max) {
  return min + Math.floor((max - min) * Math.random());
}
