import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as InvitingApplicantsQuery from '../inviting-applicants.query';
import { Inject } from '@nestjs/common';
import {
  APPLICANT_INVITATION_SUMMARY_REPOSITORY,
  ApplicantInvitationSummaryRepository
} from '../../readmodel/applicant-invitation-summary.repository';
import {ApplicantInvitationSummary} from "../../readmodel/applicant-invitation-summary/applicant-invitation-summary";

@QueryHandler(InvitingApplicantsQuery.AllPendingInvitations)
export class AllPendingApplicantInvitationsQueryHandler
  implements IQueryHandler<InvitingApplicantsQuery.AllPendingInvitations, ApplicantInvitationSummary[]> {
  constructor(
    @Inject(APPLICANT_INVITATION_SUMMARY_REPOSITORY)
    private readonly repository: ApplicantInvitationSummaryRepository,
  ) {}

  execute(query: InvitingApplicantsQuery.AllPendingInvitations): Promise<ApplicantInvitationSummary[]> {
    return this.repository.findAllPending();
  }
}
