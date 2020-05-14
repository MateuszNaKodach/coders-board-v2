import { PublicCommand } from '@coders-board-library/public-messages/shared/command/public-command';

export class InviteApplicantPublicCommand implements PublicCommand {
  constructor(
    readonly personalEmail: string,
    readonly firstName: string,
    readonly lastName: string,
  ) {}
}
