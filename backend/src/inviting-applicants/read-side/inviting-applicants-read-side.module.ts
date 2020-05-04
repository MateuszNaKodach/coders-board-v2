import { Module } from '@nestjs/common';
import {InvitingApplicantsEventStoreProjectionModule} from "./projection/eventstore/inviting-applicants-event-store-projection.module";

//TODO: Add selecting projection engine! EventStore for example
@Module({
  imports: [
      InvitingApplicantsEventStoreProjectionModule
  ],
})
export class InvitingApplicantsReadSideModule  {
}
