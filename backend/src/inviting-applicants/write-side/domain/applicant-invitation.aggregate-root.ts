import { AbstractAggregateRoot } from '../../../shared-kernel/write-side/domain/abstract-aggregate-root';
import { ApplicantInvitationId } from './applicant-invitation-id.valueobject';
import { TimeProviderPort } from '../../../shared-kernel/write-side/domain/time-provider.port';
import { PersonalEmail } from './personal-email.valueobject';
import { FirstName } from './first-name.value-object';
import { LastName } from './last-name.value-object';
import { ApplicantInvitationDomainEvent } from './applicant-invitation.domain-event';

export class ApplicantInvitation extends AbstractAggregateRoot<
  ApplicantInvitationId
> {
  private _status: InvitationStatus;
  private _personalEmail: PersonalEmail;
  private _firstName: FirstName;
  private _lastName: LastName;

  constructor(timeProvider: TimeProviderPort) {
    super(timeProvider);
  }

  invite(
    id: ApplicantInvitationId,
    command: {
      personalEmail: PersonalEmail;
      firstName: FirstName;
      lastName: LastName;
    },
  ) {
    if (this._status !== undefined) {
      throw new Error('Applicant already invited!');
    }
    const event = ApplicantInvitationDomainEvent.ApplicantInvited.newFrom(
      id,
      this.currentDate,
      { ...command },
    );
    this.apply(event);
  }

  onApplicantInvited(event: ApplicantInvitationDomainEvent.ApplicantInvited) {
    this.id = event.aggregateId;
    this._status = InvitationStatus.INVITED;
    this._personalEmail = event.data.personalEmail;
    this._firstName = event.data.firstName;
    this._lastName = event.data.lastName;
  }

  cancel() {
    if (this._status === InvitationStatus.CANCELLED) {
      throw new Error('Applicant invitation already cancelled!');
    }
    this.apply(
      ApplicantInvitationDomainEvent.InvitationCancelled.newFrom(
        this.id,
        this.currentDate,
        {},
      ),
    );
  }

  onInvitationCancelled(
    event: ApplicantInvitationDomainEvent.InvitationCancelled,
  ) {
    this.id = event.aggregateId;
    this._status = InvitationStatus.CANCELLED;
  }

  get status(): InvitationStatus {
    return this._status;
  }

  get personalEmail(): PersonalEmail {
    return this._personalEmail;
  }

  get firstName(): FirstName {
    return this._firstName;
  }

  get lastName(): LastName {
    return this._lastName;
  }
}

enum InvitationStatus {
  INVITED,
  CANCELLED,
}
