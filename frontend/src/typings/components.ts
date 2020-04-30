import { ValidationMap, ReactElement, PropsWithChildren, Ref, ElementRef } from 'react';

type ChildlessFunctionComponent<P = {}, C = {}> = {
  (props: P, context?: C): ReactElement | null;
  contextTypes?: ValidationMap<C>;
  defaultProps?: Partial<P>;
  displayName?: string;
};

export type CFC<P = {}> = ChildlessFunctionComponent<P>;

type FunctionComponent<P = {}, C = {}> = {
  (props: PropsWithChildren<P>, context?: C): ReactElement | null;
  contextTypes?: ValidationMap<C>;
  defaultProps?: Partial<P>;
  displayName?: string;
};

export type FC<P = {}> = FunctionComponent<P>;

type RefForwardingComponent<T, P = {}, C = {}> = {
  (props: PropsWithChildren<P>, ref: Ref<T>): ReactElement | null;
  contextTypes?: ValidationMap<C>;
  defaultProps?: Partial<P>;
  displayName?: string;
};

export type RFC<T, P = {}> = RefForwardingComponent<T, P>;

export type WithMainRef = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainRef?: ElementRef<any>;
};
