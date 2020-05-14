class PendingInvitation {
  constructor(invitationId, firstName, lastName, personalEmail, invitedAt) {
    this.invitationId = invitationId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.personalEmail = personalEmail;
    this.invitedAt = invitedAt;
  }

  static from(event) {
    const data = event.data;
    const metadata = event.metadata;
    const invitationId = metadata.aggregateId;
    return new PendingInvitation(
        invitationId,
        data.firstName.raw,
        data.lastName.raw,
        data.personalEmail.raw,
        metadata.occurredAt
    )
  }
}

function invitationIdFromEvent(event) {
  return event.metadata.aggregateId;
}

function updateProjectionStateMetadata(state, event) {
  state.metadata.lastUpdated = event.metadata.occurredAt;
  if (state.metadata.processedEventsCount["$all"]) {
    state.metadata.processedEventsCount["$all"]++;
  } else {
    state.metadata.processedEventsCount["$all"] = 1
  }
  if (state.metadata.processedEventsCount[event.eventType]) {
    state.metadata.processedEventsCount[event.eventType]++
  } else {
    state.metadata.processedEventsCount[event.eventType] = 1
  }
}

fromAll()
    .when({
      $init: function () {
        return {
          content: {
            pendingInvitations: []
          },
          metadata: {
            lastUpdated: undefined,
            processedEventsCount: {}
          }
        }
      },
      ApplicantInvited: function (state, event) {
        state.content.pendingInvitations = [...state.content.pendingInvitations, PendingInvitation.from(event)]
        updateProjectionStateMetadata(state, event);
      },
      InvitationCancelled: function (state, event) {
        const cancelledInvitationId = invitationIdFromEvent(event);
        state.content.pendingInvitations = state.content.pendingInvitations.filter(it => it.invitationId !== cancelledInvitationId)
        updateProjectionStateMetadata(state, event);
      }
    })
