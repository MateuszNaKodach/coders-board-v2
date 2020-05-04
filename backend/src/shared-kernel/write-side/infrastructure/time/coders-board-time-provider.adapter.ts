import { TimeProviderPort } from '../../domain/time-provider.port';
import { TimeProvider } from '@coders-board-library/time-provider';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CodersBoardTimeProviderAdapter implements TimeProviderPort {
  constructor(private readonly timeProvider: TimeProvider) {}

  currentDate(): Date {
    return this.timeProvider.currentDate();
  }
}
