import { ApplicantInvitedEventPropagator } from './applicant-invited.event-propagator';
import { InvitationCancelledEventPropagator } from './invitation-cancelled.event-propagator';

/**
 * Each domain event which should be available for read-models and other context on the write-side need
 * to be mapped to public event.
 *
 * TODO: Event propagators need something like Outbox to make possible retries and rebuilding write-side by querying.
 */

export const All = [ApplicantInvitedEventPropagator, InvitationCancelledEventPropagator];
