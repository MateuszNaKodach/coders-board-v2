import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InvitingApplicantsQuery } from '../inviting-applicants.query';
import { ApplicantInvitationRepository } from '../../projection/current-pending-invitations/v1/applicant-invitation.repository';
import { PendingInvitation } from '../../projection/current-pending-invitations/v1/current-pending-invitations.v1.read-model';
import { Inject } from '@nestjs/common';
import { APPLICANT_INVITATION_REPOSITORY } from '../../../write-side/domain/applicant-invitation.repository';

export namespace InvitingApplicantsQueryHandler {
  @QueryHandler(InvitingApplicantsQuery.AllApplicantInvitations)
  class AllApplicantInvitations
    implements
      IQueryHandler<
        InvitingApplicantsQuery.AllApplicantInvitations,
        PendingInvitation[]
      > {
    constructor(
      @Inject(APPLICANT_INVITATION_REPOSITORY)
      private readonly repository: ApplicantInvitationRepository,
    ) {}

    execute(
      query: InvitingApplicantsQuery.AllApplicantInvitations,
    ): Promise<PendingInvitation[]> {
      return this.repository.findAllPending();
    }
  }

  export const All = [AllApplicantInvitations];
}
