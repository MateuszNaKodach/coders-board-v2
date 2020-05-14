import { ApplicantInvitationId } from '../applicant-invitation-id.valueobject';
import { DomainEventId } from '../../../../shared-kernel/write-side/domain/domain-event-id.valueobject';
import { AbstractApplicantInvitationSuccessDomainEvent } from './applicant-invitation.abstract-domain-event';

export class InvitationCancelled extends AbstractApplicantInvitationSuccessDomainEvent<{}> {
  static newFrom(aggregateId: ApplicantInvitationId, occurredAt: Date, data: {}) {
    return new InvitationCancelled(DomainEventId.generate(), occurredAt, aggregateId, data);
  }
}
