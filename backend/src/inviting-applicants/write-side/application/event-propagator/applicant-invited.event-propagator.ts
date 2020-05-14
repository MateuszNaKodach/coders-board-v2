import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ApplicantInvited } from '../../domain/event/applicant-invited.domain-event';
import { Inject } from '@nestjs/common';
import {
  EXTERNAL_EVENT_PUBLISHER,
  ExternalEventPublisher,
} from '../../../../shared-kernel/write-side/application/external-event-publisher/external-event-publisher';
import { ApplicantInvitedPublicEvent } from '@coders-board-library/public-messages';

@EventsHandler(ApplicantInvited)
export class ApplicantInvitedEventPropagator
  implements IEventHandler<ApplicantInvited> {
  constructor(
    @Inject(EXTERNAL_EVENT_PUBLISHER)
    private readonly externalEventPublisher: ExternalEventPublisher,
  ) {}

  handle(event: ApplicantInvited) {
    //TODO: Saving in outbox and publishing after in batches
    return this.externalEventPublisher.publish(
      new ApplicantInvitedPublicEvent(
        event.eventId.raw,
        event.occurredAt,
        event.aggregateId.raw,
        {
          personalEmail: event.data.personalEmail.raw,
          firstName: event.data.firstName.raw,
          lastName: event.data.lastName.raw,
        },
      ),
    );
  }
}
