import { AbstractAggregateRoot } from '../../../shared-kernel/write-side/domain/abstract-aggregate-root';
import { ApplicantInvitationId } from './applicant-invitation-id.valueobject';
import { TimeProviderPort } from '../../../shared-kernel/write-side/domain/time-provider.port';
import { PersonalEmail } from './personal-email.valueobject';
import { FirstName } from './first-name.value-object';
import { LastName } from './last-name.value-object';
import { Result } from '../../../shared-kernel/write-side/domain/result';
import { ApplicantInvited } from './event/applicant-invited.domain-event';
import { InvitationCancelled } from './event/invitation-cancelled.domain-events';
import { CancelingApplicantInvitationFailed } from './event/cancelling-applicant-invitation-failed.domain-event';
import { InvitingApplicantFailed } from './event/inviting-applicant-failed.domain-event';

export class ApplicantInvitation extends AbstractAggregateRoot<ApplicantInvitationId> {
  private _status: InvitationStatus;
  private _personalEmail: PersonalEmail;
  private _firstName: FirstName;
  private _lastName: LastName;

  constructor(timeProvider: TimeProviderPort) {
    super(timeProvider);
  }

  forApplicant = (
    id: ApplicantInvitationId,
    command: {
      personalEmail: PersonalEmail;
      firstName: FirstName;
      lastName: LastName;
    },
  ): Result =>
    this.executeCommand(() =>
      this._status !== undefined
        ? Result.failure(
            InvitingApplicantFailed.newFrom(id, this.currentDate, {
              reason: 'Applicant already invited!',
            }),
          )
        : Result.success(ApplicantInvited.newFrom(id, this.currentDate, { ...command })),
    );

  onApplicantInvited(event: ApplicantInvited) {
    this.id = event.aggregateId;
    this._status = InvitationStatus.INVITED;
    this._personalEmail = event.data.personalEmail;
    this._firstName = event.data.firstName;
    this._lastName = event.data.lastName;
  }

  cancel = (): Result =>
    this.executeCommand(() =>
      this._status === InvitationStatus.CANCELLED
        ? Result.failure(
            CancelingApplicantInvitationFailed.newFrom(this.id, this.currentDate, {
              reason: 'Applicant invitation already cancelled!',
            }),
          )
        : Result.success(InvitationCancelled.newFrom(this.id, this.currentDate, {})),
    );

  onInvitationCancelled(event: InvitationCancelled) {
    this.id = event.aggregateId;
    this._status = InvitationStatus.CANCELLED;
  }
}

enum InvitationStatus {
  INVITED,
  CANCELLED,
}
