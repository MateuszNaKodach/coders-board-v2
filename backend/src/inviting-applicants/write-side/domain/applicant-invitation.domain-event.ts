import { AbstractDomainEvent } from '../../../shared-kernel/write-side/domain/abstract-domain-event';
import { ApplicantInvitationId } from './applicant-invitation-id.valueobject';
import { ApplicantInvitation } from './applicant-invitation.aggregate-root';
import { DomainEventId } from '../../../shared-kernel/write-side/domain/domain-event-id.valueobject';
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

  export class ApplicantInvited extends AbstractApplicantInvitationDomainEvent<
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

  export class InvitationCancelled extends AbstractApplicantInvitationDomainEvent<{}> {
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
}
