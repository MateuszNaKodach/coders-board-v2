import { ProjectionName } from '@coders-board-library/eventstore-projections/projection/projection-name';

export const PROJECTION_INVITED_APPLICANTS_COUNTER_V1 = ProjectionName.fromProps(
  { id: 'invited-applicants-counter', version: 1 },
);
export const PROJECTION_CURRENT_PENDING_INVITATIONS = ProjectionName.fromProps({
  id: 'current-pending-invitations',
  version: 1,
});
