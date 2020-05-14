import { PublicCommand } from '../../shared/command/public-command';

export namespace ApplicantInvitationPublicCommand {
  export class InviteApplicantCommand implements PublicCommand {
    constructor(
      readonly personalEmail: string,
      readonly firstName: string,
      readonly lastName: string,
    ) {}
  }

  export class CancelApplicantInvitationCommand implements PublicCommand {
    constructor(readonly applicantInvitationId: string) {}
  }
}
