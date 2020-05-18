import { ApiProperty } from '@nestjs/swagger';

export interface PendingInvitationsV1ReadModel {
  pendingInvitations: PendingInvitation[];
}

export class PendingInvitation {
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
}
