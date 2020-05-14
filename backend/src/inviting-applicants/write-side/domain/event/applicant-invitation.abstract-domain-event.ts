import { ApplicantInvitationId } from '../applicant-invitation-id.valueobject';
import { ApplicantInvitation } from '../applicant-invitation.aggregate-root';
import { DomainEventId } from '../../../../shared-kernel/write-side/domain/domain-event-id.valueobject';
import { AbstractSuccessDomainEvent } from '../../../../shared-kernel/write-side/domain/abstract-success-domain-event';
import { AbstractFailureDomainEvent } from '../../../../shared-kernel/write-side/domain/abstract-failure-domain-event';
import { FailureReason } from '../../../../shared-kernel/write-side/domain/failure-reason';

export abstract class AbstractApplicantInvitationSuccessDomainEvent<P = any> extends AbstractSuccessDomainEvent<
  ApplicantInvitationId,
  P
> {
  constructor(eventId: DomainEventId, occurredAt: Date, aggregateId: ApplicantInvitationId, data: P) {
    super(eventId, occurredAt, aggregateId, data);
  }

  get aggregateType(): string {
    return ApplicantInvitation.name;
  }
}

export abstract class AbstractApplicantInvitationFailureDomainEvent<
  P extends FailureReason = FailureReason
> extends AbstractFailureDomainEvent<ApplicantInvitationId, P> {
  constructor(eventId: DomainEventId, occurredAt: Date, aggregateId: ApplicantInvitationId, data: P) {
    super(eventId, occurredAt, aggregateId, data);
  }

  get aggregateType(): string {
    return ApplicantInvitation.name;
  }
}
