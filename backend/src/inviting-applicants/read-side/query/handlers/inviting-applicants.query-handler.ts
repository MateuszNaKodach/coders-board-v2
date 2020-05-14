import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InvitingApplicantsQuery } from '../inviting-applicants.query';
import { ApplicantInvitationRepository } from '../../projection/pending-invitations/v1/applicant-invitation.repository';
import { PendingInvitation } from '../../projection/pending-invitations/v1/pending-invitations-v1-read.model';
import { Inject } from '@nestjs/common';
import { APPLICANT_INVITATION_REPOSITORY } from '../../../write-side/domain/applicant-invitation.repository';
import { CancelledInvitation } from '../../projection/cancelled-invitations/v1/cancelled-invitations-v1-read.model';

export namespace InvitingApplicantsQueryHandler {
  @QueryHandler(InvitingApplicantsQuery.AllPendingInvitations)
  class AllPendingApplicantInvitations
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

  @QueryHandler(InvitingApplicantsQuery.AllCancelledInvitations)
  class AllCancelledInvitations
    implements
      IQueryHandler<
        InvitingApplicantsQuery.AllCancelledInvitations,
        CancelledInvitation[]
      > {
    constructor(
      @Inject(APPLICANT_INVITATION_REPOSITORY)
      private readonly repository: ApplicantInvitationRepository,
    ) {}

    execute(
      query: InvitingApplicantsQuery.AllCancelledInvitations,
    ): Promise<CancelledInvitation[]> {
      return this.repository.findAllCancelled();
    }
  }

  export const All = [AllPendingApplicantInvitations, AllCancelledInvitations];
}
