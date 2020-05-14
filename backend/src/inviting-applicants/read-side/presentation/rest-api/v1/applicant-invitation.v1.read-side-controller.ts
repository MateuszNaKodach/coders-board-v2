import { Controller, Get, Inject } from '@nestjs/common';
import { PendingInvitation } from '../../../projection/pending-invitations/v1/pending-invitations-v1-read.model';
import {
  INTERNAL_QUERY_BUS,
  InternalQueryBus,
} from '../../../../../shared-kernel/read-side/query/internal-query-bus';
import { InvitingApplicantsQuery } from '../../../query/inviting-applicants.query';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CancelledInvitation } from '../../../projection/cancelled-invitations/v1/cancelled-invitations-v1-read.model';

@ApiTags('inviting-applicants')
@Controller('/rest-api/v1/applicant-invitations')
export class ApplicantInvitationV1ReadSideController {
  constructor(
    @Inject(INTERNAL_QUERY_BUS)
    private readonly internalQueryBus: InternalQueryBus,
  ) {}

  @ApiOkResponse({
    description: 'All pending applicant invitations.',
    type: [PendingInvitation],
  })
  @Get('/pending')
  getAllPendingApplicantInvitations(): Promise<PendingInvitation[]> {
    return this.internalQueryBus.execute(InvitingApplicantsQuery.AllPending);
  }

  @ApiOkResponse({
    description: 'All cancelled applicant invitations.',
    type: [CancelledInvitation],
  })
  @Get('/cancelled')
  getAllCancelledApplicantInvitations(): Promise<CancelledInvitation[]> {
    return this.internalQueryBus.execute(InvitingApplicantsQuery.AllCancelled);
  }
}
