import { InternalCommand } from '../../../../shared-kernel/write-side/application/internal-command-sender/internal-command';
import { IsDefined, IsUUID } from 'class-validator';

export class CancelApplicantInvitation implements InternalCommand {
  @IsUUID()
  @IsDefined()
  readonly applicantInvitationId: string;

  constructor(applicantInvitationId: string) {
    this.applicantInvitationId = applicantInvitationId;
  }
}
