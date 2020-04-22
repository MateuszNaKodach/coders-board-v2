import { MoveableTimeProvider } from './moveable-time-provider';
import { TimeProvider } from '@coders-board-library/time-provider/time-provider';

export class FixedTimeProvider implements TimeProvider, MoveableTimeProvider {
  private constructor(private date: Date) {}

  static withFixedDate(date: Date = new Date()) {
    return new FixedTimeProvider(date);
  }

  currentDate(): Date {
    return this.date;
  }

  moveCurrentDateTo(date: Date) {
    this.date = date;
  }
}
