import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as InvitingApplicantsQuery from '../inviting-applicants.query';
import { ApplicantInvitationRepository } from '../../projection/pending-invitations/v1/applicant-invitation.repository';
import { Inject } from '@nestjs/common';
import { APPLICANT_INVITATION_REPOSITORY } from '../../../write-side/domain/applicant-invitation.repository';
import { CancelledInvitation } from '../../projection/cancelled-invitations/v1/cancelled-invitations-v1-read.model';

@QueryHandler(InvitingApplicantsQuery.AllCancelledInvitations)
export class AllCancelledInvitationsQueryHandler
  implements IQueryHandler<InvitingApplicantsQuery.AllCancelledInvitations, CancelledInvitation[]> {
  constructor(
    @Inject(APPLICANT_INVITATION_REPOSITORY)
    private readonly repository: ApplicantInvitationRepository,
  ) {}

  execute(query: InvitingApplicantsQuery.AllCancelledInvitations): Promise<CancelledInvitation[]> {
    return this.repository.findAllCancelled();
  }
}
