import { ApplicantInvitationId } from './applicant-invitation-id.valueobject';
import { ApplicantInvitation } from './applicant-invitation.aggregate-root';
import { DomainEventId } from '../../../shared-kernel/write-side/domain/domain-event-id.valueobject';
import { PersonalEmail } from './personal-email.valueobject';
import { FirstName } from './first-name.value-object';
import { LastName } from './last-name.value-object';
import { AbstractSuccessDomainEvent } from '../../../shared-kernel/write-side/domain/abstract-success-domain-event';
import { AbstractFailureDomainEvent } from '../../../shared-kernel/write-side/domain/abstract-failure-domain-event';
import { FailureReason } from '../../../shared-kernel/write-side/domain/failure-reason';

export namespace ApplicantInvitationDomainEvent {
  abstract class AbstractApplicantInvitationSuccessDomainEvent<
    P = any
  > extends AbstractSuccessDomainEvent<ApplicantInvitationId, P> {
    constructor(
      eventId: DomainEventId,
      occurredAt: Date,
      aggregateId: ApplicantInvitationId,
      data: P,
    ) {
      super(eventId, occurredAt, aggregateId, data);
    }

    get aggregateType(): string {
      return ApplicantInvitation.name;
    }
  }

  abstract class AbstractApplicantInvitationFailureDomainEvent<
    P extends FailureReason = FailureReason
  > extends AbstractFailureDomainEvent<ApplicantInvitationId, P> {
    constructor(
      eventId: DomainEventId,
      occurredAt: Date,
      aggregateId: ApplicantInvitationId,
      data: P,
    ) {
      super(eventId, occurredAt, aggregateId, data);
    }

    get aggregateType(): string {
      return ApplicantInvitation.name;
    }
  }

  type ApplicantInvitedData = {
    personalEmail: PersonalEmail;
    firstName: FirstName;
    lastName: LastName;
  };

  export class ApplicantInvited extends AbstractApplicantInvitationSuccessDomainEvent<
    ApplicantInvitedData
  > {
    static newFrom(
      aggregateId: ApplicantInvitationId,
      occurredAt: Date,
      data: ApplicantInvitedData,
    ) {
      return new ApplicantInvited(
        DomainEventId.generate(),
        occurredAt,
        aggregateId,
        data,
      );
    }
  }

  export class InvitingApplicantFailed extends AbstractApplicantInvitationFailureDomainEvent {
    static newFrom(
      aggregateId: ApplicantInvitationId,
      occurredAt: Date,
      data: FailureReason,
    ) {
      return new InvitingApplicantFailed(
        DomainEventId.generate(),
        occurredAt,
        aggregateId,
        data,
      );
    }
  }

  export class InvitationCancelled extends AbstractApplicantInvitationSuccessDomainEvent<{}> {
    static newFrom(
      aggregateId: ApplicantInvitationId,
      occurredAt: Date,
      data: {},
    ) {
      return new InvitationCancelled(
        DomainEventId.generate(),
        occurredAt,
        aggregateId,
        data,
      );
    }
  }

  export class CancelingApplicantInvitationFailed extends AbstractApplicantInvitationFailureDomainEvent {
    static newFrom(
      aggregateId: ApplicantInvitationId,
      occurredAt: Date,
      data: FailureReason,
    ) {
      return new CancelingApplicantInvitationFailed(
        DomainEventId.generate(),
        occurredAt,
        aggregateId,
        data,
      );
    }
  }
}
