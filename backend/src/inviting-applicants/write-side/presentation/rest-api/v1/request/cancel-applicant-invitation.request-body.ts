import { IsDefined, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CancelApplicantInvitationRequestBody {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  readonly invitationId: string;

  constructor(invitationId: string) {
    this.invitationId = invitationId;
  }
}
