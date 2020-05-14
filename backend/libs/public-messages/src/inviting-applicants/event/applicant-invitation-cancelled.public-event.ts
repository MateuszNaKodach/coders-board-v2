import { ApplicantInvitationAbstractPublicEvent } from '@coders-board-library/public-messages/inviting-applicants/event/applicant-invitation.abstract-public-event';

export class ApplicantInvitationCancelledPublicEvent extends ApplicantInvitationAbstractPublicEvent<{}> {
  constructor(
    eventId: string,
    occurredAt: Date,
    aggregateId: string,
    data: {},
  ) {
    super(eventId, occurredAt, aggregateId, data);
  }
}
