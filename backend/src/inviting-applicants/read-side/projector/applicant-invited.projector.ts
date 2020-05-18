import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {ApplicantInvited} from "../../write-side/domain/event/applicant-invited.domain-event";
import {Inject} from "@nestjs/common";
import {APPLICANT_INVITATION_REPOSITORY} from "../../write-side/domain/applicant-invitation.repository";
import {ApplicantInvitationSummaryRepository} from "../readmodel/applicant-invitation-summary.repository";

@EventsHandler(ApplicantInvited)
export class ApplicantInvitedProjector implements IEventHandler<ApplicantInvited> {

  constructor(@Inject(APPLICANT_INVITATION_REPOSITORY)
              private readonly repository: ApplicantInvitationSummaryRepository) {
  }

  handle(event: ApplicantInvited) {
    this.repository.update()
  }

}