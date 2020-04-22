export const TIME_PROVIDER = Symbol();

export abstract class TimeProvider {
  abstract currentDate(): Date;
}
