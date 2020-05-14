import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as InvitingApplicantsQuery from '../inviting-applicants.query';
import { PendingInvitation } from '../../projection/pending-invitations/v1/pending-invitations-v1-read.model';
import { Inject } from '@nestjs/common';
import { APPLICANT_INVITATION_REPOSITORY } from '../../../write-side/domain/applicant-invitation.repository';
import { ApplicantInvitationRepository } from '../../projection/pending-invitations/v1/applicant-invitation.repository';

@QueryHandler(InvitingApplicantsQuery.AllPendingInvitations)
export class AllPendingApplicantInvitationsQueryHandler
  implements
    IQueryHandler<
      InvitingApplicantsQuery.AllPendingInvitations,
      PendingInvitation[]
    > {
  constructor(
    @Inject(APPLICANT_INVITATION_REPOSITORY)
    private readonly repository: ApplicantInvitationRepository,
  ) {}

  execute(
    query: InvitingApplicantsQuery.AllPendingInvitations,
  ): Promise<PendingInvitation[]> {
    return this.repository.findAllPending();
  }
}
