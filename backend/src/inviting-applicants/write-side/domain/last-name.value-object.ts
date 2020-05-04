export class LastName {
  private readonly TYPE = 'LastName';

  constructor(readonly raw: string) {}

  static from(lastName: string) {
    if (lastName.length <= 0) {
      throw new Error('Name cannot be empty!');
    }
    return new LastName(lastName);
  }
}
