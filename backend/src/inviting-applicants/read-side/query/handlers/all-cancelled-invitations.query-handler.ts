import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as InvitingApplicantsQuery from '../inviting-applicants.query';
import {
  APPLICANT_INVITATION_SUMMARY_REPOSITORY,
  ApplicantInvitationSummaryRepository
} from '../../readmodel/applicant-invitation-summary.repository';
import { Inject } from '@nestjs/common';
import {ApplicantInvitationSummary} from "../../readmodel/applicant-invitation-summary/applicant-invitation-summary";

@QueryHandler(InvitingApplicantsQuery.AllCancelledInvitations)
export class AllCancelledInvitationsQueryHandler
  implements IQueryHandler<InvitingApplicantsQuery.AllCancelledInvitations, ApplicantInvitationSummary[]> {
  constructor(
    @Inject(APPLICANT_INVITATION_SUMMARY_REPOSITORY)
    private readonly repository: ApplicantInvitationSummaryRepository,
  ) {}

  execute(query: InvitingApplicantsQuery.AllCancelledInvitations): Promise<ApplicantInvitationSummary[]> {
    return this.repository.findAllCancelled();
  }
}
