import { PublicCommand } from '@coders-board-library/public-messages/shared/command/public-command';
import { IsDefined, IsUUID } from 'class-validator';

export class CancelApplicantInvitationPublicCommand implements PublicCommand {
  @IsUUID()
  @IsDefined()
  readonly applicantInvitationId: string;

  constructor(applicantInvitationId: string) {
    this.applicantInvitationId = applicantInvitationId;
  }
}
