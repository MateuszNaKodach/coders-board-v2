class Invitation {
  constructor(invitationId, firstName, lastName, personalEmail, invitedAt, cancelledAt) {
    this.invitationId = invitationId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.personalEmail = personalEmail;
    this.invitedAt = invitedAt;
    this.cancelledAt = cancelledAt;
  }

  static from(event) {
    const data = event.data;
    const metadata = event.metadata;
    const invitationId = metadata.aggregateId;
    return new Invitation(
        invitationId,
        data.firstName.raw,
        data.lastName.raw,
        data.personalEmail.raw,
        metadata.occurredAt,
        undefined
    )
  }

}

function invitationIdFromEvent(event) {
  return event.metadata.aggregateId;
}

function invitationCancelledAt(invitation, cancelledAt) {
  return new Invitation(invitation.invitationId, invitation.firstName, invitation.lastName, invitation.personalEmail, invitation.invitedAt, cancelledAt)
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
            invitations: []
          },
          metadata: {
            lastUpdated: undefined,
            processedEventsCount: {}
          }
        }
      },
      ApplicantInvited: function (state, event) {
        state.content.invitations = [...state.content.invitations, Invitation.from(event)]
        updateProjectionStateMetadata(state, event);
        return state;
      },
      InvitationCancelled: function (state, event) {
        const cancelledInvitationId = invitationIdFromEvent(event);
        const cancelledInvitation = state.content.invitations.find(it => it.invitationId === cancelledInvitationId)
        if (cancelledInvitation) {
          state.content.invitations = state.content.invitations.filter(it => it.invitationId !== cancelledInvitationId)
          state.content.invitations = [...state.content.invitations, invitationCancelledAt(cancelledInvitation, event.metadata.occurredAt)]
        }
        updateProjectionStateMetadata(state, event);
        return state;
      }
    })
    .transformBy(function(state) {
      return {
        content: {
          cancelledInvitations: state.content.invitations.filter(it => it.cancelledAt)
        },
        metadata: {
          lastUpdated: state.metadata.lastUpdated,
          processedEventsCount: state.metadata.processedEventsCount
        }
      };
    })

