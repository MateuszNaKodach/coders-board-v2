import { InternalCommand } from '../../../../shared-kernel/write-side/application/internal-command-sender/internal-command';

export class CancelApplicantInvitation implements InternalCommand {
  constructor(readonly applicantInvitationId: string) {}
}
