import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ApplicantInvited } from '../../domain/event/applicant-invited.domain-event';
import { Inject } from '@nestjs/common';
import {
  EXTERNAL_EVENT_PUBLISHER,
  ExternalEventPublisher,
} from '../../../../shared-kernel/write-side/application/external-event-publisher/external-event-publisher';
import { ApplicantInvitedPublicEvent } from '@coders-board-library/public-messages';

@EventsHandler(ApplicantInvited)
export class ApplicantInvitedEventPropagator implements IEventHandler<ApplicantInvited> {
  constructor(
    @Inject(EXTERNAL_EVENT_PUBLISHER)
    private readonly externalEventPublisher: ExternalEventPublisher,
  ) {}

  handle(event: ApplicantInvited) {
    // only for testing...
    console.log(`\x1b[97m\x1b[101m Event...: \x1b[0m`, event); //ANSI escape codes
    // tu chciałem na próbę skorzystać z EmailSenderProvider, bo i tak nie mam pojącia skąd i jakim sposobem
    // to wywoływać, ale zrobienie @Inject w tym miejscu, jeśli w ogóle to dobyr kierunek, mnie przerasta...
    //TODO: Saving in outbox and publishing after in batches
    return this.externalEventPublisher.publish(
      new ApplicantInvitedPublicEvent(event.eventId.raw, event.occurredAt, event.aggregateId.raw, {
        personalEmail: event.data.personalEmail.raw,
        firstName: event.data.firstName.raw,
        lastName: event.data.lastName.raw,
      }),
    );
  }
}
