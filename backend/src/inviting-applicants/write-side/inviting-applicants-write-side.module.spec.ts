import { Test, TestingModule } from '@nestjs/testing';
import { InvitingApplicantsWriteSideModule } from './inviting-applicants-write-side.module';
import { ApplicantInvitationCommand } from '@coders-board-library/public-messages/inviting-applicants/command/applicant-invitation.command';
import InviteApplicantToAssociation = ApplicantInvitationCommand.InviteApplicantToAssociation;
import { CommandBus } from '@nestjs/cqrs';
import {
  ApplicantInvitationPublicEvent,
  expectLastPublishedEventAsync,
} from '@coders-board-library/public-messages';
import {
  EventPublisherSpy,
  expectLastPublishedEvent,
} from '@coders-board-library/public-messages/shared/public-messages.test-utils';
import CancelApplicantInvitation = ApplicantInvitationCommand.CancelApplicantInvitation;
import {
  EXTERNAL_EVENT_PUBLISHER,
  ExternalEventPublisher,
} from '../../shared-kernel/write-side/application/external-event-publisher/external-event-publisher';
import ApplicantInvitationCancelledPublicEvent = ApplicantInvitationPublicEvent.ApplicantInvitationCancelledPublicEvent;
import ApplicantInvitedPublicEvent = ApplicantInvitationPublicEvent.ApplicantInvitedPublicEvent;

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
      imports: [InvitingApplicantsWriteSideModule],
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
        expectLastPublishedEvent(eventPublisherPublishSpy, {
          type: ApplicantInvitedPublicEvent,
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

        it('Then: Applicant invitation should be cancelled', done => {
          expectLastPublishedEventAsync(
            eventPublisherPublishSpy,
            {
              type: ApplicantInvitationCancelledPublicEvent,
              data: {
                firstName: inviteCommand.firstName,
                lastName: inviteCommand.lastName,
                personalEmail: inviteCommand.personalEmail,
              },
            },
            done,
          );
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
