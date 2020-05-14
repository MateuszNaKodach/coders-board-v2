import { ApplicantInvitationAbstractPublicEvent } from '@coders-board-library/public-messages/inviting-applicants/event/applicant-invitation.abstract-public-event';

export type ApplicantInvitedData = {
  personalEmail: string;
  firstName: string;
  lastName: string;
};

export class ApplicantInvitedPublicEvent extends ApplicantInvitationAbstractPublicEvent<
  ApplicantInvitedData
> {
  constructor(
    eventId: string,
    occurredAt: Date,
    aggregateId: string,
    data: ApplicantInvitedData,
  ) {
    super(eventId, occurredAt, aggregateId, data);
  }
}
