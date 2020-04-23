namespace Utils {
  export type Filter<T, U> = T extends U ? T : never;
  export type Constructor<T> = new (...args: any[]) => T;
}

const TrueValueSymbol = Symbol('TrueValue');
class TrueValue {
  readonly [TrueValueSymbol]: undefined;
}

const FalseValueSymbol = Symbol('FalseValue');
class FalseValue<M extends string = ''> {
  readonly [FalseValueSymbol]: undefined;
}

type Not<Expr, M extends string = ''> = Expr extends TrueValue
  ? FalseValue<M>
  : TrueValue;
type TypesEquals<A, B> = Utils.Filter<A, B> extends never
  ? FalseValue<'Types are not the same'>
  : Utils.Filter<B, A> extends never
  ? FalseValue<'Types are not the same'>
  : TrueValue;

type HasPublicConstructor<X> = X extends Utils.Constructor<any>
  ? TrueValue
  : FalseValue;
type HasProperty<T, N extends string> = N extends keyof T
  ? TrueValue
  : FalseValue<'T does not have N property'>;
type HasPropertyWithReturnType<T, N extends string, R> = N extends keyof T
  ? T[N] extends R
    ? TrueValue
    : FalseValue<'T has property N with different return value'>
  : HasProperty<T, N>;
type HasMethodWithReturnType<T, N extends string, R> = N extends keyof T
  ? T[N] extends (...args: any[]) => infer RV
    ? RV extends R
      ? TrueValue
      : FalseValue<'T has method N with different return value'>
    : FalseValue<'T has property N not method'>
  : FalseValue<'T does not have N property'>;

// eslint-disable-next-line @typescript-eslint/no-empty-function
function AssertType<Expr extends TrueValue>(): void {}

export {
  AssertType,
  TrueValue,
  FalseValue,
  Not,
  TypesEquals,
  HasPublicConstructor,
  HasProperty,
  HasPropertyWithReturnType,
  HasMethodWithReturnType,
};
