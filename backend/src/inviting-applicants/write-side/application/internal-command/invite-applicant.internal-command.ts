import { InternalCommand } from '../../../../shared-kernel/write-side/application/internal-command-sender/internal-command';
import { IsDefined, IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class InviteApplicant implements InternalCommand {
  @IsUUID()
  @IsDefined()
  readonly applicantInvitationId: string;

  @IsDefined()
  @IsEmail()
  readonly personalEmail: string;

  @IsNotEmpty()
  @IsDefined()
  readonly firstName: string;

  @IsNotEmpty()
  @IsDefined()
  readonly lastName: string;

  constructor(applicantInvitationId: string, personalEmail: string, firstName: string, lastName: string) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.personalEmail = personalEmail;
    this.applicantInvitationId = applicantInvitationId;
  }
}
