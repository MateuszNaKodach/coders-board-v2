import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ApplicantInvitationDomainEvent } from '../domain/applicant-invitation.domain-event';
import { ApplicantInvitationPublicEvent } from '@coders-board-library/public-messages';
import {
  APPLICANT_INVITATION_REPOSITORY,
  ApplicantInvitationRepository,
} from '../domain/applicant-invitation.repository';
import { Inject } from '@nestjs/common';
import {
  EXTERNAL_EVENT_PUBLISHER,
  ExternalEventPublisher,
} from '../../shared-kernel/application/external-event-publisher/external-event-publisher';

/**
 * Each domain event which should be available for read-models and other context on the write-side need
 * to be mapped to public event.
 *
 * TODO: Event propagators need something like Outbox to make possible retries and rebuilding write-side by querying.
 */
export namespace EventPropagator {
  @EventsHandler(ApplicantInvited)
  class ApplicantInvited
    implements IEventHandler<ApplicantInvitationDomainEvent.ApplicantInvited> {
    constructor(
      @Inject(EXTERNAL_EVENT_PUBLISHER)
      private readonly externalEventPublisher: ExternalEventPublisher,
    ) {}

    handle(event: ApplicantInvitationDomainEvent.ApplicantInvited) {
      //TODO: Saving in outbox and publishing after in batches
      this.externalEventPublisher.publish(
        new ApplicantInvitationPublicEvent.ApplicantInvited(
          event.eventId.raw,
          event.occurredAt,
          event.aggregateId.raw,
          {
            personalEmail: event.payload.personalEmail.raw,
            firstName: event.payload.firstName.raw,
            lastName: event.payload.lastName.raw,
          },
        ),
      );
    }
  }

  @EventsHandler(InvitationCancelled)
  class InvitationCancelled
    implements
      IEventHandler<ApplicantInvitationDomainEvent.InvitationCancelled> {
    constructor(
      @Inject(EXTERNAL_EVENT_PUBLISHER)
      private readonly externalEventPublisher: ExternalEventPublisher,
      @Inject(APPLICANT_INVITATION_REPOSITORY)
      private readonly applicantInvitationRepository: ApplicantInvitationRepository,
    ) {}

    async handle(event: ApplicantInvitationDomainEvent.InvitationCancelled) {
      const invitation = await this.applicantInvitationRepository.findById(
        event.aggregateId,
      );
      this.externalEventPublisher.publish(
        new ApplicantInvitationPublicEvent.ApplicantInvitationCancelled(
          event.eventId.raw,
          event.occurredAt,
          event.aggregateId.raw,
          {
            personalEmail: invitation.personalEmail.raw, //TODO: Find better way to enhance events without exposing getters
            firstName: invitation.firstName.raw,
            lastName: invitation.lastName.raw,
          },
        ),
      );
    }
  }

  export const All = [ApplicantInvited, InvitationCancelled];
}
