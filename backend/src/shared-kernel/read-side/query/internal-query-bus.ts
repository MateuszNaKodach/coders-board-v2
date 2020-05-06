export const INTERNAL_QUERY_BUS = Symbol('INTERNAL_QUERY_BUS');

export interface InternalQueryBus {
  execute<TQuery, TResult>(query: TQuery): Promise<TResult>;
}
