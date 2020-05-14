const increase = (counter) => counter + 1;

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
            invited: 0,
            cancelled: 0
          },
          metadata: {
            lastUpdated: undefined,
            processedEventsCount: 0
          }
        }
      },
      ApplicantInvited: function (state, event) {
        state.content.invited = increase(state.content.invited);
        updateProjectionStateMetadata(state, event);
        return state;
      },
      InvitationCancelled: function (state, event) {
        state.content.cancelled = increase(state.content.cancelled);
        updateProjectionStateMetadata(state, event);
        return state;
      }
    })



