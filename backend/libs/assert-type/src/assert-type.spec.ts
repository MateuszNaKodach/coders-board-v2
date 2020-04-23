import {
  AssertType,
  TrueValue,
  FalseValue,
  Not,
  TypesEquals,
  HasPublicConstructor,
} from './assert-type';
type TypeHasX<T> = 'x' extends keyof T
  ? TrueValue
  : FalseValue<'Type should have x property'>;
type TypeHasY<T> = 'y' extends keyof T
  ? TrueValue
  : FalseValue<'Type should have y property'>;
type TypeHasXY<T> = TypeHasX<T> | TypeHasY<T>; // and
type TypeHasXorY<T> = TypeHasX<T> & TypeHasY<T>; // or

class X {
  public x = 0;
}
class X2 {
  public x = 0;
}

class NX {
  public nx = 0;
}

class Y {
  public y = 0;
}

class XY {
  public x = 0;
  public y = 0;
}

test('TypesEquals', () => {
  AssertType<TypesEquals<X, X>>();
  AssertType<TypesEquals<X, X2>>();
  AssertType<TypesEquals<X2, X>>();

  AssertType<Not<TypesEquals<X, Y>>>();
  AssertType<Not<TypesEquals<Y, XY>>>();
  AssertType<Not<TypesEquals<XY, Y>>>();
});

test('Custom AssertType checks', () => {
  AssertType<Not<TypeHasX<NX>, 'Type should not have x property'>>();
  AssertType<TypeHasX<X>>();
  AssertType<TypeHasXY<XY>>();
  AssertType<TypeHasXorY<Y>>();
});

test('HasPublicConstructor', () => {
  class PublicConstructor {
    _arg: any;
    constructor(arg: any) {
      this._arg = arg;
    }
  }

  class PrivateConstructor {
    _arg: any;
    private constructor(arg: any) {
      this._arg = arg;
    }
  }

  AssertType<HasPublicConstructor<typeof PublicConstructor>>();
  AssertType<Not<HasPublicConstructor<typeof PrivateConstructor>>>();
});
