import { AbstractPublicEvent } from '@coders-board-library/public-messages/shared/event/public-event';

export namespace ApplicantInvitationPublicEvent {
  export abstract class ApplicantInvitationAbstractPublicEvent<
    P extends any = any
  > extends AbstractPublicEvent<P> {
    constructor(
      eventId: string,
      occurredAt: Date,
      aggregateId: string,
      data: P,
    ) {
      super(eventId, occurredAt, aggregateId, data);
    }

    get aggregateType(): string {
      return 'ApplicantInvitation';
    }
  }

  export type ApplicantInvitedData = {
    personalEmail: string;
    firstName: string;
    lastName: string;
  };
  export class ApplicantInvited extends ApplicantInvitationAbstractPublicEvent<
    ApplicantInvitedData
  > {
    constructor(
      eventId: string,
      occurredAt: Date,
      aggregateId: string,
      data: ApplicantInvitationPublicEvent.ApplicantInvitedData,
    ) {
      super(eventId, occurredAt, aggregateId, data);
    }
  }

  export type ApplicantInvitationCancelledData = {
    personalEmail: string;
    firstName: string;
    lastName: string;
  };
  export class ApplicantInvitationCancelled extends ApplicantInvitationAbstractPublicEvent<
    ApplicantInvitationCancelledData
  > {
    constructor(
      eventId: string,
      occurredAt: Date,
      aggregateId: string,
      data: ApplicantInvitationPublicEvent.ApplicantInvitationCancelledData,
    ) {
      super(eventId, occurredAt, aggregateId, data);
    }
  }
}
