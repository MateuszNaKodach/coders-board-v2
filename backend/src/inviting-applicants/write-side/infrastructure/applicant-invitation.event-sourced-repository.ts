import { EventSourcedAggregateRootRepository } from '../../../shared-kernel/write-side/infrastructure/persistence/event-sourced-aggregate-root.repository';
import { ApplicantInvitationId } from '../domain/applicant-invitation-id.valueobject';
import { ApplicantInvitation } from '../domain/applicant-invitation.aggregate-root';
import { Inject, Injectable } from '@nestjs/common';
import {
  EVENT_STORAGE,
  EventStorage,
} from '@coders-board-library/event-sourcing/api/event-storage';
import { TimeProviderPort } from '../../../shared-kernel/write-side/domain/time-provider.port';
import { StorageEventEntry } from '@coders-board-library/event-sourcing/api/storage-event-entry';
import { DomainEvent } from '../../../shared-kernel/write-side/domain/domain-event';
import { DomainEventId } from '../../../shared-kernel/write-side/domain/domain-event-id.valueobject';
import { ApplicantInvitationRepository } from '../domain/applicant-invitation.repository';
import { TIME_PROVIDER } from '@coders-board-library/time-provider';
import {
  DOMAIN_EVENT_PUBLISHER,
  DomainEventPublisher,
} from '../../../shared-kernel/write-side/infrastructure/domain-event-publisher/domain-event-publisher';
import { InvitingApplicantsDomainEvents } from '../domain/event';

@Injectable()
export class ApplicantInvitationEventSourcedRepository
  extends EventSourcedAggregateRootRepository<
    ApplicantInvitationId,
    ApplicantInvitation
  >
  implements ApplicantInvitationRepository {
  constructor(
    @Inject(TIME_PROVIDER) timeProvider: TimeProviderPort,
    @Inject(EVENT_STORAGE) eventStorage: EventStorage,
    @Inject(DOMAIN_EVENT_PUBLISHER) domainEventPublisher: DomainEventPublisher,
  ) {
    super(timeProvider, eventStorage, domainEventPublisher);
  }

  protected newAggregate(): ApplicantInvitation {
    return new ApplicantInvitation(this.timeProvider);
  }

  protected recreateEventFromStorage(event: StorageEventEntry): DomainEvent {
    try {
      return new InvitingApplicantsDomainEvents[event.eventType](
        DomainEventId.of(event.eventId),
        event.occurredAt,
        ApplicantInvitationId.of(event.streamId),
        event.data,
      );
    } catch (error) {
      throw new Error('UNHANDLED_EVENT_RECONSTRUCTION');
    }
  }

  aggregateType = ApplicantInvitation.name;
}
