import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { InvitingApplicantsApplicationModule } from './application/inviting-applicants-application.module';
import { InvitingApplicantsInfrastructureModule } from './infrastructure/inviting-applicants-infrastructure.module';
import {
  CancelApplicantInvitationPublicCommand,
  InviteApplicantPublicCommand,
} from '@coders-board-library/public-messages';
import { InvitingApplicantsExternalCommandHandlersModule } from './presentation/external-command-handlers/inviting-applicants-external-command-handlers.module';
import { InvitingApplicantsWriteSideRestApiModule } from './presentation/rest-api/inviting-applicants-write-side-rest-api.module';
import {
  EXTERNAL_COMMAND_SENDER,
  ExternalCommandSender,
} from '../../shared-kernel/write-side/application/external-command-sender/external-command-sender';

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
  constructor(
    @Inject(EXTERNAL_COMMAND_SENDER)
    private readonly commandBus: ExternalCommandSender,
  ) {}

  //FIXME: Delete. Just to init some data.
  async onModuleInit() {
    const person = {
      janKowalski: {
        personalEmail: 'jan.kowalski@gmail.com',
        firstName: 'Jan',
        lastName: 'Kowalski',
      },
    };
    const inviteCommand = new InviteApplicantPublicCommand(
      person.janKowalski.personalEmail,
      person.janKowalski.firstName,
      person.janKowalski.lastName,
    );
    const invitationId = await this.commandBus.send(inviteCommand);
    if (randomInt(0, 1) === 0) {
      setTimeout(() => {
        this.commandBus.send(new CancelApplicantInvitationPublicCommand(invitationId));
      }, 2000);
      setTimeout(() => {
        this.commandBus.send(new CancelApplicantInvitationPublicCommand(invitationId));
      }, 10000);
    }
  }
}

function randomInt(min, max) {
  return min + Math.floor((max - min) * Math.random());
}
