export type AsyncState<T> = {
  status: 'idle' | 'loading' | 'success' | 'failure';
  data: T;
  error: string | null;
};

export const createAsyncState = <T>(initialData: T): AsyncState<T> => ({
  status: 'idle',
  data: initialData,
  error: null,
});
