import {Module} from '@nestjs/common';
import {InvitingApplicantsEventStoreProjectionModule} from './projection/eventstore/inviting-applicants-event-store-projection.module';
import {ProjectionName} from "./projection/eventstore/projection-name";

//TODO: Add selecting projection engine! EventStore for example
const eventStoreProjectionModule = InvitingApplicantsEventStoreProjectionModule.register(
    {
      projectionsDir: './resources/inviting-applicants/read-side/projection/eventstore',
      projections: [
        ProjectionName.fromProps({id: 'invited-applicants-counter', version: 1}),
        ProjectionName.fromProps({id: 'current-pending-invitations', version: 2})
      ]
    }
);

@Module({
  imports: [eventStoreProjectionModule],
})
export class InvitingApplicantsReadSideModule {
}
