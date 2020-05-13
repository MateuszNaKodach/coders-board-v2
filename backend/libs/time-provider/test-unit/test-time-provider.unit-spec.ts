import { FixedTimeProvider } from '@coders-board-library/time-provider/fixed-time-provider';
import { MoveableTimeProvider } from '@coders-board-library/time-provider/moveable-time-provider';

describe('Feature: Test time provider', () => {
  let date: Date;
  let timeProvider: MoveableTimeProvider;

  beforeEach(() => {
    date = new Date();
    timeProvider = FixedTimeProvider.withFixedDate(date);
  });

  describe('Given: Test time provider with certain date', () => {
    describe('When: Wait a little time', () => {
      it('Then: The date should stay same as previous', () => {
        expect(timeProvider.currentDate()).toEqual(date);
      });
    });

    describe('When: Move to another date', () => {
      const anotherDate = new Date();

      beforeEach(() => {
        timeProvider.moveCurrentDateTo(anotherDate);
      });

      it('Then: The date should change to another one', () => {
        expect(timeProvider.currentDate()).toEqual(anotherDate);
      });
    });
  });
});
