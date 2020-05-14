import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InviteApplicantRequestBody {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  readonly personalEmail: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  readonly lastName: string;

  constructor(personalEmail: string, firstName: string, lastName: string) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.personalEmail = personalEmail;
  }
}
