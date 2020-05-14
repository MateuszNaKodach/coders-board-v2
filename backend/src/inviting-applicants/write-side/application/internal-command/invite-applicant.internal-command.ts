import { InternalCommand } from '../../../../shared-kernel/write-side/application/internal-command-sender/internal-command';

export class InviteApplicant implements InternalCommand {
  constructor(
    readonly personalEmail: string,
    readonly firstName: string,
    readonly lastName: string,
  ) {}
}
