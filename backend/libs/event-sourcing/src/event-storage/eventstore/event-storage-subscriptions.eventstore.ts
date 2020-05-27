import { EventStorageSubscriptions } from '@coders-board-library/event-sourcing/api/event-storage-subscriptions';
import { EventStreamName } from '@coders-board-library/event-sourcing/api/event-stream-name.valueboject';
import { StorageEventEntry } from '@coders-board-library/event-sourcing/api/storage-event-entry';
import { Observable, of, throwError } from 'rxjs';
import { HttpService, HttpStatus } from '@nestjs/common';
import { Time } from '@coders-board-library/event-sourcing/time.type';
import { flatMap, map, tap } from 'rxjs/operators';
import { AxiosResponse } from 'axios';

export class EventStoreEventStorageSubscriptions implements EventStorageSubscriptions {
  constructor(private readonly time: Time, private readonly httpService: HttpService) {}

  observeFor(eventStreamName: EventStreamName | string, subscriberGroupName: string): Observable<StorageEventEntry> {
    return this.createPersistentSubscription(eventStreamName, subscriberGroupName).pipe(
      map(response => (response.status === HttpStatus.CREATED ? response : throwError(response))),
      flatMap(response => this.connectToPersistentSubscription(eventStreamName, subscriberGroupName)),
      flatMap(atomResponse => (atomResponse.status !== 200 ? throwError(atomResponse) : of(atomResponse))),
      map(atomResponse => this.atomEntries(atomResponse)),
      map(atomEntries => atomEntries[0]),
      flatMap(atomResponse => {
        const ackUri = this.getAckUri(atomResponse);
        return this.httpService
          .post(ackUri, {}, { headers: { 'Content-Type': 'application/json' } })
          .pipe(flatMap(response => of(this.toStorageEventEntry(atomResponse))));
      }),
    );
  }

  subscribeFor(
    eventStreamName: EventStreamName | string,
    subscriberGroupName: string,
    subscriber: (event: StorageEventEntry) => unknown,
  ): Promise<void> {
    return this.createPersistentSubscription(eventStreamName, subscriberGroupName)
      .pipe(
        map(response => (response.status === HttpStatus.CREATED ? response : throwError(response))),
        flatMap(response => this.connectToPersistentSubscription(eventStreamName, subscriberGroupName)),
        flatMap(atomResponse => (atomResponse.status !== 200 ? throwError(atomResponse) : of(atomResponse))),
        map(atomResponse => this.atomEntries(atomResponse)),
        map(atomEntries => atomEntries[0]),
        tap(firstEventAtom => {
          subscriber(this.toStorageEventEntry(firstEventAtom));
        }),
        flatMap(atomResponse => {
          const ackUri = this.getAckUri(atomResponse);
          return this.httpService
            .post(ackUri, {}, { headers: { 'Content-Type': 'application/json' } })
            .pipe(tap(e => console.log(e)));
        }),
      )
      .toPromise()
      .then();
  }

  private;

  private getAckUri(atomEvent: any): string {
    return atomEvent.links.filter(it => it.relation === 'ack').map(it => it.uri)[0];
  }

  subscribeForBatches(
    eventStreamName: EventStreamName | string,
    subscriberGroupName: string,
  ): Observable<StorageEventEntry[]> {
    return undefined;
  }

  private connectToPersistentSubscription(
    eventStreamName: EventStreamName | string,
    subscriberGroupName: string,
  ): Observable<AxiosResponse<StorageEventEntry>> {
    const streamName = eventStreamName instanceof EventStreamName ? eventStreamName.raw : eventStreamName;
    return this.httpService.get(`/subscriptions/${streamName}/${subscriberGroupName}?embed=body`, {
      headers: {
        Accept: 'application/vnd.eventstore.competingatom+json',
      },
    });
  }

  private createPersistentSubscription(eventStreamName: EventStreamName | string, subscriberGroupName: string) {
    const streamName = eventStreamName instanceof EventStreamName ? eventStreamName.raw : eventStreamName;
    return this.httpService.put<void>(`/subscriptions/${streamName}/${subscriberGroupName}`, {
      ResolveLinkTos: true,
      startFrom: 0,
      extraStatistics: true,
      checkPointAfterMilliseconds: 1,
      // liveBufferSize: 10,
      // readBatchSize: 20,
      // bufferSize: 10,
      // maxCheckPointCount: 2,
      // maxRetryCount: 10,
      // maxSubscriberCount: 10,
      // messageTimeoutMilliseconds: 5000,
      minCheckPointCount: 1,
      // namedConsumerStrategy: 'round-robin'
    });
  }

  private readEventsFromAtomFeed(response: AxiosResponse): StorageEventEntry[] {
    return this.atomEntries(response).map(atomEvent => this.toStorageEventEntry(atomEvent));
  }

  private toStorageEventEntry(atomEvent: any): StorageEventEntry {
    const metadata = JSON.parse(atomEvent.metaData);
    return {
      eventId: atomEvent.eventId,
      eventType: atomEvent.eventType,
      occurredAt: metadata.occurredAt ? new Date(metadata.occurredAt) : new Date(atomEvent.updated),
      streamId: EventStreamName.fromRaw(atomEvent.streamId).streamId,
      streamGroup: EventStreamName.fromRaw(atomEvent.streamId).streamGroup,
      data: JSON.parse(atomEvent.data),
    };
  }

  private atomEntries(response: AxiosResponse<any>): any[] {
    return response.data.entries;
  }
}
