import { PublicCommand } from '@coders-board-library/public-messages/shared/command/public-command';

export class CancelApplicantInvitationPublicCommand implements PublicCommand {
  constructor(readonly applicantInvitationId: string) {}
}
