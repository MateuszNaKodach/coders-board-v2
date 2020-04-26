import { ValueObjectPolicy } from './value-object-policy';

type ValueObjectTypeDefinition =
  | Readonly<{ [k: string]: any }>
  | string
  | number;
type ValueObjectFactoryTypeDefinition<S extends string, T> = {
  from: (_: T) => IValueObject<S, T>;
  Type: () => S;
};
type ValueObjectClassFactoryTypeDefinition<N, S extends string, T> = {
  from: (_: T) => N;
  Type: () => S;
}

interface IValueObject<S extends string, T> {
  readonly raw: T;
  Type(): S;
  equals(val: T | IValueObject<S, T>): boolean;
}

const ValueObjectsSet = new Set<string>();

function isValueObject<N extends IValueObject<S, T>, S extends string, T>(
  val: T | N,
): val is N {
  return (
    (val as N).raw !== undefined &&
    (val as N).Type !== undefined &&
    (val as N).equals !== undefined
  );
}

function ValueObject<T extends ValueObjectTypeDefinition>() {
  return function ValueObjectConstructor<S extends string>(
    typeName: S,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    policy: ValueObjectPolicy<T> = (_: T) => { },
  ) {
    if (ValueObjectsSet.has(typeName)) {
      throw Error(`ValueObject with name ${typeName} currently exists`);
    }
    ValueObjectsSet.add(typeName);
    return class ValueObjectFactory implements IValueObject<S, Readonly<T>> {
      protected constructor(readonly raw: T) { }

      Type(): S {
        return (typeName as unknown) as S;
      }

      static Type(): S {
        return (typeName as unknown) as S;
      }

      static from(val: T): IValueObject<S, Readonly<T>> {
        policy(val);
        return new ValueObjectFactory(val);
      }

      equals(val: T | IValueObject<S, T>): boolean {
        if (isValueObject(val)) {
          if (this.Type() !== val.Type()) return false;
          return this.raw === val.raw;
        }
        return this.raw === val;
      }
    };
  };
}

type Constructor<T> = new (...args: any[]) => T;
type AllowInheritance<T> = T & Constructor<any>;
type ValueObjectPickName<F> = F extends { Type(): infer S } ? S : never;
type ValueObjectPickType<F> = F extends { from: (_: infer T) => any } ? T : never;

function ValueObjectClass<F extends ValueObjectFactoryTypeDefinition<S, T>, S extends string = ValueObjectPickName<F>, T = ValueObjectPickType<F>>(valueObjectFactory: F) {
  return <N extends IValueObject<S, T>>(): ValueObjectClassFactoryTypeDefinition<N, S, T> => {
    const factory = valueObjectFactory as AllowInheritance<typeof valueObjectFactory>;
    return class ValueObjectClassFactory extends factory implements IValueObject<S, Readonly<T>> {
      protected constructor(readonly raw: T) { super(raw); }

      Type(): S {
        return super.Type() as S;
      }

      equals(val: Readonly<T> | N): boolean {
        return super.equals(val);
      }

      static from(val: T): N {
        return super.from(val) as N;
      }
    };
  }
}

const ValueObjectFactory = {
  String: ValueObject<string>(),
  Number: ValueObject<number>(),
};

export {
  ValueObjectTypeDefinition,
  ValueObjectFactoryTypeDefinition,
  isValueObject,
  ValueObject,
  ValueObjectClass,
  ValueObjectFactory,
};
