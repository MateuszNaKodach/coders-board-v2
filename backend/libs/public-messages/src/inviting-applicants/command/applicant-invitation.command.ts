import { ExternalCommand } from '../../shared/command/external-command';

export namespace ApplicantInvitationCommand {
  export class InviteApplicantToAssociation implements ExternalCommand {
    constructor(
      readonly personalEmail: string,
      readonly firstName: string,
      readonly lastName: string,
    ) {}
  }

  export class CancelApplicantInvitation implements ExternalCommand {
    constructor(readonly applicantInvitationId: string) {}
  }
}
