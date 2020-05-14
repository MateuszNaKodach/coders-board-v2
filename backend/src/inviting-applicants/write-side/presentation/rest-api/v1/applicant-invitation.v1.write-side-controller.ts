import { Body, Controller, HttpCode, Inject, Param, Post } from '@nestjs/common';
import { InviteApplicantRequestBody } from './request/invite-applicant.request-body';
import {
  INTERNAL_COMMAND_SENDER,
  InternalCommandSender,
} from '../../../../../shared-kernel/write-side/application/internal-command-sender/internal-command-sender';
import { InviteApplicantResponseBody } from './response/invite-applicant.response-body';
import { ApiCreatedResponse, ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { InviteApplicant } from '../../../application/internal-command/invite-applicant.internal-command';
import { CancelApplicantInvitation } from '../../../application/internal-command/cancel-applicant-invitation.internal-command';

@ApiTags('inviting-applicants')
@Controller('/rest-api/v1/applicant-invitations')
export class ApplicantInvitationV1WriteSideController {
  constructor(
    @Inject(INTERNAL_COMMAND_SENDER)
    private readonly internalCommandBus: InternalCommandSender,
  ) {}

  @ApiCreatedResponse({
    description: 'The invitation has been successfully created.',
    type: InviteApplicantResponseBody,
  })
  @HttpCode(201)
  @Post()
  postApplicantInvitation(
    @Body() body: InviteApplicantRequestBody,
  ): Promise<InviteApplicantResponseBody> {
    return this.internalCommandBus
      .sendAndWait<string>(new InviteApplicant(body.personalEmail, body.firstName, body.lastName))
      .then(applicantId => new InviteApplicantResponseBody(applicantId));
  }

  @ApiNoContentResponse({
    description: 'The invitation has been successfully cancelled.',
  })
  @HttpCode(204)
  @Post(':invitationId/cancellation')
  postApplicantInvitationCancellation(@Param('invitationId') invitationId: string) {
    return this.internalCommandBus.sendAndWait(new CancelApplicantInvitation(invitationId));
  }
}
