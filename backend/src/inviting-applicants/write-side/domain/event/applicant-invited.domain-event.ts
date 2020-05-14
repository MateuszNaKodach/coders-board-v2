import { ApplicantInvitationId } from '../applicant-invitation-id.valueobject';
import { DomainEventId } from '../../../../shared-kernel/write-side/domain/domain-event-id.valueobject';
import { PersonalEmail } from '../personal-email.valueobject';
import { FirstName } from '../first-name.value-object';
import { LastName } from '../last-name.value-object';
import { AbstractApplicantInvitationSuccessDomainEvent } from './applicant-invitation.abstract-domain-event';

export type ApplicantInvitedData = {
  personalEmail: PersonalEmail;
  firstName: FirstName;
  lastName: LastName;
};

export class ApplicantInvited extends AbstractApplicantInvitationSuccessDomainEvent<ApplicantInvitedData> {
  static newFrom(aggregateId: ApplicantInvitationId, occurredAt: Date, data: ApplicantInvitedData) {
    return new ApplicantInvited(DomainEventId.generate(), occurredAt, aggregateId, data);
  }
}
