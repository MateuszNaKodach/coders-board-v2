import { ApiProperty } from '@nestjs/swagger';

export interface CancelledInvitationsV1ReadModel {
  cancelledInvitations: CancelledInvitation[];
}

export class CancelledInvitation {
  @ApiProperty()
  invitationId: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  personalEmail: string;

  @ApiProperty()
  invitedAt: Date;

  @ApiProperty()
  cancelledAt: Date;
}
