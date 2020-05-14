import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ApplicantInvitationCancelledPublicEvent } from '@coders-board-library/public-messages';
import { Inject } from '@nestjs/common';
import {
  EXTERNAL_EVENT_PUBLISHER,
  ExternalEventPublisher,
} from '../../../../shared-kernel/write-side/application/external-event-publisher/external-event-publisher';
import { InvitationCancelled } from '../../domain/event/invitation-cancelled.domain-events';

@EventsHandler(InvitationCancelled)
export class InvitationCancelledEventPropagator
  implements IEventHandler<InvitationCancelled> {
  constructor(
    @Inject(EXTERNAL_EVENT_PUBLISHER)
    private readonly externalEventPublisher: ExternalEventPublisher,
  ) {}

  async handle(event: InvitationCancelled) {
    return this.externalEventPublisher.publish(
      new ApplicantInvitationCancelledPublicEvent(
        event.eventId.raw,
        event.occurredAt,
        event.aggregateId.raw,
        {},
      ),
    );
  }
}
