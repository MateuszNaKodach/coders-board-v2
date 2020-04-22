import { FixedTimeProvider } from '@coders-board-library/time-provider/fixed-time-provider';
import { TimeProvider } from '@coders-board-library/time-provider/time-provider';

describe('Feature: Fixed time provider', () => {
  const date = new Date();
  const timeProvider: TimeProvider = FixedTimeProvider.withFixedDate(date);

  describe('Given: Fixed time provider with certain date', () => {
    describe('When: Wait a little time', () => {
      it('Then: The date should stay same as previous', () => {
        expect(timeProvider.currentDate()).toEqual(date);
      });
    });
  });
});
