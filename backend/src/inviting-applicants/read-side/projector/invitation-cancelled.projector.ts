import {IEventHandler} from "@nestjs/cqrs";
import {ApplicantInvited} from "../../write-side/domain/event/applicant-invited.domain-event";


export class ApplicantInvitedProjector implements IEventHandler<ApplicantInvited> {


  handle(event: ApplicantInvited) {

  }

}