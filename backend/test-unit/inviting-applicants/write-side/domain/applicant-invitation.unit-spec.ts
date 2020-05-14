import { TimeProviderPort } from '../../../../src/shared-kernel/write-side/domain/time-provider.port';
import { SystemTimeProvider } from '@coders-board-library/time-provider/system-time-provider';
import { PersonalEmail } from '../../../../src/inviting-applicants/write-side/domain/personal-email.valueobject';
import { FirstName } from '../../../../src/inviting-applicants/write-side/domain/first-name.value-object';
import { LastName } from '../../../../src/inviting-applicants/write-side/domain/last-name.value-object';
import { ApplicantInvitation } from '../../../../src/inviting-applicants/write-side/domain/applicant-invitation.aggregate-root';
import { ApplicantInvitationId } from '../../../../src/inviting-applicants/write-side/domain/applicant-invitation-id.valueobject';
import { expectDomainEvent } from '../../../../src/shared-kernel/write-side/domain/aggregate-root.test-utils';
import {ApplicantInvited} from "../../../../src/inviting-applicants/write-side/domain/event/applicant-invited.domain-event";
import {InvitingApplicantFailed} from "../../../../src/inviting-applicants/write-side/domain/event/inviting-applicant-failed.domain-event";
import {InvitationCancelled} from "../../../../src/inviting-applicants/write-side/domain/event/invitation-cancelled.domain-events";
import {CancelingApplicantInvitationFailed} from "../../../../src/inviting-applicants/write-side/domain/event/cancelling-applicant-invitation-failed.domain-event";

const person = {
  janKowalski: {
    personalEmail: PersonalEmail.from('jan.kowalski@gmail.com'),
    firstName: FirstName.from('Jan'),
    lastName: LastName.from('Kowalski'),
  },
};

describe('Feature: Applicant invitation', () => {
  const timeProvider: TimeProviderPort = new SystemTimeProvider();
  const applicantInvitationId = ApplicantInvitationId.generate();
  let applicantInvitation: ApplicantInvitation;

  beforeEach(() => {
    applicantInvitation = new ApplicantInvitation(timeProvider);
  });

  describe('Scenario: Invite applicant for the first time', () => {
    describe('Given: An applicant to invite', () => {
      describe('When: Try to invite an applicant', () => {
        beforeEach(() => {
          applicantInvitation.forApplicant(applicantInvitationId, {
            ...person.janKowalski,
          });
        });

        it('Then: The applicant should be invited', () => {
          expectDomainEvent(applicantInvitation, {
            type: ApplicantInvited,
            data: { ...person.janKowalski },
          });
        });
      });
    });
  });

  describe('Scenario: Invite applicant once more', () => {
    describe('Given: An applicant which was invited', () => {
      beforeEach(() => {
        applicantInvitation.loadFromHistory([
          ApplicantInvited.newFrom(
            applicantInvitationId,
            timeProvider.currentDate(),
            { ...person.janKowalski },
          ),
        ]);
      });

      describe('When: Try to invite an applicant', () => {
        beforeEach(() => {
          applicantInvitation.forApplicant(applicantInvitationId, {
            ...person.janKowalski,
          });
        });

        it('Then: The applicant should not be invited', () => {
          expectDomainEvent(applicantInvitation, {
            type: InvitingApplicantFailed,
            data: { reason: 'Applicant already invited!' },
          });
        });
      });
    });
  });

  describe('Scenario: Cancel invitation', () => {
    describe('Given: An applicant which was invited', () => {
      beforeEach(() => {
        applicantInvitation.loadFromHistory([
          ApplicantInvited.newFrom(
            applicantInvitationId,
            timeProvider.currentDate(),
            { ...person.janKowalski },
          ),
        ]);
      });

      describe('When: Try to cancel invitation', () => {
        beforeEach(() => {
          applicantInvitation.cancel();
        });

        it('Then: The applicant invitation should be cancelled', () => {
          expectDomainEvent(applicantInvitation, {
            type: InvitationCancelled,
            data: {},
          });
        });

        describe('When: Try to cancel cancelled invitation', () => {
          beforeEach(() => {
            applicantInvitation.cancel();
          });

          it('Then: The applicant invitation should not be cancelled once more', () => {
            expectDomainEvent(applicantInvitation, {
              type: CancelingApplicantInvitationFailed,
              data: { reason: 'Applicant invitation already cancelled!' },
            });
          });
        });
      });
    });
  });
});
