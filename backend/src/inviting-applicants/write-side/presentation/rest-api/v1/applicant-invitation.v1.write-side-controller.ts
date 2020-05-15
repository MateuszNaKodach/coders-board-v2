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
import { v4 as uuid } from 'uuid';
import { CancelApplicantInvitationRequestParams } from './request-params/cancel-applicant-invitation.request-params';

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
  postApplicantInvitation(@Body() body: InviteApplicantRequestBody): Promise<InviteApplicantResponseBody> {
    const applicantInvitationId = uuid();
    return this.internalCommandBus
      .sendAndWait(new InviteApplicant(applicantInvitationId, body.personalEmail, body.firstName, body.lastName))
      .then(() => new InviteApplicantResponseBody(applicantInvitationId));
  }

  @ApiNoContentResponse({
    description: 'The invitation has been successfully cancelled.',
  })
  @HttpCode(204)
  @Post(':invitationId/cancellation')
  postApplicantInvitationCancellation(@Param() params: CancelApplicantInvitationRequestParams) {
    return this.internalCommandBus.sendAndWait(new CancelApplicantInvitation(params.invitationId));
  }
}
