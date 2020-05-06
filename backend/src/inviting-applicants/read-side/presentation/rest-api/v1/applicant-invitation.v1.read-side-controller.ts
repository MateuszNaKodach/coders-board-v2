import { Controller, Get, Inject } from '@nestjs/common';
import { PendingInvitation } from '../../../projection/current-pending-invitations/v1/current-pending-invitations.v1.read-model';
import {
  INTERNAL_QUERY_BUS,
  InternalQueryBus,
} from '../../../../../shared-kernel/read-side/query/internal-query-bus';
import { InvitingApplicantsQuery } from '../../../query/inviting-applicants.query';

@Controller('/rest-api/v1/applicant-invitations')
export class ApplicantInvitationV1ReadSideController {
  constructor(
    @Inject(INTERNAL_QUERY_BUS)
    private readonly internalQueryBus: InternalQueryBus,
  ) {}

  @Get()
  getAllApplicantInvitations(): Promise<PendingInvitation[]> {
    return this.internalQueryBus.execute(InvitingApplicantsQuery.All);
  }
}
