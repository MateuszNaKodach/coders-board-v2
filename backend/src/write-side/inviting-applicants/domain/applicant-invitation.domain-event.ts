import { AbstractDomainEvent } from '../../shared-kernel/domain/abstract-domain-event';
import { ApplicantInvitationId } from './applicant-invitation-id.valueobject';
import { ApplicantInvitation } from './applicant-invitation.aggregate-root';
import { DomainEventId } from '../../shared-kernel/domain/domain-event-id.valueobject';
import { PersonalEmail } from './personal-email.valueobject';
import { FirstName } from './first-name.value-object';
import { LastName } from './last-name.value-object';

export namespace ApplicantInvitationDomainEvent {
  abstract class AbstractApplicantInvitationDomainEvent<
    P = any
  > extends AbstractDomainEvent<ApplicantInvitationId, P> {
    constructor(
      eventId: DomainEventId,
      occurredAt: Date,
      aggregateId: ApplicantInvitationId,
      payload: P,
    ) {
      super(eventId, occurredAt, aggregateId, payload);
    }

    get aggregateType(): string {
      return 'ApplicantInvitation';
    }
  }

  type ApplicantInvitedPayload = {
    personalEmail: PersonalEmail;
    firstName: FirstName;
    lastName: LastName;
  };

  export class ApplicantInvited extends AbstractApplicantInvitationDomainEvent<
    ApplicantInvitedPayload
  > {
    static newFrom(
      aggregateId: ApplicantInvitationId,
      occurredAt: Date,
      payload: ApplicantInvitedPayload,
    ) {
      return new ApplicantInvited(
        DomainEventId.generate(),
        occurredAt,
        aggregateId,
        payload,
      );
    }
  }

  export class InvitationCancelled extends AbstractApplicantInvitationDomainEvent<{}> {
    static newFrom(
      aggregateId: ApplicantInvitationId,
      occurredAt: Date,
      payload: {},
    ) {
      return new InvitationCancelled(
        DomainEventId.generate(),
        occurredAt,
        aggregateId,
        payload,
      );
    }
  }
}
