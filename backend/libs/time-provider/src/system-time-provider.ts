import { Injectable } from '@nestjs/common';
import { TimeProvider } from '@coders-board-library/time-provider/time-provider';

@Injectable()
export class SystemTimeProvider implements TimeProvider {
  currentDate(): Date {
    return new Date();
  }
}
