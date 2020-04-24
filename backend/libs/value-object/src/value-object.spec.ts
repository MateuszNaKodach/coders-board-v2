import { ValueObjectFactory, ValueObject } from './value-object';
import {
  EmptyStringPolicy,
  ConcatPolicy,
  EmailPolicy,
} from './value-object-policy';
import {
  AssertType,
  Not,
  TypesEquals,
  HasPublicConstructor,
  HasPropertyWithReturnType,
  HasMethodWithReturnType,
} from '@coders-board-library/assert-type';

class LastName extends ValueObjectFactory.String(
  'LastName',
  EmptyStringPolicy,
) {}
class PersonalEmail extends ValueObjectFactory.String(
  'PersonalEmail',
  ConcatPolicy(EmptyStringPolicy, EmailPolicy),
) {}

class Struct extends ValueObject<{ x: number; y: number }>()('Struct') {}

describe('ValueObject', () => {
  it('Does not have public constructor', () => {
    AssertType<Not<HasPublicConstructor<typeof LastName>>>();
  });
  it('Has static property "from"', () => {
    AssertType<HasMethodWithReturnType<typeof LastName, 'from', LastName>>();
  });
  it('Has property "raw" with return value of parameter type', () => {
    AssertType<HasPropertyWithReturnType<LastName, 'raw', string>>();
  });
  it('Has property "Type"', () => {
    AssertType<HasMethodWithReturnType<LastName, 'Type', 'LastName'>>();
  });
});

describe('ValueObjects which have the same generic parameter type and', () => {
  describe('Different type', () => {
    it('Should be different', () => {
      AssertType<Not<TypesEquals<LastName, PersonalEmail>>>();
    });
  });
  describe('Same type', () => {
    it('Should be equal', () => {
      AssertType<TypesEquals<LastName, LastName>>();
    });
  });
});
