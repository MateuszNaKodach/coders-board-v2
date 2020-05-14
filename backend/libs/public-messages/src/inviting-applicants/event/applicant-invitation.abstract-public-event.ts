import { AbstractPublicEvent } from '@coders-board-library/public-messages/shared/event/public-event';

export abstract class ApplicantInvitationAbstractPublicEvent<P extends any = any> extends AbstractPublicEvent<P> {
  constructor(eventId: string, occurredAt: Date, aggregateId: string, data: P) {
    super(eventId, occurredAt, aggregateId, data);
  }

  get aggregateType(): string {
    return 'ApplicantInvitation';
  }
}
