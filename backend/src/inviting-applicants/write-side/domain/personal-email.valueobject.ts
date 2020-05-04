export class PersonalEmail {
  private readonly TYPE = 'Email';

  constructor(readonly raw: string) {}

  static from(email: string) {
    if (!email.includes('@')) {
      throw new Error('Invalid email!');
    }
    return new PersonalEmail(email);
  }
}
