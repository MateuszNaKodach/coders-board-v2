import { PublicCommand } from '@coders-board-library/public-messages/shared/command/public-command';
import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class InviteApplicantPublicCommand implements PublicCommand {
  @IsEmail()
  @IsDefined()
  readonly personalEmail: string;

  @IsNotEmpty()
  @IsDefined()
  readonly firstName: string;

  @IsNotEmpty()
  @IsDefined()
  readonly lastName: string;

  constructor(personalEmail: string, firstName: string, lastName: string) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.personalEmail = personalEmail;
  }
}
