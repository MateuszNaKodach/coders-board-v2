import { ValueObjectPolicy } from './value-object-policy';

interface IValueObject<S extends string, N, T> {
  readonly raw: T;
  Type(): S;
  equals(val: T | N): boolean;
}

function isValueObject<N extends IValueObject<S, N, T>, S extends string, T>(
  val: T | N,
): val is N {
  return (
    (val as N).raw !== undefined &&
    (val as N).Type !== undefined &&
    (val as N).equals !== undefined
  );
}


function ValueObject<S extends string, N, T>(
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  policy: ValueObjectPolicy<T> = () => { },
) {
  return class TValueObject implements IValueObject<S, N, T> {
    protected constructor(readonly raw: T) { }

    Type(): S {
      return TValueObject.name as S;
    }

    static from(val: T): N {
      policy(val);
      return (new TValueObject(val) as unknown) as N;
    }

    equals(val: T | N): boolean {
      if (isValueObject(val)) {
        const _val = (val as unknown) as IValueObject<S, N, T>;
        if (this.Type() !== _val.Type()) return false;
        return this.raw === _val.raw;
      }
      return this.raw === val;
    }
  };
}

function ValueObjectType<T extends ReturnType<typeof ValueObject>>(target: T) {
  (target as any).__proto__.prototype.Type = () => target.name;
  return target;
}

export { isValueObject, ValueObject, ValueObjectType };
