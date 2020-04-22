import { EventSourcedAggregateRootRepository } from '../../shared-kernel/infrastructure/persistence/event-sourced-aggregate-root.repository';
import { ApplicantInvitationId } from '../domain/applicant-invitation-id.valueobject';
import { ApplicantInvitation } from '../domain/applicant-invitation.aggregate-root';
import { Inject, Injectable } from '@nestjs/common';
import {
  EVENT_STORAGE,
  EventStorage,
} from '@coders-board-library/event-sourcing/event-storage/event-storage';
import { EventBus } from '@nestjs/cqrs';
import { TimeProviderPort } from '../../shared-kernel/domain/time-provider.port';
import { StorageEventEntry } from '@coders-board-library/event-sourcing/api/storage-event-entry';
import { DomainEvent } from '../../shared-kernel/domain/domain-event';
import { ApplicantInvitationDomainEvent } from '../domain/applicant-invitation.domain-event';
import { DomainEventId } from '../../shared-kernel/domain/domain-event-id.valueobject';
import { ApplicantInvitationRepository } from '../domain/applicant-invitation.repository';
import { TIME_PROVIDER } from '@coders-board-library/time-provider';

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
    eventBus: EventBus,
  ) {
    super(timeProvider, eventStorage, eventBus);
  }

  protected newAggregate(): ApplicantInvitation {
    return new ApplicantInvitation(this.timeProvider);
  }

  protected recreateEventFromStorage(event: StorageEventEntry): DomainEvent {
    try {
      return new ApplicantInvitationDomainEvent[event.eventType](
        DomainEventId.of(event.eventId),
        event.occurredAt,
        ApplicantInvitationId.of(event.aggregateId),
        event.payload,
      );
    } catch (error) {
      throw new Error('UNHANDLED_EVENT_RECONSTRUCTION');
    }
  }
}
