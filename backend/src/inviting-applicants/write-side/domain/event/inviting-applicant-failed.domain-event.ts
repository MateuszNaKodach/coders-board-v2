import { ApplicantInvitationId } from '../applicant-invitation-id.valueobject';
import { FailureReason } from '../../../../shared-kernel/write-side/domain/failure-reason';
import { DomainEventId } from '../../../../shared-kernel/write-side/domain/domain-event-id.valueobject';
import { AbstractApplicantInvitationFailureDomainEvent } from './applicant-invitation.abstract-domain-event';

export class InvitingApplicantFailed extends AbstractApplicantInvitationFailureDomainEvent {
  static newFrom(aggregateId: ApplicantInvitationId, occurredAt: Date, data: FailureReason) {
    return new InvitingApplicantFailed(DomainEventId.generate(), occurredAt, aggregateId, data);
  }
}
