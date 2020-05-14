import { ProjectionName } from '@coders-board-library/eventstore-projections/projection/projection-name';

export const PROJECTION_INVITED_APPLICANTS_COUNTER_V1 = ProjectionName.fromProps(
  { id: 'invited-applicants-counter', version: 1 },
);
export const PROJECTION_PENDING_INVITATIONS_V1 = ProjectionName.fromProps({
  id: 'pending-invitations',
  version: 1,
});
export const PROJECTION_CANCELLED_INVITATIONS_V1 = ProjectionName.fromProps({
  id: 'cancelled-invitations',
  version: 1,
});
