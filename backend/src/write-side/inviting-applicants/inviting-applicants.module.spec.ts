import { Test, TestingModule } from '@nestjs/testing';
import { InvitingApplicantsModule } from './inviting-applicants.module';
import { ApplicantInvitationCommand } from '@coders-board-library/public-messages/inviting-applicants/command/applicant-invitation.command';
import InviteApplicantToAssociation = ApplicantInvitationCommand.InviteApplicantToAssociation;
import { CommandBus, EventBus } from '@nestjs/cqrs';
import { ApplicantInvitationPublicEvent } from '@coders-board-library/public-messages';
import ApplicantInvited = ApplicantInvitationPublicEvent.ApplicantInvited;
import {
  EventPublisherSpy,
  expectOnlyPublishedEvent,
} from '@coders-board-library/public-messages/shared/public-messages.test-utils';
import CancelApplicantInvitation = ApplicantInvitationCommand.CancelApplicantInvitation;
import ApplicantInvitationCancelled = ApplicantInvitationPublicEvent.ApplicantInvitationCancelled;
import {
  EXTERNAL_EVENT_PUBLISHER,
  ExternalEventPublisher,
} from '../shared-kernel/application/external-event-publisher/external-event-publisher';

/**
 * Test of InvitingApplicants. In tests of logic we bypass presentation layer.
 * We treat the module as a black-box. The test checks expected output (published event) based on input (command).
 */

//TODO: When communication between components will be more stable we can introduce special DSL to reduce boilerplate in tests
const person = {
  janKowalski: {
    personalEmail: 'jan.kowalski@gmail.com',
    firstName: 'Jan',
    lastName: 'Kowalski',
  },
};

describe('Feature: Inviting applicants', () => {
  let commandBus: CommandBus;
  let eventPublisherPublishSpy: EventPublisherSpy;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [InvitingApplicantsModule],
    }).compile();
    await app.init();
    commandBus = app.get<CommandBus>(CommandBus);
    eventPublisherPublishSpy = eventPublisherSpy(app);
  });

  describe('Given: Applicant to invite', () => {
    const inviteCommand = new InviteApplicantToAssociation(
      person.janKowalski.personalEmail,
      person.janKowalski.firstName,
      person.janKowalski.lastName,
    );

    describe('When: Invite the applicant', () => {
      let invitationId: string;

      beforeEach(async () => {
        invitationId = await commandBus.execute(inviteCommand);
      });

      it('Then: Applicant should be invited', () => {
        expectOnlyPublishedEvent(eventPublisherPublishSpy, {
          type: ApplicantInvited,
          data: {
            firstName: inviteCommand.firstName,
            lastName: inviteCommand.lastName,
            personalEmail: inviteCommand.personalEmail,
          },
        });
      });

      describe('And: Cancel the invitation', () => {
        let cancelInvitationCommand: CancelApplicantInvitation;

        beforeEach(async () => {
          cancelInvitationCommand = new CancelApplicantInvitation(invitationId);
          await commandBus.execute(cancelInvitationCommand);
        });

        it('Then: Applicant invitation should be cancelled', () => {
          expectOnlyPublishedEvent(eventPublisherPublishSpy, {
            type: ApplicantInvitationCancelled,
            data: {
              firstName: inviteCommand.firstName,
              lastName: inviteCommand.lastName,
              personalEmail: inviteCommand.personalEmail,
            },
          });
        });
      });

      afterEach(() => {
        eventPublisherPublishSpy.mockClear();
      });
    });
  });
});

function eventPublisherSpy(app: TestingModule): EventPublisherSpy {
  const eventBus = app.get<ExternalEventPublisher>(EXTERNAL_EVENT_PUBLISHER);
  return jest.spyOn(eventBus, 'publish');
}
