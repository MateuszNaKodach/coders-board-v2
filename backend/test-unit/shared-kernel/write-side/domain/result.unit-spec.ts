import { Result } from '../../../../src/shared-kernel/write-side/domain/result';

describe('Feature: Aggregate command result', () => {
  describe('Scenario: Result success', () => {
    describe('Given: Empty success scenario', () => {
      const emptySuccessResult = Result.success();

      it('Then: Result should have no events', () => {
        expect(emptySuccessResult.events).toHaveLength(0);
      });

      it('Then: Result should have no failure reason', () => {
        expect(emptySuccessResult.failureReason()).toBeUndefined();
      });
    });
  });
});
