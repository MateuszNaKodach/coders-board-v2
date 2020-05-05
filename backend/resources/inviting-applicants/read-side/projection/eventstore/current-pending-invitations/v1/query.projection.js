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
    const invitationId = metadata.streamId;
    return new PendingInvitation(
        invitationId,
        data.firstName.raw,
        data.lastName.raw,
        data.personalEmail.raw,
        metadata.occurredAt
    )
  }

  static invitationIdFromEvent(event) {
    const data = event.data;
    const metadata = event.metadata;
    const invitationId = metadata.streamId;
    return invitationId;
  }
}

class CurrentPendingInvitationsReadModel {

  constructor(pendingInvitations) {
    this.pendingInvitations = pendingInvitations;
  }

  static of(pendingInvitations) {
    return new CurrentPendingInvitationsReadModel(pendingInvitations);
  }

  static empty() {
    return new CurrentPendingInvitationsReadModel([])
  }

  add(pendingInvitation) {
    return new CurrentPendingInvitationsReadModel([...this.pendingInvitations, pendingInvitation])
  }

  removeByInvitationId(invitationId) {
    return new CurrentPendingInvitationsReadModel(this.pendingInvitations.filter(it => it.invitationId !== invitationId));
  }
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
        state.content.pendingInvitations =
            CurrentPendingInvitationsReadModel
                .of(state.content.pendingInvitations)
                .add(PendingInvitation.from(event))
                .pendingInvitations
        updateProjectionStateMetadata(state, event);
      },
      InvitationCancelled: function (state, event) {
        const invitationId = PendingInvitation.invitationIdFromEvent(event);
        state.content.pendingInvitations =
            CurrentPendingInvitationsReadModel
                .of(state.content.pendingInvitations)
                .removeByInvitationId(invitationId)
                .pendingInvitations;
        updateProjectionStateMetadata(state, event);
      }
    })
