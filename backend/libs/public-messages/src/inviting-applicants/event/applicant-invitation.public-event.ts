import { AbstractPublicEvent } from '@coders-board-library/public-messages/shared/event/public-event';

export namespace ApplicantInvitationPublicEvent {
  export abstract class ApplicantInvitationAbstractPublicEvent<
    P extends any = any
  > extends AbstractPublicEvent<P> {
    constructor(
      eventId: string,
      occurredAt: Date,
      aggregateId: string,
      payload: P,
    ) {
      super(eventId, occurredAt, aggregateId, payload);
    }

    get aggregateType(): string {
      return 'ApplicantInvitation';
    }
  }

  export type ApplicantInvitedPayload = {
    personalEmail: string;
    firstName: string;
    lastName: string;
  };
  export class ApplicantInvited extends ApplicantInvitationAbstractPublicEvent<
    ApplicantInvitedPayload
  > {
    constructor(
      eventId: string,
      occurredAt: Date,
      aggregateId: string,
      payload: ApplicantInvitationPublicEvent.ApplicantInvitedPayload,
    ) {
      super(eventId, occurredAt, aggregateId, payload);
    }
  }

  export type ApplicantInvitationCancelledPayload = {
    personalEmail: string;
    firstName: string;
    lastName: string;
  };
  export class ApplicantInvitationCancelled extends ApplicantInvitationAbstractPublicEvent<
    ApplicantInvitationCancelledPayload
  > {
    constructor(
      eventId: string,
      occurredAt: Date,
      aggregateId: string,
      payload: ApplicantInvitationPublicEvent.ApplicantInvitationCancelledPayload,
    ) {
      super(eventId, occurredAt, aggregateId, payload);
    }
  }
}
