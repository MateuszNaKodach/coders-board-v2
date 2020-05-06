import { DynamicModule, Module } from '@nestjs/common';
import { EventStoreProjectionsModule } from '@coders-board-library/eventstore-projections';
import { ProjectionName } from '@coders-board-library/eventstore-projections/projection/projection-name';
import { EventStoreProjectionStateProvider } from '@coders-board-library/eventstore-projections/api/event-store-projection-state-provider';
import { EventStoreProjectionsInvitingApplicantInvitationRepository } from './event-store-projections-inviting-applicant-invitation-repository';
import { APPLICANT_INVITATION_REPOSITORY } from '../../../write-side/domain/applicant-invitation.repository';

@Module({})
export class InvitingApplicantsEventStoreProjectionsModule {
  static eventStoreProjectionEngine(
    projections: ProjectionName[],
  ): DynamicModule {
    const eventStoreProjectionModule = EventStoreProjectionsModule.register({
      eventStore: {
        baseURL: process.env.EVENTSTORE_URL,
        auth: {
          username: process.env.EVENTSTORE_USERNAME,
          password: process.env.EVENTSTORE_PASSWORD,
        },
      },
      projectionsDir:
        './resources/inviting-applicants/read-side/projection/eventstore',
      projections,
    });
    return {
      imports: [eventStoreProjectionModule],
      module: InvitingApplicantsEventStoreProjectionsModule,
      providers: [
        {
          inject: [EventStoreProjectionStateProvider],
          useFactory: (
            eventStoreProjectionStateProvider: EventStoreProjectionStateProvider,
          ) =>
            new EventStoreProjectionsInvitingApplicantInvitationRepository(
              eventStoreProjectionStateProvider,
            ),
          provide: APPLICANT_INVITATION_REPOSITORY,
        },
      ],
      exports: [APPLICANT_INVITATION_REPOSITORY],
    };
  }
}
