import { IsDefined, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CancelApplicantInvitationRequestParams {
  @ApiProperty()
  @IsUUID()
  @IsDefined()
  @IsNotEmpty()
  readonly invitationId: string;

  constructor(invitationId: string) {
    this.invitationId = invitationId;
  }
}
