import { TimeProvider } from '@coders-board-library/time-provider/time-provider';

export interface MoveableTimeProvider extends TimeProvider {
  moveCurrentDateTo(date: Date);
}
